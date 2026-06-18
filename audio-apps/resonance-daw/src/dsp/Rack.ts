// ─── Rack ───
// Parallel processing rack with multiple chains, each with gain/pan/mute/solo.

import { DeviceChain, type AudioDevice } from './DeviceChain';

export interface RackChain {
  id: string;
  name: string;
  devices: DeviceChain;
  gain: GainNode;
  pan: StereoPannerNode;
  muted: boolean;
  solo: boolean;
}

export class Rack {
  id: string;
  name: string;
  chains: RackChain[] = [];
  private ctx: AudioContext;
  private outputGain: GainNode;
  private _disposed = false;
  private maxChains = 8;

  constructor(ctx: AudioContext, name = 'Rack') {
    this.id = `rack_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.name = name;
    this.ctx = ctx;
    this.outputGain = ctx.createGain();
    this.outputGain.gain.value = 1.0;
  }

  /** Add a new chain to the rack. */
  addChain(name?: string): RackChain | null {
    if (this.chains.length >= this.maxChains) return null;

    const chainId = `rackchain_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const gain = this.ctx.createGain();
    gain.gain.value = 1.0;

    const pan = this.ctx.createStereoPanner();
    pan.pan.value = 0;

    const devices = new DeviceChain(this.ctx, `${name ?? 'Chain'} Devices`);

    const chain: RackChain = {
      id: chainId,
      name: name ?? `Chain ${this.chains.length + 1}`,
      devices,
      gain,
      pan,
      muted: false,
      solo: false,
    };

    this.chains.push(chain);
    return chain;
  }

  /** Remove a chain by ID. */
  removeChain(chainId: string): void {
    const idx = this.chains.findIndex((c) => c.id === chainId);
    if (idx !== -1) {
      const chain = this.chains[idx];
      chain.devices.dispose();
      try {
        chain.gain.disconnect();
        chain.pan.disconnect();
      } catch {
        // already disconnected
      }
      this.chains.splice(idx, 1);
    }
  }

  /** Get a chain by ID. */
  getChain(chainId: string): RackChain | undefined {
    return this.chains.find((c) => c.id === chainId);
  }

  /** Set mute state for a chain. */
  setMute(chainId: string, muted: boolean): void {
    const chain = this.getChain(chainId);
    if (chain) chain.muted = muted;
  }

  /** Set solo state for a chain. */
  setSolo(chainId: string, solo: boolean): void {
    const chain = this.getChain(chainId);
    if (chain) chain.solo = solo;
  }

  /** Determine if any chain in the rack is soloed. */
  private hasSolo(): boolean {
    return this.chains.some((c) => c.solo);
  }

  /** Get the active chains based on mute/solo state. */
  private getActiveChains(): RackChain[] {
    const anySolo = this.hasSolo();
    return this.chains.filter((c) => {
      if (c.muted) return false;
      if (anySolo) return c.solo;
      return true;
    });
  }

  /** Connect the rack: wire all active chains in parallel from input to output. */
  connect(input: AudioNode, output: AudioNode): void {
    // Disconnect existing
    this.disconnect();

    const activeChains = this.getActiveChains();

    for (const chain of activeChains) {
      // Wire: input → chain.gain → chain.pan → chain.devices → outputGain → output
      input.connect(chain.gain);
      chain.gain.connect(chain.pan);
      chain.devices.connect(chain.pan as unknown as AudioNode, this.outputGain);
    }

    this.outputGain.connect(output);
  }

  /** Disconnect all chains. */
  disconnect(): void {
    try {
      this.outputGain.disconnect();
    } catch {
      // already disconnected
    }

    for (const chain of this.chains) {
      try {
        chain.gain.disconnect();
        chain.pan.disconnect();
        chain.devices.disconnect();
      } catch {
        // already disconnected
      }
    }
  }

  /** Dispose all chains and clean up. */
  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;

    for (const chain of this.chains) {
      chain.devices.dispose();
      try {
        chain.gain.disconnect();
        chain.pan.disconnect();
      } catch {
        // already disconnected
      }
    }
    this.chains = [];

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
      chains: this.chains.map((c) => ({
        id: c.id,
        name: c.name,
        devices: c.devices.toJson(),
        gain: c.gain.gain.value,
        pan: c.pan.pan.value,
        muted: c.muted,
        solo: c.solo,
      })),
    };
  }
}
