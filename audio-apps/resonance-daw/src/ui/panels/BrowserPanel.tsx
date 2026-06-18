import React, { useState } from 'react';
import { useStore } from '../../state/store';
import './styles/app.scss';

export function BrowserPanel() {
  const [activeTab, setActiveTab] = useState('plugins');
  const plugins = ['Synth', 'Reverb', 'Delay', 'EQ', 'Compressor', 'LFO', 'Drum Grid'];

  return (
    <div>
      <div className="panel-title">{activeTab === 'plugins' ? 'Plugins' : 'Samples'}</div>
      <div>
        <button onClick={() => setActiveTab('plugins')}>Plugins</button>
        <button onClick={() => setActiveTab('samples')}>Samples</button>
      </div>
      {activeTab === 'plugins' && (
        <ul>
          {plugins.map((plugin, index) => (
            <li key={index}>{plugin}</li>
          ))}
        </ul>
      )}
      {/* Samples section logic goes here */}
    </div>
  );
}