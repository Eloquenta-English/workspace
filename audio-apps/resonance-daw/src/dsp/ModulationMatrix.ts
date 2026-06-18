// ─── ModulationMatrix ───
// Routes LFOs and Macro knobs to target AudioParams with configurable amounts.

import { LFO, type LfoParams } from './devices/LFO';

export interface ModulationRoute {
  id: string;
  sourceId: string;       // e.g. 'lfo_0', 'macro_3'
  target: AudioParam;
  amount: number;         // -1 to 1
  range?: [number, number]; // optional output range mapping
  gainNode: GainNode;     // internal gain node for scaling
}

export interface MacroKnob {
  index: number;
  value: number;  // 0-1
  name: string;
}

export class ModulationMatrix {
  id: string;
  name = 'Modulation Matrix';

  lfos: LFO[] = [];
  macros: MacroKnob[] = [];
  routes: ModulationRoute[] = [];

  private ctx: AudioContext;
  private _disposed = false;
  private _rafId: number | null = null;

  constructor(ctx: AudioContext) {
    this.id = `modmatrix_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.ctx = ctx;

    // Initialize 16 LFOs
    for (let i = 0; i < 16; i++) {
      const lfo = new LFO(ctx, { waveform: 'sine', rate: 1.0 + i * 0.5, depth: 1.0 });
      this.lfos.push(lfo);
    }

    // Initialize 16 Macro knobs
    for (let i = 0; i < 16; i++) {
      this.macros.push({
        index: i,
        value: 0.5,
        name: `Macro ${i + 1}`,
      });
    }
  }

  /** Add a modulation route from a source to a target AudioParam. */
  addRoute(sourceId: string, target: AudioParam, amount: number, range?: [number, number]): ModulationRoute {
    const clampedAmount = Math.max(-1, Math.min(1, amount));

    // Create a gain node to scale the modulation
    const gainNode = this.ctx.createGain();
    gainNode.gain.value = clampedAmount;

    // If source is an LFO, connect it through the gain node to the target
    if (sourceId.startsWith('lfo_')) {
      const lfoIndex = parseInt(sourceId.split('_')[1], 10);
      if (!isNaN(lfoIndex) && lfoIndex >= 0 && lfoIndex < this.lfos.length) {
        const lfo = this.lfos[lfoIndex];
        lfo.getOutput().connect(gainNode);
        gainNode.connect(target);
      }
    }
    // If source is a macro, we handle it in update()

    const route: ModulationRoute = {
      id: `route_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      sourceId,
      target,
      amount: clampedAmount,
      range,
      gainNode,
    };

    this.routes.push(route);
    return route;
  }

  /** Remove a modulation route by ID. */
  removeRoute(routeId: string): void {
    const idx = this.routes.findIndex((r) => r.id === routeId);
    if (idx !== -1) {
      const route = this.routes[idx];
      try {
        route.gainNode.disconnect();
      } catch {
        // already disconnected
      }
      this.routes.splice(idx, 1);
    }
  }

  /** Set a macro knob value (0-1). */
  setMacro(index: number, value: number): void {
    if (index < 0 || index >= 16) return;
    const clamped = Math.max(0, Math.min(1, value));
    this.macros[index].value = clamped;

    // Update all routes that use this macro
    const macroId = `macro_${index}`;
    for (const route of this.routes) {
      if (route.sourceId === macroId) {
        // Map macro value through the route's amount and optional range
        let outputValue = clamped * route.amount;
        if (route.range) {
          const [min, max] = route.range;
          outputValue = min + outputValue * (max - min);
        }
        route.gainNode.gain.value = outputValue;
      }
    }
  }

  /** Get an LFO by index. */
  getLFO(index: number): LFO | undefined {
    return this.lfos[index];
  }

  /** Start all LFOs. */
  startAllLFOs(time?: number): void {
    for (const lfo of this.lfos) {
      lfo.start(time);
    }
  }

  /** Stop all LFOs. */
  stopAllLFOs(time?: number): void {
    for (const lfo of this.lfos) {
      lfo.stop(time);
    }
  }

  /** Update modulation values. Called each frame for non-AudioWorklet LFOs. */
  update(): void {
    for (const lfo of this.lfos) {
      lfo.update();
    }
  }

  /** Start the modulation update loop. */
  startUpdateLoop(): void {
    const loop = (): void => {
      if (this._disposed) return;
      this.update();
      this._rafId = requestAnimationFrame(loop);
    };
    this._rafId = requestAnimationFrame(loop);
  }

  /** Stop the modulation update loop. */
  stopUpdateLoop(): void {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  /** Dispose all LFOs, routes, and clean up. */
  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;

    this.stopUpdateLoop();

    for (const route of this.routes) {
      try {
        route.gainNode.disconnect();
      } catch {
        // already disconnected
      }
    }
    this.routes = [];

    for (const lfo of this.lfos) {
      lfo.dispose();
    }
    this.lfos = [];
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      lfos: this.lfos.map((l) => l.toJson()),
      macros: this.macros.map((m) => ({ ...m })),
      routes: this.routes.map((r) => ({
        id: r.id,
        sourceId: r.sourceId,
        amount: r.amount,
        range: r.range,
      })),
    };
  }
}
