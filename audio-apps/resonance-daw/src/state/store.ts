import { create } from 'zustand';
import type { Project, Track, ViewType } from './types';

// ─── Helpers ───

let _uid = 0;
export function uid(): string {
  return `id_${Date.now()}_${++_uid}`;
}

export function createTrack(overrides?: Partial<Track>): Track {
  return {
    id: uid(),
    name: 'New Track',
    type: 'midi',
    color: '#22d3ee',
    volume: 0.8,
    pan: 0,
    muted: false,
    solo: false,
    armed: false,
    clips: [],
    devices: [],
    sends: [],
    rackId: null,
    inputSource: null,
    outputTarget: 'master',
    ...overrides,
  };
}

export function defaultProject(): Project {
  return {
    id: uid(),
    name: 'Untitled Project',
    bpm: 120,
    timeSignature: { numerator: 4, denominator: 4 },
    tracks: [],
    returnRacks: [],
    masterRackId: null,
    duration: 256,
  };
}

// ─── Store Shape ───

interface DawState {
  // UI
  view: ViewType;
  setView: (view: ViewType) => void;

  // Project
  project: Project;
  setProject: (project: Project) => void;
  setBpm: (bpm: number) => void;
  setTimeSignature: (num: number, den: number) => void;

  // Track selection
  selectedTrackId: string | null;
  selectedClipId: string | null;
  selectTrack: (id: string | null) => void;
  selectClip: (id: string | null) => void;

  // Track CRUD
  addTrack: (track?: Partial<Track>) => void;
  removeTrack: (id: string) => void;
  updateTrack: (id: string, changes: Partial<Track>) => void;

  // Clip CRUD
  addClip: (trackId: string, clip?: Partial<import('./types').Clip>) => void;
  removeClip: (trackId: string, clipId: string) => void;
  updateClip: (trackId: string, clipId: string, changes: Partial<import('./types').Clip>) => void;

  // Transport
  transport: {
    playing: boolean;
    recording: boolean;
    currentBeat: number;
    loopEnabled: boolean;
    loopStart: number;
    loopEnd: number;
  };
  setTransport: (changes: Partial<DawState['transport']>) => void;
}

export const useStore = create<DawState>((set) => ({
  // UI
  view: 'arrangement',
  setView: (view) => set({ view }),

  // Project
  project: defaultProject(),
  setProject: (project) => set({ project }),
  setBpm: (bpm) =>
    set((s) => ({ project: { ...s.project, bpm } })),
  setTimeSignature: (numerator, denominator) =>
    set((s) => ({
      project: { ...s.project, timeSignature: { numerator, denominator } },
    })),

  // Selection
  selectedTrackId: null,
  selectedClipId: null,
  selectTrack: (id) => set({ selectedTrackId: id, selectedClipId: null }),
  selectClip: (id) => set({ selectedClipId: id }),

  // Track CRUD
  addTrack: (overrides) =>
    set((s) => ({
      project: {
        ...s.project,
        tracks: [...s.project.tracks, createTrack(overrides)],
      },
    })),
  removeTrack: (id) =>
    set((s) => ({
      project: {
        ...s.project,
        tracks: s.project.tracks.filter((t) => t.id !== id),
      },
    })),
  updateTrack: (id, changes) =>
    set((s) => ({
      project: {
        ...s.project,
        tracks: s.project.tracks.map((t) =>
          t.id === id ? { ...t, ...changes } : t
        ),
      },
    })),

  // Clip CRUD
  addClip: (trackId, overrides) =>
    set((s) => ({
      project: {
        ...s.project,
        tracks: s.project.tracks.map((t) =>
          t.id === trackId
            ? {
                ...t,
                clips: [
                  ...t.clips,
                  {
                    id: uid(),
                    name: 'New Clip',
                    trackId,
                    startBeat: 0,
                    duration: 4,
                    color: t.color,
                    midiNotes: [],
                    muted: false,
                    ...overrides,
                  },
                ],
              }
            : t
        ),
      },
    })),
  removeClip: (trackId, clipId) =>
    set((s) => ({
      project: {
        ...s.project,
        tracks: s.project.tracks.map((t) =>
          t.id === trackId
            ? { ...t, clips: t.clips.filter((c) => c.id !== clipId) }
            : t
        ),
      },
    })),
  updateClip: (trackId, clipId, changes) =>
    set((s) => ({
      project: {
        ...s.project,
        tracks: s.project.tracks.map((t) =>
          t.id === trackId
            ? {
                ...t,
                clips: t.clips.map((c) =>
                  c.id === clipId ? { ...c, ...changes } : c
                ),
              }
            : t
        ),
      },
    })),

  // Transport
  transport: {
    playing: false,
    recording: false,
    currentBeat: 0,
    loopEnabled: false,
    loopStart: 0,
    loopEnd: 256,
  },
  setTransport: (changes) =>
    set((s) => ({ transport: { ...s.transport, ...changes } })),
}));
