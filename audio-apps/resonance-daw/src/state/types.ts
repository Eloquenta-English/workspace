// ─── Core Types for Resonance DAW ───

export type ViewType = 'session' | 'arrangement' | 'mix';

export interface MidiNote {
  id: string;
  pitch: number;       // 0-127
  startBeat: number;   // beat position in the clip
  duration: number;    // in beats
  velocity: number;    // 0-127
  selected: boolean;
}

export interface Clip {
  id: string;
  name: string;
  trackId: string;
  startBeat: number;   // beat position on the timeline
  duration: number;    // in beats
  color: string;
  midiNotes: MidiNote[];
  muted: boolean;
}

export interface Modulation {
  id: string;
  source: string;      // e.g. 'lfo1', 'env1'
  target: string;      // e.g. 'filter.cutoff'
  amount: number;      // -1 to 1
}

export interface Device {
  id: string;
  name: string;
  type: 'synth' | 'effect' | 'midi';
  enabled: boolean;
  params: Record<string, number>;
  modulations: Modulation[];
}

export interface RackChain {
  id: string;
  devices: Device[];
  inputGain: number;
  outputGain: number;
}

export interface Rack {
  id: string;
  name: string;
  chains: RackChain[];
}

export interface Send {
  id: string;
  targetRackId: string;
  gain: number;
  preFader: boolean;
}

export interface Track {
  id: string;
  name: string;
  type: 'midi' | 'audio' | 'return' | 'master';
  color: string;
  volume: number;      // 0-1
  pan: number;         // -1 to 1
  muted: boolean;
  solo: boolean;
  armed: boolean;
  clips: Clip[];
  devices: Device[];
  sends: Send[];
  rackId: string | null;
  inputSource: string | null;
  outputTarget: string;
}

export interface TimeSignature {
  numerator: number;
  denominator: number;
}

export interface Project {
  id: string;
  name: string;
  bpm: number;
  timeSignature: TimeSignature;
  tracks: Track[];
  returnRacks: Rack[];
  masterRackId: string | null;
  duration: number;     // total beats in the arrangement
}

export interface TransportState {
  playing: boolean;
  recording: boolean;
  currentBeat: number;
  loopEnabled: boolean;
  loopStart: number;
  loopEnd: number;
}
