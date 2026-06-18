import React from 'react';
import { useStore } from '../../state/store';
import { ChatPanel } from './ChatPanel';
import './styles/inspector.scss';

export function InspectorPanel() {
  const selectedTrack = useStore((s) => s.selectedTrackId
    ? s.project.tracks.find(t => t.id === s.selectedTrackId) ?? null
    : null);
  const selectedClip = useStore((s) => s.selectedClipId
    ? s.project.tracks.flatMap(t => t.clips).find(c => c.id === s.selectedClipId) ?? null
    : null);

  return (
    <div className="inspector-panel">
      <div className="inspector-section">
        <div className="panel-title">Inspector</div>
        {selectedTrack ? (
          <div className="inspector-content">
            <label className="inspector-label">Name</label>
            <input className="inspector-input" type="text" defaultValue={selectedTrack.name} readOnly />
            <label className="inspector-label">Volume</label>
            <input className="inspector-input" type="text" defaultValue={`${Math.round(selectedTrack.volume * 100)}%`} readOnly />
            <label className="inspector-label">Pan</label>
            <input className="inspector-input" type="text" defaultValue={selectedTrack.pan.toFixed(2)} readOnly />
          </div>
        ) : selectedClip ? (
          <div className="inspector-content">
            <label className="inspector-label">Name</label>
            <input className="inspector-input" type="text" defaultValue={selectedClip.name} readOnly />
            <label className="inspector-label">Start</label>
            <input className="inspector-input" type="text" defaultValue={`${selectedClip.startBeat.toFixed(1)} beats`} readOnly />
            <label className="inspector-label">Duration</label>
            <input className="inspector-input" type="text" defaultValue={`${selectedClip.duration.toFixed(1)} beats`} readOnly />
          </div>
        ) : (
          <p className="inspector-empty">Select a track or clip to inspect.</p>
        )}
      </div>
      <div className="inspector-divider" />
      <ChatPanel />
    </div>
  );
}
