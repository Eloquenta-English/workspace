import React from 'react';
import './styles/app.scss';

const Meter = ({ level }: { level: number }): JSX.Element => {
  return (
    <div className="meter">
      <div className="meter-segment" style={{ height: level < 0.5 ? '50%' : '100%', backgroundColor: level < 0.5 ? 'green' : 'amber' }} />
      {/* Additional segments can be added for peak hold */}
    </div>
  );
};

export default Meter;