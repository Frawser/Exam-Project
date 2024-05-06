import React from 'react';
import '../../styles/common.css';

const UpcomingSessions: React.FC = () => {
  // Example data (replace with actual data)
  const upcomingSessions = [
    { date: '2024-05-10', time: '09:00 AM' },
    { date: '2024-05-12', time: '05:30 PM' },
    // Add more sessions
  ];

  return (
    <div className="upcoming-sessions">
      <h2>Upcoming Sessions</h2>
      <ul>
        {upcomingSessions.map((session, index) => (
          <li key={index}>
            {session.date} at {session.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingSessions;
