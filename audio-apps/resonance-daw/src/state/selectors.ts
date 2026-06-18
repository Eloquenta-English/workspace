import { useStore } from './store';
import type { Track, Clip } from './types';

export const selectSelectedTrack = (s: ReturnType<typeof useStore.getState>): Track | null =>
  s.project.tracks.find((t) => t.id === s.selectedTrackId) ?? null;

export const selectSelectedClip = (s: ReturnType<typeof useStore.getState>): Clip | null => {
  const track = selectSelectedTrack(s);
  if (!track) return null;
  return track.clips.find((c) => c.id === s.selectedClipId) ?? null;
};

export const selectSoloActive = (s: ReturnType<typeof useStore.getState>): boolean =>
  s.project.tracks.some((t) => t.solo);
