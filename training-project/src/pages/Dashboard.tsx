import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainingProgress from '../components/common/TrainingProgress';
import PersonalRecords from '../components/common/PersonalRecords';
import WieghtTracker from '../components/common/WieghtTracker';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserId(response.data.userId);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <div className="dashboard-container">
      <TrainingProgress userId={userId} />

      <WieghtTracker userId={userId}/>

      <PersonalRecords userId={userId}/>
    </div>
  );
};

export default Dashboard;
