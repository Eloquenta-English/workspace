import React from 'react';
import { useStore } from '../../state/store';
import { ClipSlot } from './ClipSlot';
import './styles/app.scss';

export function SessionView() {
  const tracks = useStore((s) => s.project.tracks);
  const scenes = [...Array(4).keys()];  // For demonstration; replace with actual scenes

  return (
    <div className="session-view">
      {tracks.map((track, trackIndex) => (
        <div key={track.id} className="track-row">
          {scenes.map((scene) => (
            <ClipSlot key={`${track.id}-${scene}`} trackId={track.id} scene={scene} />
          ))}
          <button onClick={() => {/* Launch scene logic */}}>Launch</button>
        </div>
      ))}
    </div>
  );
}