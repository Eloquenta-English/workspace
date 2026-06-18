import React from 'react';
import { useStore } from '../../state/store';
import type { Clip } from '../../state/types';
import './styles/app.scss';

interface ClipBlockProps {
  clip: Clip;
}

export const ClipBlock = ({ clip }: ClipBlockProps) => {
  const selectClip = () => useStore.getState().selectClip(clip.id);

  return (
    <div className="clip-block" onClick={selectClip} style={{ backgroundColor: clip.color }}>
      {clip.name}
      {/* Waveform placeholder can be added here */}
    </div>
  );
};