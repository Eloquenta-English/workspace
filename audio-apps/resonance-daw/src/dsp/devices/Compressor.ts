// ─── Compressor ───
// Dynamics compressor wrapping DynamicsCompressorNode.

import type { AudioDevice } from '../DeviceChain';

export interface CompressorParams {
  threshold: number; // dB (-60 to 0)
  ratio: number;     // 1-20
  attack: number;    // seconds (0.001-1)
  release: number;   // seconds (0.01-1)
  knee: number;      // dB (0-40)
}

const DEFAULT_PARAMS: CompressorParams = {
  threshold: -24,
  ratio: 4,
  attack: 0.003,
  release: 0.25,
  knee: 30,
};

export class Compressor implements AudioDevice {
  id: string;
  name = 'Compressor';
  type = 'effect';
  enabled = true;

  private ctx: AudioContext;
  private params: CompressorParams;
  private node: DynamicsCompressorNode;
  private inputGain: GainNode;
  private outputGain: GainNode;
  private _disposed = false;

  constructor(ctx: AudioContext, params?: Partial<CompressorParams>) {
    this.id = `compressor_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.ctx = ctx;
    this.params = { ...DEFAULT_PARAMS, ...params };

    this.inputGain = ctx.createGain();
    this.outputGain = ctx.createGain();
    this.node = ctx.createDynamicsCompressor();

    this.node.threshold.value = Math.max(-60, Math.min(0, this.params.threshold));
    this.node.ratio.value = Math.max(1, Math.min(20, this.params.ratio));
    this.node.attack.value = Math.max(0.001, Math.min(1, this.params.attack));
    this.node.release.value = Math.max(0.01, Math.min(1, this.params.release));
    this.node.knee.value = Math.max(0, Math.min(40, this.params.knee));

    this.inputGain.connect(this.node);
    this.node.connect(this.outputGain);
  }

  /** Update a compressor parameter. */
  setParam(param: keyof CompressorParams, value: number): void {
    switch (param) {
      case 'threshold':
        this.params.threshold = Math.max(-60, Math.min(0, value));
        this.node.threshold.value = this.params.threshold;
        break;
      case 'ratio':
        this.params.ratio = Math.max(1, Math.min(20, value));
        this.node.ratio.value = this.params.ratio;
        break;
      case 'attack':
        this.params.attack = Math.max(0.001, Math.min(1, value));
        this.node.attack.value = this.params.attack;
        break;
      case 'release':
        this.params.release = Math.max(0.01, Math.min(1, value));
        this.node.release.value = this.params.release;
        break;
      case 'knee':
        this.params.knee = Math.max(0, Math.min(40, value));
        this.node.knee.value = this.params.knee;
        break;
    }
  }

  /** Get current parameters. */
  getParams(): CompressorParams {
    return { ...this.params };
  }

  /** Get the underlying DynamicsCompressorNode for metering. */
  getDynamicsNode(): DynamicsCompressorNode {
    return this.node;
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
      this.node.disconnect();
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
