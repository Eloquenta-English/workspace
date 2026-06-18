import React from 'react';
import { useStore } from '../../state/store';
import './styles/app.scss';

export function FxRackPanel() {
  const selectedTrack = useStore((s) => s.selectedTrackId ? s.project.tracks.find(t => t.id === s.selectedTrackId) : null);

  return (
    <div>
      <div className="panel-title">Device Chain</div>
      {selectedTrack ? (
        <ul>
          {selectedTrack.devices.map((device) => (
            <li key={device.id}>{device.name}</li>
          ))}
        </ul>
      ) : (
        <p>Select a track to view device chain.</p>
      )}
      <button>Add Device</button>
    </div>
  );
}