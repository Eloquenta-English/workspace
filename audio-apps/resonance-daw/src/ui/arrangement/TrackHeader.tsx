import React from 'react';
import { useStore } from '../../state/store';
import type { Track } from '../../state/types';
import './styles/app.scss';

interface TrackHeaderProps {
  track: Track;
}

export const TrackHeader = ({ track }: TrackHeaderProps) => {
  const toggleMute = () => useStore.getState().updateTrack(track.id, { muted: !track.muted });
  const toggleSolo = () => useStore.getState().updateTrack(track.id, { solo: !track.solo });
  const toggleRecordArm = () => useStore.getState().updateTrack(track.id, { armed: !track.armed });

  return (
    <div className="track-header">
      <input type="text" defaultValue={track.name} onDoubleClick={() => {/* logic to edit name */}} />
      <button onClick={toggleMute}>{track.muted ? 'M' : 'Unmute'}</button>
      <button onClick={toggleSolo}>{track.solo ? 'S' : 'Solo'}</button>
      <button onClick={toggleRecordArm}>{track.armed ? 'R' : 'Arm'}</button>
      {/* Volume fader and pan knob would go here */}
      {/* Level meter would go here */}
    </div>
  );
};