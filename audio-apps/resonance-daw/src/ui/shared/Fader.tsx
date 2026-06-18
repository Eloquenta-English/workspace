import React, { useState } from 'react';
import './styles/app.scss';

const Fader = ({ initialValue = 0, onChange }: { initialValue?: number; onChange?: (value: number) => void; }): JSX.Element => {
  const [value, setValue] = useState(initialValue);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Logic for adjusting fader value on drag
  };

  return (
    <div className="fader" onMouseDown={handleMouseDown}>
      <div className="fader-track">
        <div className="fader-fill" style={{ height: `${value * 100}%` }} />
      </div>
      <span>{(value * 100).toFixed(0)} dB</span>
    </div>
  );
};

export default Fader;