import React from 'react';
import { useStore } from '../../state/store';
import type { Track } from '../../state/types';
import './styles/app.scss';

interface ChannelStripProps {
  track: Track;
}

export const ChannelStrip = ({ track }: ChannelStripProps) => {
  const toggleMute = () => useStore.getState().updateTrack(track.id, { muted: !track.muted });
  const toggleSolo = () => useStore.getState().updateTrack(track.id, { solo: !track.solo });
  const toggleRecordArm = () => useStore.getState().updateTrack(track.id, { armed: !track.armed });

  return (
    <div className="channel-strip">
      <div className="track-name">
        <input type="text" defaultValue={track.name} onDoubleClick={() => {/* logic to edit name */}} />
      </div>
      <button onClick={toggleMute}>{track.muted ? 'M' : 'Unmute'}</button>
      <button onClick={toggleSolo}>{track.solo ? 'S' : 'Solo'}</button>
      <button onClick={toggleRecordArm}>{track.armed ? 'R' : 'Arm'}</button>
      {/* Pan knob, send knobs, fader meter can be added here */}
    </div>
  );
};