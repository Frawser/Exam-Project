// PreviousLog.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/PreviousLog.css";

interface PreviousLogProps {
  userId: string;
  exerciseId: string;
}

interface LoggedWorkout {
  _id: string;
  exercise: string;
  sets: { reps: number; weight: number }[];
  createdAt: Date;
}

const PreviousLog: React.FC<PreviousLogProps> = ({ userId, exerciseId }) => {
  const [previousLogs, setPreviousLogs] = useState<LoggedWorkout[] | null>(
    null
  );

  useEffect(() => {
    const fetchPreviousLogs = async () => {
      try {
        if (!exerciseId) {
          console.error("ExerciseId is missing.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/logger/logs",
          {
            params: { userId, exerciseId },
          }
        );

        if (Array.isArray(response.data)) {
          setPreviousLogs(response.data);
        } else {
          console.error("Invalid response data:", response.data);
          setPreviousLogs([]);
        }
      } catch (error) {
        console.error("Error fetching previous logs:", error);
      }
    };

    fetchPreviousLogs();
  }, [userId, exerciseId]);

  if (previousLogs === null) {
    return <div className="previous-log loading">Loading...</div>;
  }

  return (
    <div className="previous-log inter-font">
      <h3 className="previous-log-title">Previous Logs</h3>
      {previousLogs.length === 0 ? (
        <p className="no-logs-text">Submit your first log!</p>
      ) : (
        <ul>
          {previousLogs.map((log) => (
            <li key={log._id}>
              <p>Date: {new Date(log.createdAt).toLocaleDateString()}</p>
              <p>Sets:</p>
              <ul className="sets-list">
                {log.sets.map((set, index) => (
                  <li key={index}>
                    <span className="set-info">
                      Set {index + 1}: {set.reps} reps @ {set.weight} kg
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PreviousLog;
