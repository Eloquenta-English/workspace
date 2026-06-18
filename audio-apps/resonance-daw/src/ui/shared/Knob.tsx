import React, { useState } from 'react';
import './styles/app.scss';

const Knob = ({ color, onChange }: { color: string; onChange?: (value: number) => void; }): JSX.Element => {
  const [value, setValue] = useState(0.5);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Logic for adjusting knob value on drag
  };

  return (
    <div className="knob" style={{ backgroundColor: color }} onMouseDown={handleMouseDown}>
      <span>{(value * 100).toFixed(0)}%</span>
    </div>
  );
};

export default Knob;