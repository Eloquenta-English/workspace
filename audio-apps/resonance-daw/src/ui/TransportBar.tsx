import React from 'react';
import { useStore } from '../state/store';
import './styles/app.scss';

export const TransportBar = () => {
  const { playing, recording, currentBeat } = useStore((s) => s.transport);
  const setView = useStore((s) => s.setView);

  const togglePlay = () => {
    if (playing) {
      /* Add stop logic */
    } else {
      /* Add play logic */
    }
  };

  const toggleRecord = () => {
    /* Add record logic */
  };

  return (
    <div className="transport-bar">
      <span className="logo">Resonance DAW</span>
      <div className="transport-controls">
        <button className="transport-btn" onClick={() => {/* Rewind logic */}}>⏮</button>
        <button className="transport-btn transport-play" onClick={togglePlay}>{playing ? '⏸' : '▶'}</button>
        <button className="transport-btn" onClick={() => {/* Stop logic */}}>⏹</button>
        <button className="transport-btn transport-record" onClick={toggleRecord}>⏺</button>
        <span className="tempo-display">120 BPM</span>
        <span className="position-display">{currentBeat}</span>
      </div>
      <div className="transport-right">
        <button className="transport-btn" onClick={() => setView('session')}>Session</button>
        <button className="transport-btn active" onClick={() => setView('arrangement')}>Arrangement</button>
        <button className="transport-btn" onClick={() => setView('mix')}>Mix</button>
      </div>
    </div>
  );
};