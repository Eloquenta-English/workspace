import React from 'react';
import { useStore } from '../../state/store';
import { ChannelStrip } from './ChannelStrip';
import './styles/app.scss';

export function MixView() {
  const tracks = useStore((s) => s.project.tracks);

  return (
    <div className="mix-view">
      <div className="channel-strips">
        {tracks.map((track) => (
          <ChannelStrip key={track.id} track={track} />
        ))}
        <button className="add-track-btn">Add Track</button>
      </div>
    </div>
  );
}