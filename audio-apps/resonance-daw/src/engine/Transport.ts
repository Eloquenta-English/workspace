// ─── Transport ───
// Scheduler-driven transport for the DAW.
// Uses requestAnimationFrame for precise beat scheduling with lookahead.

import { getEngine } from './AudioEngine';

export const SCHEDULE_AHEAD = 0.1; // seconds to look ahead
export const LOOKAHEAD = 25;       // ms between scheduler ticks

export type TransportListener = (beat: number, time: number) => void;

export class Transport {
  private _playing = false;
  private _recording = false;
  private _currentBeat = 0;
  private _bpm = 120;
  private _loopEnabled = false;
  private _loopStart = 0;
  private _loopEnd = 256;
  private _rafId: number | null = null;
  private _lastScheduleTime = 0;
  private _listeners: TransportListener[] = [];

  get playing(): boolean {
    return this._playing;
  }

  get recording(): boolean {
    return this._recording;
  }

  get currentBeat(): number {
    return this._currentBeat;
  }

  get bpm(): number {
    return this._bpm;
  }

  get loopEnabled(): boolean {
    return this._loopEnabled;
  }

  get loopStart(): number {
    return this._loopStart;
  }

  get loopEnd(): number {
    return this._loopEnd;
  }

  /** Convert beats to seconds at current BPM. */
  beatsToSeconds(beats: number): number {
    return (beats / this._bpm) * 60;
  }

  /** Convert seconds to beats at current BPM. */
  secondsToBeats(seconds: number): number {
    return (seconds * this._bpm) / 60;
  }

  /** Get the current beat position from the audio context clock. */
  getCurrentBeat(): number {
    const engine = getEngine();
    const elapsed = engine.currentTime - this._lastScheduleTime;
    return this._currentBeat + this.secondsToBeats(elapsed);
  }

  setPosition(beat: number): void {
    this._currentBeat = Math.max(0, beat);
    this._lastScheduleTime = getEngine().currentTime;
  }

  setTempo(bpm: number): void {
    this._bpm = Math.max(20, Math.min(300, bpm));
  }

  setLoop(enabled: boolean, start?: number, end?: number): void {
    this._loopEnabled = enabled;
    if (start !== undefined) this._loopStart = start;
    if (end !== undefined) this._loopEnd = end;
  }

  onTick(listener: TransportListener): () => void {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }

  start(): void {
    if (this._playing) return;
    const engine = getEngine();
    engine.resume();
    this._playing = true;
    this._lastScheduleTime = engine.currentTime;
    this._scheduler();
  }

  stop(): void {
    this._playing = false;
    this._recording = false;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this._currentBeat = 0;
    this._lastScheduleTime = 0;
  }

  pause(): void {
    this._playing = false;
    this._recording = false;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  record(): void {
    this._recording = true;
    if (!this._playing) {
      this.start();
    }
  }

  private _scheduler = (): void => {
    if (!this._playing) return;

    const engine = getEngine();
    const now = engine.currentTime;

    // Schedule notes that fall within the lookahead window
    const scheduleUntil = now + SCHEDULE_AHEAD;
    const currentBeat = this.getCurrentBeat();
    const beatsPerSecond = this._bpm / 60;
    const scheduleUntilBeat = currentBeat + (SCHEDULE_AHEAD * beatsPerSecond);

    // Notify listeners
    for (const listener of this._listeners) {
      listener(currentBeat, now);
    }

    // Handle loop wrap
    if (this._loopEnabled && currentBeat >= this._loopEnd) {
      this.setPosition(this._loopStart);
    }

    this._rafId = requestAnimationFrame(this._scheduler);
  };
}

// ─── Singleton ───

let _transport: Transport | null = null;

export function getTransport(): Transport {
  if (!_transport) {
    _transport = new Transport();
  }
  return _transport;
}
