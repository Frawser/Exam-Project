import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/UserStats.css";

interface ExerciseRecord {
  _id: string;
  userId: string;
  exercise: string;
  value: number;
  createdAt: string;
}

interface UserStatsProps {
  userId: string;
}

const UserStats: React.FC<UserStatsProps> = ({ userId }) => {
  const [latestRecords, setLatestRecords] = useState<Record<string, ExerciseRecord> | null>(null);
  const [firstRecords, setFirstRecords] = useState<Record<string, ExerciseRecord> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const [latestDeadlift, latestBenchpress, latestSquat, firstDeadlift, firstBenchpress, firstSquat] = await Promise.all([
          axios.get<ExerciseRecord>(`http://localhost:5000/api/personal-records/latest/deadlift/${userId}`),
          axios.get<ExerciseRecord>(`http://localhost:5000/api/personal-records/latest/benchpress/${userId}`),
          axios.get<ExerciseRecord>(`http://localhost:5000/api/personal-records/latest/squat/${userId}`),
          axios.get<ExerciseRecord>(`http://localhost:5000/api/personal-records/first/deadlift/${userId}`),
          axios.get<ExerciseRecord>(`http://localhost:5000/api/personal-records/first/benchpress/${userId}`),
          axios.get<ExerciseRecord>(`http://localhost:5000/api/personal-records/first/squat/${userId}`),
        ]);

        setLatestRecords({
          deadlift: latestDeadlift.data,
          benchPress: latestBenchpress.data, // Corrected typo here
          squat: latestSquat.data,
        });

        setFirstRecords({
          deadlift: firstDeadlift.data,
          benchPress: firstBenchpress.data, // Corrected typo here
          squat: firstSquat.data,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, [userId]);

  const compareRecords = (current: number, old: number): string => {
    if (!firstRecords || old === 0) return "N/A";
    const percentageChange = ((current - old) / old) * 100;
    const formattedChange = percentageChange.toFixed(2);

    if (percentageChange > 0) {
      return `${formattedChange}% +`;
    } else if (percentageChange < 0) {
      return `${Math.abs(Number(formattedChange))}% -`;
    } else {
      return "No change";
    }
  };

  return (
    <div className="user-stats inter-font">
      <h2 className="title-stats">User Stats</h2>
      {loading ? (
        <div>Loading...</div>
      ) : latestRecords ? (
        <div className="stats-container">
          <div className="latest-records">
            <h3>Latest Records:</h3>
            <ul className="ul-container-1">
              <li className="li-stats">
                <span className="record-label">Deadlift:</span>{" "}
                {latestRecords.deadlift?.value !== undefined ? `${latestRecords.deadlift.value} kg` : "N/A"}
              </li>
              <li className="li-stats">
                <span className="record-label">Benchpress:</span>{" "}
                {latestRecords.benchPress?.value !== undefined ? `${latestRecords.benchPress.value} kg` : "N/A"}
              </li>
              <li className="li-stats">
                <span className="record-label">Squat:</span>{" "}
                {latestRecords.squat?.value !== undefined ? `${latestRecords.squat.value} kg` : "N/A"}
              </li>
            </ul>
          </div>
          <div className="comparison">
            <h3>Comparison with First Logs:</h3>
            <ul className="ul-container">
              <li className="li-stats">
                <span className="record-label">Deadlift:</span>{" "}
                <span
                  className={
                    firstRecords
                      ? compareRecords(
                          latestRecords.deadlift?.value || 0,
                          firstRecords.deadlift?.value || 0
                        ).includes("+")
                        ? "increase"
                        : "no-change"
                      : "no-change"
                  }
                >
                  {firstRecords
                    ? compareRecords(
                        latestRecords.deadlift?.value || 0,
                        firstRecords.deadlift?.value || 0
                      )
                    : "N/A"}
                </span>
              </li>
              <li className="li-stats">
                <span className="record-label">Benchpress:</span>{" "}
                <span
                  className={
                    firstRecords
                      ? compareRecords(
                          latestRecords.benchPress?.value || 0,
                          firstRecords.benchPress?.value || 0
                        ).includes("+")
                        ? "increase"
                        : "no-change"
                      : "no-change"
                  }
                >
                  {firstRecords
                    ? compareRecords(
                        latestRecords.benchPress?.value || 0,
                        firstRecords.benchPress?.value || 0
                      )
                    : "N/A"}
                </span>
              </li>
              <li className="li-stats">
                <span className="record-label">Squat:</span>{" "}
                <span
                  className={
                    firstRecords
                      ? compareRecords(
                          latestRecords.squat?.value || 0,
                          firstRecords.squat?.value || 0
                        ).includes("+")
                        ? "increase"
                        : "no-change"
                      : "no-change"
                  }
                >
                  {firstRecords
                    ? compareRecords(
                        latestRecords.squat?.value || 0,
                        firstRecords.squat?.value || 0
                      )
                    : "N/A"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default UserStats;
