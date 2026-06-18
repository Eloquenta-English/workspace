import React from 'react';
import { useStore } from '../../state/store';
import { ClipBlock } from './ClipBlock';
import { TrackHeader } from './TrackHeader';
import './styles/app.scss';

export function ArrangementView() {
  const tracks = useStore((s) => s.project.tracks);

  return (
    <div className="arrangement-view">
      <div className="time-ruler">
        {/* Time ruler implementation goes here */}
      </div>
      {tracks.map((track) => (
        <div key={track.id} className="track-header">
          <TrackHeader track={track} />
          <div className="track-clips">
            {track.clips.map((clip) => (
              <ClipBlock key={clip.id} clip={clip} />
            ))}
          </div>
        </div>
      ))}
      <div className="playhead" style={{ left: `${useStore.getState().transport.currentBeat * 10}px` }}>
        {/* Playhead line implementation goes here */}
      </div>
    </div>
  );
}