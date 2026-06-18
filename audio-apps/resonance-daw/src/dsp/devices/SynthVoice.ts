// ─── SynthVoice ───
// Polyphonic synthesizer voice manager with oscillator, ADSR envelope, and low-pass filter.

import type { AudioDevice } from '../DeviceChain';

export type OscType = 'sine' | 'sawtooth' | 'square' | 'triangle';

export interface SynthParams {
  oscType: OscType;
  detune: number;      // cents
  gain: number;        // 0-1
  attack: number;      // seconds
  decay: number;       // seconds
  release: number;     // seconds
  filterFreq: number;  // Hz (20-20000)
  filterQ: number;     // 0.1-20
}

interface ActiveVoice {
  id: number;
  midiNote: number;
  oscillator: OscillatorNode;
  filter: BiquadFilterNode;
  gain: GainNode;
  startTime: number;
  releaseTime: number | null;
  released: boolean;
}

const DEFAULT_PARAMS: SynthParams = {
  oscType: 'sawtooth',
  detune: 0,
  gain: 0.5,
  attack: 0.01,
  decay: 0.1,
  release: 0.3,
  filterFreq: 8000,
  filterQ: 2,
};

export class SynthVoice implements AudioDevice {
  id: string;
  name = 'Synth Voice';
  type = 'synth';
  enabled = true;

  private ctx: AudioContext;
  private params: SynthParams;
  private voices: ActiveVoice[] = [];
  private outputGain: GainNode;
  private nextVoiceId = 0;
  private maxVoices = 8;
  private _disposed = false;

  constructor(ctx: AudioContext, params?: Partial<SynthParams>) {
    this.id = `synth_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.ctx = ctx;
    this.params = { ...DEFAULT_PARAMS, ...params };
    this.outputGain = ctx.createGain();
    this.outputGain.gain.value = 1.0;
  }

  /** Convert MIDI note number to frequency in Hz. */
  private midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  /** Trigger a note on. */
  noteOn(midiNote: number, velocity: number, time?: number): void {
    if (this._disposed) return;

    const t = time ?? this.ctx.currentTime;
    const vel = velocity / 127;

    // Voice stealing: if at max voices, release the oldest released voice,
    // or if none released, the oldest voice overall
    if (this.voices.length >= this.maxVoices) {
      const oldestReleased = this.voices.find((v) => v.released);
      const victim = oldestReleased ?? this.voices[0];
      this.stealVoice(victim, t);
    }

    const osc = this.ctx.createOscillator();
    osc.type = this.params.oscType;
    osc.frequency.value = this.midiToFreq(midiNote);
    osc.detune.value = this.params.detune;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = this.params.filterFreq;
    filter.Q.value = this.params.filterQ;

    const voiceGain = this.ctx.createGain();
    voiceGain.gain.value = 0;

    // ADSR envelope
    const { attack, decay, release } = this.params;
    const sustainLevel = vel * this.params.gain;

    voiceGain.gain.setValueAtTime(0, t);
    voiceGain.gain.linearRampToValueAtTime(sustainLevel, t + attack);
    voiceGain.gain.linearRampToValueAtTime(sustainLevel * 0.7, t + attack + decay);

    // Wire: osc → filter → voiceGain → outputGain
    osc.connect(filter);
    filter.connect(voiceGain);
    voiceGain.connect(this.outputGain);

    osc.start(t);

    const voice: ActiveVoice = {
      id: this.nextVoiceId++,
      midiNote,
      oscillator: osc,
      filter,
      gain: voiceGain,
      startTime: t,
      releaseTime: null,
      released: false,
    };

    this.voices.push(voice);
  }

  /** Trigger note off (release phase). */
  noteOff(midiNote: number, time?: number): void {
    if (this._disposed) return;

    const t = time ?? this.ctx.currentTime;
    const voice = this.voices.find((v) => v.midiNote === midiNote && !v.released);
    if (!voice) return;

    voice.released = true;
    voice.releaseTime = t;

    const { release } = this.params;
    const currentGain = voice.gain.gain.value;

    voice.gain.gain.cancelScheduledValues(t);
    voice.gain.gain.setValueAtTime(currentGain, t);
    voice.gain.gain.linearRampToValueAtTime(0, t + release);

    voice.oscillator.stop(t + release + 0.05);

    // Clean up after release completes
    const cleanupDelay = (release + 0.1) * 1000;
    setTimeout(() => {
      try {
        voice.oscillator.disconnect();
        voice.filter.disconnect();
        voice.gain.disconnect();
      } catch {
        // already disconnected
      }
      this.voices = this.voices.filter((v) => v.id !== voice.id);
    }, cleanupDelay);
  }

  /** Force-release a voice (for voice stealing). */
  private stealVoice(voice: ActiveVoice, time: number): void {
    voice.gain.gain.cancelScheduledValues(time);
    voice.gain.gain.setValueAtTime(voice.gain.gain.value, time);
    voice.gain.gain.linearRampToValueAtTime(0, time + 0.01);
    voice.oscillator.stop(time + 0.02);

    setTimeout(() => {
      try {
        voice.oscillator.disconnect();
        voice.filter.disconnect();
        voice.gain.disconnect();
      } catch {
        // already disconnected
      }
    }, 50);

    this.voices = this.voices.filter((v) => v.id !== voice.id);
  }

  /** Update default parameters for future voices. */
  setParam(param: string, value: number): void {
    switch (param) {
      case 'detune':
        this.params.detune = value;
        break;
      case 'gain':
        this.params.gain = Math.max(0, Math.min(1, value));
        break;
      case 'attack':
        this.params.attack = Math.max(0, value);
        break;
      case 'decay':
        this.params.decay = Math.max(0, value);
        break;
      case 'release':
        this.params.release = Math.max(0, value);
        break;
      case 'filterFreq':
        this.params.filterFreq = Math.max(20, Math.min(20000, value));
        break;
      case 'filterQ':
        this.params.filterQ = Math.max(0.1, Math.min(20, value));
        break;
    }
  }

  /** Route all voices through the common output gain to a destination. */
  connect(destination: AudioNode): void {
    this.outputGain.connect(destination);
  }

  /** Disconnect the output gain. */
  disconnect(): void {
    try {
      this.outputGain.disconnect();
    } catch {
      // already disconnected
    }
  }

  /** Stop all oscillators and disconnect everything. */
  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;

    for (const voice of this.voices) {
      try {
        voice.oscillator.stop();
        voice.oscillator.disconnect();
        voice.filter.disconnect();
        voice.gain.disconnect();
      } catch {
        // already disconnected
      }
    }
    this.voices = [];

    try {
      this.outputGain.disconnect();
    } catch {
      // already disconnected
    }
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      enabled: this.enabled,
      params: { ...this.params },
      maxVoices: this.maxVoices,
    };
  }
}
