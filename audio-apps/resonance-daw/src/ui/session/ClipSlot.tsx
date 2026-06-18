import React from 'react';
import { useStore } from '../../state/store';
import './styles/app.scss';

interface ClipSlotProps {
  trackId: string;
  scene: number;
}

export const ClipSlot = ({ trackId, scene }: ClipSlotProps) => {
  const handleClick = () => {
    // Handle launching or stopping the clip logic here.
  };

  return (
    <div className="clip-slot" onClick={handleClick}>
      <div className="clip-slot-dashed">
        {/* Add clip content here if exists */}
        <span>+</span>
      </div>
    </div>
  );
};