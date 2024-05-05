// Dashboard.tsx
import React from 'react';
import TrainingProgress from '../components/common/TrainingProgress';
import UpcomingSessions from '../components/common/UpcomingSessions';
import PerformanceMetrics from '../components/common/PerformanceMetrics';
import PersonalRecords from '../components/common/PersonalRecords';
import MotivationSection from '../components/common/MotivationSection';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Training Progress */}
      <TrainingProgress />

      {/* Upcoming Sessions */}
      <UpcomingSessions />

      {/* Performance Metrics */}
      <PerformanceMetrics />

      {/* Personal Records */}
      <PersonalRecords />

      {/* Motivation Section */}
      <MotivationSection />
    </div>
  );
};

export default Dashboard;
