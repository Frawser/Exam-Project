import React from 'react';
import '../../styles/common.css';

const PersonalRecords: React.FC = () => {
  // Example data (replace with actual data)
  const personalBests = {
    fastestRun: '5:30 min/km',
    longestDistance: '10 km',
  };

  return (
    <div className="personal-records">
      <h2>Personal Records</h2>
      <p>Fastest run: {personalBests.fastestRun}</p>
      <p>Longest distance: {personalBests.longestDistance}</p>
    </div>
  );
};

export default PersonalRecords;
