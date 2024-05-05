// TrainingProgress.tsx
import React from 'react';

const TrainingProgress: React.FC = () => {
  // Example data (replace with actual data)
  const completedSessions = 10;
  const totalSessions = 20;
  const goalAchieved = true;

  return (
    <div className="training-progress">
      <h2>Training Progress</h2>
      <p>
        Completed sessions: {completedSessions} / {totalSessions}
      </p>
      <p>Goal achieved: {goalAchieved ? 'Yes' : 'No'}</p>
      {/* Add progress bars here */}
    </div>
  );
};

export default TrainingProgress;
