// ─── Filter ───
// Parametric EQ device with 4 bands of BiquadFilterNodes in series.

import type { AudioDevice } from '../DeviceChain';

export type FilterBandType = 'lowshelf' | 'peaking' | 'highshelf';

export interface FilterBand {
  type: FilterBandType;
  frequency: number;  // Hz
  gain: number;       // dB (-24 to +24)
  Q: number;          // 0.1-20
}

const DEFAULT_BANDS: FilterBand[] = [
  { type: 'lowshelf', frequency: 100, gain: 0, Q: 1 },
  { type: 'peaking', frequency: 500, gain: 0, Q: 1 },
  { type: 'peaking', frequency: 2000, gain: 0, Q: 1 },
  { type: 'highshelf', frequency: 8000, gain: 0, Q: 1 },
];

export class Filter implements AudioDevice {
  id: string;
  name = 'Parametric EQ';
  type = 'effect';
  enabled = true;

  private ctx: AudioContext;
  private bands: FilterBand[];
  private nodes: BiquadFilterNode[];
  private inputGain: GainNode;
  private outputGain: GainNode;
  private _disposed = false;

  constructor(ctx: AudioContext, bands?: FilterBand[]) {
    this.id = `filter_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.ctx = ctx;
    this.bands = bands ? bands.map((b) => ({ ...b })) : DEFAULT_BANDS.map((b) => ({ ...b }));

    this.inputGain = ctx.createGain();
    this.outputGain = ctx.createGain();

    this.nodes = this.bands.map((band) => {
      const node = ctx.createBiquadFilter();
      node.type = band.type;
      node.frequency.value = band.frequency;
      node.gain.value = band.gain;
      node.Q.value = band.Q;
      return node;
    });

    // Wire in series: input → band0 → band1 → band2 → band3 → output
    this.inputGain.connect(this.nodes[0]);
    for (let i = 0; i < this.nodes.length - 1; i++) {
      this.nodes[i].connect(this.nodes[i + 1]);
    }
    this.nodes[this.nodes.length - 1].connect(this.outputGain);
  }

  /** Update parameters for a specific band. */
  setBand(bandIndex: number, params: Partial<FilterBand>): void {
    if (bandIndex < 0 || bandIndex >= 4) return;

    const band = this.bands[bandIndex];
    const node = this.nodes[bandIndex];

    if (params.type !== undefined) {
      band.type = params.type;
      node.type = params.type;
    }
    if (params.frequency !== undefined) {
      band.frequency = Math.max(20, Math.min(20000, params.frequency));
      node.frequency.value = band.frequency;
    }
    if (params.gain !== undefined) {
      band.gain = Math.max(-24, Math.min(24, params.gain));
      node.gain.value = band.gain;
    }
    if (params.Q !== undefined) {
      band.Q = Math.max(0.1, Math.min(20, params.Q));
      node.Q.value = band.Q;
    }
  }

  /** Get current band parameters. */
  getBands(): FilterBand[] {
    return this.bands.map((b) => ({ ...b }));
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
      for (const node of this.nodes) {
        node.disconnect();
      }
      this.outputGain.disconnect();
    } catch {
      // already disconnected
    }
  }

  toParamData(): FilterBand[] {
    return this.bands.map((b) => ({ ...b }));
  }

  fromParamData(data: FilterBand[]): void {
    for (let i = 0; i < Math.min(data.length, 4); i++) {
      this.setBand(i, data[i]);
    }
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      enabled: this.enabled,
      bands: this.bands.map((b) => ({ ...b })),
    };
  }
}
