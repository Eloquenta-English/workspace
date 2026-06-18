// ─── Delay ───
// Stereo ping-pong delay with cross-feedback.

import type { AudioDevice } from '../DeviceChain';

export interface DelayParams {
  time: number;     // seconds (0.01-2.0)
  feedback: number; // 0-0.9
  wet: number;      // 0-1
  dry: number;      // 0-1
}

const DEFAULT_PARAMS: DelayParams = {
  time: 0.25,
  feedback: 0.4,
  wet: 0.3,
  dry: 0.7,
};

export class Delay implements AudioDevice {
  id: string;
  name = 'Ping-Pong Delay';
  type = 'effect';
  enabled = true;

  private ctx: AudioContext;
  private params: DelayParams;
  private delayL: DelayNode;
  private delayR: DelayNode;
  private feedbackL: GainNode;
  private feedbackR: GainNode;
  private crossL: GainNode;  // feedback from R to L
  private crossR: GainNode;  // feedback from L to R
  private dryGain: GainNode;
  private wetGain: GainNode;
  private inputGain: GainNode;
  private outputGain: GainNode;
  private merger: ChannelMergerNode;
  private _disposed = false;

  constructor(ctx: AudioContext, params?: Partial<DelayParams>) {
    this.id = `delay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.ctx = ctx;
    this.params = { ...DEFAULT_PARAMS, ...params };

    const clampedTime = Math.max(0.01, Math.min(2.0, this.params.time));
    this.params.time = clampedTime;

    this.inputGain = ctx.createGain();
    this.dryGain = ctx.createGain();
    this.wetGain = ctx.createGain();
    this.outputGain = ctx.createGain();

    // Two delay nodes for L/R
    this.delayL = ctx.createDelay(2.0);
    this.delayR = ctx.createDelay(2.0);
    this.delayL.delayTime.value = clampedTime;
    this.delayR.delayTime.value = clampedTime * 1.1; // slight offset for stereo width

    // Feedback gains
    this.feedbackL = ctx.createGain();
    this.feedbackR = ctx.createGain();
    const clampedFb = Math.max(0, Math.min(0.9, this.params.feedback));
    this.feedbackL.gain.value = clampedFb;
    this.feedbackR.gain.value = clampedFb;
    this.params.feedback = clampedFb;

    // Cross-feedback for ping-pong
    this.crossL = ctx.createGain();
    this.crossR = ctx.createGain();
    this.crossL.gain.value = clampedFb * 0.8;
    this.crossR.gain.value = clampedFb * 0.8;

    // Merger to combine L/R back to stereo
    this.merger = ctx.createChannelMerger(2);

    // Dry/wet mix
    this.dryGain.gain.value = this.params.dry;
    this.wetGain.gain.value = this.params.wet;

    // Wire the ping-pong network:
    // input → delayL → merger(0)
    // input → delayR → merger(1)
    // delayL → feedbackL → delayL (self feedback)
    // delayR → feedbackR → delayR (self feedback)
    // delayL → crossR → delayR (cross feedback)
    // delayR → crossL → delayL (cross feedback)
    this.inputGain.connect(this.delayL);
    this.inputGain.connect(this.delayR);

    this.delayL.connect(this.merger, 0, 0); // L → channel 0
    this.delayR.connect(this.merger, 0, 1); // R → channel 1

    // Self-feedback
    this.delayL.connect(this.feedbackL);
    this.feedbackL.connect(this.delayL);
    this.delayR.connect(this.feedbackR);
    this.feedbackR.connect(this.delayR);

    // Cross-feedback (ping-pong)
    this.delayL.connect(this.crossR);
    this.crossR.connect(this.delayR);
    this.delayR.connect(this.crossL);
    this.crossL.connect(this.delayL);

    // Wet/dry mix
    this.inputGain.connect(this.dryGain);
    this.merger.connect(this.wetGain);
    this.dryGain.connect(this.outputGain);
    this.wetGain.connect(this.outputGain);
  }

  /** Update delay time. */
  setTime(time: number): void {
    const clamped = Math.max(0.01, Math.min(2.0, time));
    this.params.time = clamped;
    this.delayL.delayTime.value = clamped;
    this.delayR.delayTime.value = clamped * 1.1;
  }

  /** Update feedback amount. */
  setFeedback(feedback: number): void {
    const clamped = Math.max(0, Math.min(0.9, feedback));
    this.params.feedback = clamped;
    this.feedbackL.gain.value = clamped;
    this.feedbackR.gain.value = clamped;
    this.crossL.gain.value = clamped * 0.8;
    this.crossR.gain.value = clamped * 0.8;
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
      this.delayL.disconnect();
      this.delayR.disconnect();
      this.feedbackL.disconnect();
      this.feedbackR.disconnect();
      this.crossL.disconnect();
      this.crossR.disconnect();
      this.dryGain.disconnect();
      this.wetGain.disconnect();
      this.merger.disconnect();
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
