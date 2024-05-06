import React from 'react';
import '../../styles/common.css';

const MotivationSection: React.FC = () => {
  // Example motivational content (replace with actual content)
  const motivationQuote = "Keep going! You're doing great. 💪";

  return (
    <div className="motivation-section">
      <h2>Motivation</h2>
      <p>{motivationQuote}</p>
      {/* Add images or other motivational content */}
    </div>
  );
};

export default MotivationSection;
