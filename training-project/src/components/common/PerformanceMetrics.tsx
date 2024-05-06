import React from 'react';
import '../../styles/common.css';

const PerformanceMetrics: React.FC = () => {
  // Example data (replace with actual data)
  const performanceData = {
    time: [30, 45, 60, 75], // minutes
    distance: [5, 7, 8, 10], // kilometers
  };

  return (
    <div className="performance-metrics">
      <h2>Performance Metrics</h2>
        <p>Time (minutes): {performanceData.time.join(', ')}</p>
        <p>Distance (kilometers): {performanceData.distance.join(', ')}</p>
    </div>
  );
};

export default PerformanceMetrics;
