import React from 'react';
import { useStore } from '../state/store';
import { TransportBar } from './TransportBar';
import './styles/app.scss';

export function App() {
  const view = useStore((s) => s.view);

  return (
    <div className="app">
      <TransportBar />
      <div className="main-content">
        <div className="panel-left">
          <div className="panel-title">Inspector</div>
          {/* Inspector component will go here */}
        </div>
        <div className="panel-center">
          <div className="view-container">
            {view === 'arrangement' && <div className="placeholder">Arrangement View</div>}
            {view === 'session' && <div className="placeholder">Session View</div>}
            {view === 'mix' && <div className="placeholder">Mix View</div>}
          </div>
        </div>
        <div className="panel-right">
          <div className="panel-title">Browser</div>
          {/* Browser component will go here */}
        </div>
      </div>
      <div className="bottom-panel">
        <div className="panel-title">Editor</div>
        {/* Editor component will go here */}
      </div>
    </div>
  );
}