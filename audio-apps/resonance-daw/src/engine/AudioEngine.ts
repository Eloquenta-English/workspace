// ─── AudioEngine ───
// Core audio context manager for Resonance DAW.
// Manages the Web Audio API graph: master compressor → master gain → analyser → destination.

export class AudioEngine {
  ctx: AudioContext;
  masterCompressor: DynamicsCompressorNode;
  masterGain: GainNode;
  analyser: AnalyserNode;
  private _disposed = false;

  constructor() {
    this.ctx = new AudioContext();

    // Master chain: compressor → gain → analyser → destination
    this.masterCompressor = this.ctx.createDynamicsCompressor();
    this.masterCompressor.threshold.value = -24;
    this.masterCompressor.knee.value = 30;
    this.masterCompressor.ratio.value = 12;
    this.masterCompressor.attack.value = 0.003;
    this.masterCompressor.release.value = 0.25;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.8;

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.8;

    // Wire master chain
    this.masterCompressor.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  /** The input node where all track outputs should be connected. */
  get masterInput(): AudioNode {
    return this.masterCompressor;
  }

  get currentTime(): number {
    return this.ctx.currentTime;
  }

  get sampleRate(): number {
    return this.ctx.sampleRate;
  }

  get state(): AudioContextState {
    return this.ctx.state;
  }

  async resume(): Promise<void> {
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  async loadWorklets(): Promise<void> {
    // Placeholder for future AudioWorklet loading.
    // e.g. await this.ctx.audioWorklet.addModule('/worklets/processor.js');
    console.log('[AudioEngine] Worklets loaded (placeholder)');
  }

  getAnalyserData(): Uint8Array {
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  getWaveformData(): Uint8Array {
    const data = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(data);
    return data;
  }

  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;
    this.masterCompressor.disconnect();
    this.masterGain.disconnect();
    this.analyser.disconnect();
    this.ctx.close();
  }
}

// ─── Singleton ───

let _engine: AudioEngine | null = null;

export function getEngine(): AudioEngine {
  if (!_engine) {
    _engine = new AudioEngine();
  }
  return _engine;
}
