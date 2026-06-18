// ─── LFO ───
// Low-frequency oscillator for modulation of AudioParams.
// Uses an OscillatorNode for audio-rate modulation output.

import type { AudioDevice } from '../DeviceChain';

export type LfoWaveform = 'sine' | 'triangle' | 'sawtooth' | 'square' | 'random';

export interface LfoParams {
  waveform: LfoWaveform;
  rate: number;   // Hz (0.1-20)
  depth: number;  // 0-1
}

const DEFAULT_PARAMS: LfoParams = {
  waveform: 'sine',
  rate: 1.0,
  depth: 1.0,
};

export class LFO implements AudioDevice {
  id: string;
  name = 'LFO';
  type = 'effect';
  enabled = true;

  private ctx: AudioContext;
  private params: LfoParams;
  private oscillator: OscillatorNode;
  private depthGain: GainNode;
  private outputGain: GainNode;
  private _running = false;
  private _disposed = false;
  private _lastRandomValue = 0;
  private _sampleCount = 0;

  constructor(ctx: AudioContext, params?: Partial<LfoParams>) {
    this.id = `lfo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.ctx = ctx;
    this.params = { ...DEFAULT_PARAMS, ...params };

    const clampedRate = Math.max(0.1, Math.min(20, this.params.rate));
    const clampedDepth = Math.max(0, Math.min(1, this.params.depth));
    this.params.rate = clampedRate;
    this.params.depth = clampedDepth;

    this.oscillator = ctx.createOscillator();
    this.oscillator.type = this.mapWaveform(this.params.waveform);
    this.oscillator.frequency.value = clampedRate;

    // Depth gain scales the output
    this.depthGain = ctx.createGain();
    this.depthGain.gain.value = clampedDepth;

    this.outputGain = ctx.createGain();
    this.outputGain.gain.value = 1.0;

    // Wire: oscillator → depthGain → outputGain
    this.oscillator.connect(this.depthGain);
    this.depthGain.connect(this.outputGain);
  }

  private mapWaveform(waveform: LfoWaveform): OscillatorType {
    if (waveform === 'random') return 'sawtooth'; // we handle random separately
    return waveform;
  }

  /** Connect this LFO to modulate a target AudioParam with a given amount. */
  connectToParam(destination: AudioParam, amount: number): void {
    const amountGain = this.ctx.createGain();
    amountGain.gain.value = amount;
    this.outputGain.connect(amountGain);
    amountGain.connect(destination);
  }

  /** Start the LFO oscillator. */
  start(time?: number): void {
    if (this._disposed || this._running) return;
    const t = time ?? this.ctx.currentTime;
    try {
      this.oscillator.start(t);
      this._running = true;
    } catch {
      // already started
    }
  }

  /** Stop the LFO oscillator. */
  stop(time?: number): void {
    if (this._disposed || !this._running) return;
    const t = time ?? this.ctx.currentTime;
    try {
      this.oscillator.stop(t);
      this._running = false;
    } catch {
      // already stopped
    }
  }

  /** Update LFO rate. */
  setRate(rate: number): void {
    const clamped = Math.max(0.1, Math.min(20, rate));
    this.params.rate = clamped;
    this.oscillator.frequency.value = clamped;
  }

  /** Update LFO depth. */
  setDepth(depth: number): void {
    const clamped = Math.max(0, Math.min(1, depth));
    this.params.depth = clamped;
    this.depthGain.gain.value = clamped;
  }

  /** Update LFO waveform. */
  setWaveform(waveform: LfoWaveform): void {
    this.params.waveform = waveform;
    if (waveform !== 'random') {
      this.oscillator.type = waveform;
    }
  }

  /** Get the output gain node for modulation routing. */
  getOutput(): GainNode {
    return this.outputGain;
  }

  /** Get current LFO value (for non-AudioWorklet/manual modulation). */
  getValue(): number {
    if (this.params.waveform === 'random') {
      return this._lastRandomValue;
    }
    return 0.5;
  }

  /** Called each frame to update random LFO value. */
  update(): void {
    if (this.params.waveform === 'random') {
      this._sampleCount++;
      const updateInterval = Math.floor(this.ctx.sampleRate / this.params.rate / 10);
      if (this._sampleCount >= updateInterval) {
        this._sampleCount = 0;
        this._lastRandomValue = Math.random() * 2 - 1;
      }
    }
  }

  /** Required by AudioDevice — LFOs modulate AudioParams, not AudioNodes. Use connectToParam instead. */
  connect(_destination: AudioNode): void {
    // LFOs modulate AudioParams, not AudioNodes.
    // Use connectToParam(destination: AudioParam, amount: number) instead.
  }

  /** Required by AudioDevice. */
  disconnect(): void {
    try {
      this.outputGain.disconnect();
      this.depthGain.disconnect();
    } catch {
      // already disconnected
    }
  }

  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;

    try {
      if (this._running) {
        this.oscillator.stop();
      }
      this.oscillator.disconnect();
      this.depthGain.disconnect();
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
