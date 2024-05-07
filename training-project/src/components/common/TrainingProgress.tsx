import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

interface TrainingProgressProps {
  userId: string;
}

const TrainingProgress: React.FC<TrainingProgressProps> = ({ userId }) => {
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sessions/${userId}`);
        const sessions = response.data;
        setTotalSessions(sessions.length);
      } catch (error) {
        setError('Error fetching sessions');
      }
    };

    if (userId) {
      fetchSessions();
    }
  }, [userId]);

  const handleAddSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle token not found
        return;
      }

      await axios.post(
        'http://localhost:5000/api/sessions',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Increment total sessions after successful addition
      setTotalSessions((prevCount) => prevCount + 1);
    } catch (error) {
      // Handle error
      console.error('Error adding session:', error);
      setError('Error adding session');
    }
  };

  const handleRemoveSession = async () => {
    try {
      // You can implement logic to remove a session here
      if (totalSessions > 0) {
        setTotalSessions((prevCount) => prevCount - 1);
      }
    } catch (error) {
      setError('Error removing session');
    }
  };

  return (
    <div className="training-progress-container inter-font">
      <h2>Training Progress</h2>
      <div>Total Sessions: {totalSessions}</div>
      <div className="button-container-progress">
        <button onClick={handleRemoveSession} className='icon-button'><FaMinusCircle /></button>
        <button onClick={handleAddSession} className='icon-button'><FaPlusCircle /></button>
      </div>
      {error && <div className="error-message">Error: {error}</div>}
    </div>
  );
};

export default TrainingProgress;
