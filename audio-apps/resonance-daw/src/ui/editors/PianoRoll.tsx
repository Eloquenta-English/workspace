import React from 'react';
import { useStore } from '../../state/store';
import './styles/app.scss';

export function PianoRoll() {
  const handleNoteDraw = (event: React.MouseEvent) => {
    // Logic for drawing MIDI notes
  };

  return (
    <div className="piano-roll" onMouseDown={handleNoteDraw}>
      <div className="piano-keyboard">
        {/* Piano keys would be rendered here */}
      </div>
      <div className="grid">
        {/* MIDI note grid implementation can go here */}
      </div>
    </div>
  );
}