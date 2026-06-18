// ─── Reverb ───
// Convolver reverb with generated impulse response (exponential decay noise).

import type { AudioDevice } from '../DeviceChain';

export interface ReverbParams {
  duration: number;   // seconds (0.1-10)
  decay: number;      // decay factor (0.1-10)
  preDelay: number;   // seconds (0-0.1)
  wet: number;        // 0-1
  dry: number;        // 0-1
}

const DEFAULT_PARAMS: ReverbParams = {
  duration: 2.0,
  decay: 2.0,
  preDelay: 0.02,
  wet: 0.3,
  dry: 0.7,
};

export class Reverb implements AudioDevice {
  id: string;
  name = 'Reverb';
  type = 'effect';
  enabled = true;

  private ctx: AudioContext;
  private params: ReverbParams;
  private convolver: ConvolverNode;
  private dryGain: GainNode;
  private wetGain: GainNode;
  private inputGain: GainNode;
  private outputGain: GainNode;
  private _disposed = false;

  constructor(ctx: AudioContext, params?: Partial<ReverbParams>) {
    this.id = `reverb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.ctx = ctx;
    this.params = { ...DEFAULT_PARAMS, ...params };

    this.inputGain = ctx.createGain();
    this.dryGain = ctx.createGain();
    this.wetGain = ctx.createGain();
    this.outputGain = ctx.createGain();
    this.convolver = ctx.createConvolver();

    this.generateIR(this.params.duration, this.params.decay);

    this.dryGain.gain.value = this.params.dry;
    this.wetGain.gain.value = this.params.wet;

    // Wet/dry mix: input → dry → output, input → convolver → wet → output
    this.inputGain.connect(this.dryGain);
    this.inputGain.connect(this.convolver);
    this.convolver.connect(this.wetGain);
    this.dryGain.connect(this.outputGain);
    this.wetGain.connect(this.outputGain);
  }

  /** Generate an impulse response buffer with exponential decay noise. */
  generateIR(duration: number, decay: number): void {
    const clampedDuration = Math.max(0.1, Math.min(10, duration));
    const clampedDecay = Math.max(0.1, Math.min(10, decay));
    const clampedPreDelay = Math.max(0, Math.min(0.1, this.params.preDelay));

    const sampleRate = this.ctx.sampleRate;
    const length = Math.floor(clampedDuration * sampleRate);
    const preDelaySamples = Math.floor(clampedPreDelay * sampleRate);
    const buffer = this.ctx.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        if (i < preDelaySamples) {
          data[i] = 0;
        } else {
          const t = (i - preDelaySamples) / sampleRate;
          const envelope = Math.exp(-clampedDecay * t);
          data[i] = (Math.random() * 2 - 1) * envelope;
        }
      }
    }

    this.params.duration = clampedDuration;
    this.params.decay = clampedDecay;
    this.convolver.buffer = buffer;
  }

  /** Update wet/dry mix. */
  setMix(wet: number, dry: number): void {
    this.params.wet = Math.max(0, Math.min(1, wet));
    this.params.dry = Math.max(0, Math.min(1, dry));
    this.wetGain.gain.value = this.params.wet;
    this.dryGain.gain.value = this.params.dry;
  }

  connect(destination: AudioNode): void {
    this.outputGain.connect(destination);
  }

  disconnect(): void {
    try {
      this.outputGain.disconnect();
    } catch {
      // already disconnected
    }
  }

  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;

    try {
      this.inputGain.disconnect();
      this.convolver.disconnect();
      this.dryGain.disconnect();
      this.wetGain.disconnect();
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
    };
  }
}
