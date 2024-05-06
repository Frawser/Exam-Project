import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/common.css';

interface TrainingProgressProps {
  userId: string; // Assuming you have a userId for the logged-in user
}

const TrainingProgress: React.FC<TrainingProgressProps> = ({ userId }) => {
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [goalAchieved, setGoalAchieved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sessions/${userId}`);
        const sessions = response.data;
        setCompletedSessions(sessions.length);
        setTotalSessions(sessions.length);
        setGoalAchieved(sessions.length >= 10);
        setLoading(false);
      } catch (error) {
        setError('Error fetching sessions');
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  const handleAddSession = async () => {
    try {
      await axios.post('http://localhost:5000/api/sessions', { userId });
      setCompletedSessions((prevCount) => prevCount + 1);
      setTotalSessions((prevCount) => prevCount + 1);
      setGoalAchieved((prevGoal) => prevGoal || completedSessions + 1 >= 10);
    } catch (error) {
      setError('Error adding session');
    }
  };

  const handleRemoveSession = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/sessions/${userId}`);
      setCompletedSessions((prevCount) => Math.max(prevCount - 1, 0));
      setTotalSessions((prevCount) => Math.max(prevCount - 1, 0));
      setGoalAchieved((prevGoal) => prevGoal && completedSessions - 1 >= 10);
    } catch (error) {
      setError('Error removing session');
    }
  };

  return (
    <div className="training-progress">
      <h2>Training Progress</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>
            Completed sessions: {completedSessions} / {totalSessions}
          </p>
          <p>Goal achieved: {goalAchieved ? 'Yes' : 'No'}</p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${(completedSessions / totalSessions) * 100}%` }}>
              {((completedSessions / totalSessions) * 100).toFixed(2)}%
            </div>
          </div>
          <div>
            <button onClick={handleAddSession}>Add Session</button>
            <button onClick={handleRemoveSession} disabled={completedSessions === 0}>
              Remove Session
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TrainingProgress;
