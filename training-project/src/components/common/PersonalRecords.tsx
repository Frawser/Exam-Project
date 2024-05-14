import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js/auto";
import "chartjs-adapter-date-fns";
import "../../styles/PersonalRecords.css";

Chart.register(...registerables);

interface PersonalRecord {
  userId: string;
  exercise: string;
  value: number;
  createdAt: string;
}

interface Props {
  userId: string;
}

const PersonalRecords: React.FC<Props> = ({ userId }) => {
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [newPersonalBest, setNewPersonalBest] = useState<string>("");
  const [error, setError] = useState<string>("");
  const personalBestChart = useRef<Chart<"line"> | null>(null);
  const [fetchCount, setFetchCount] = useState<number>(0);
  const [selectedExerciseData, setSelectedExerciseData] = useState<
    PersonalRecord[]
  >([]);

  const fetchPersonalRecords = async () => {
    try {
      const response = await axios.get<PersonalRecord[]>(
        `http://localhost:5000/api/personal-records/user/${userId}`
      );
      setError("");
      setSelectedExerciseData(response.data);
      setFetchCount(fetchCount + 1);
    } catch (error) {
      console.error("Error fetching personal records:", error);
      setError("Error fetching personal records");
    }
  };

  const createChart = () => {
    if (!selectedExerciseData || selectedExerciseData.length === 0) return;

    const personalBests: { [key: string]: number } = {};
    const dates: string[] = [];
    const filteredData = selectedExerciseData.filter(
      (record) => record.exercise === selectedExercise
    );

    filteredData.forEach((record) => {
      personalBests[record.exercise] = record.value;
      dates.push(record.createdAt);
    });

    if (personalBestChart.current) {
      personalBestChart.current.destroy();
    }

    const ctx = document.getElementById(
      "personalBestChart"
    ) as HTMLCanvasElement;
    if (ctx) {
      personalBestChart.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: `${selectedExercise} Personal Best (kg)`,
              data: filteredData.map((record) => record.value),
              fill: false,
              borderColor: "rgb(252, 163, 17)",
              tension: 0.1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          animation: {
            duration: 0,
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
                displayFormats: {
                  day: "MMM d",
                },
              },
              position: "bottom",
            },
          },
        },
      });
    }
  };

  const handleExerciseChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedExercise(event.target.value);
    setNewPersonalBest("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPersonalBest(event.target.value);
  };

  const handleUpdatePersonalBest = async () => {
    if (selectedExercise && newPersonalBest) {
      try {
        await axios.post(`http://localhost:5000/api/personal-records`, {
          userId: userId,
          exercise: selectedExercise,
          value: parseInt(newPersonalBest),
        });
        console.log("Personal best updated");
        fetchPersonalRecords();
      } catch (error) {
        console.error("Error updating personal best:", error);
        setError("Error updating personal best");
      }
    }
  };

  useEffect(() => {
    if (userId && fetchCount < 2) {
      fetchPersonalRecords();
    } else {
      createChart();
    }
  }, [userId, fetchCount, selectedExercise]);

  return (
    <div className="personal-records inter-font">
      <h2 className="title-PB border-tp-pb">Personal Records</h2>
      <div className="select-container-PB">
        <label>
          Select Exercise:
          <select
            className="select-PB"
            value={selectedExercise}
            onChange={handleExerciseChange}
          >
            <option value="">Select Exercise</option>
            <option value="deadlift">Deadlift</option>
            <option value="benchPress">Bench Press</option>
            <option value="squat">Squat</option>
          </select>
        </label>
      </div>
      {selectedExercise && (
        <div className="form-container-PB">
          <label>
            New Personal Best:
            <input
              type="text"
              className="input-PB"
              value={newPersonalBest}
              onChange={handleInputChange}
            />
          </label>
          <button className="button-PB" onClick={handleUpdatePersonalBest}>
            Submit
          </button>
        </div>
      )}
      {error && <div className="error-PB">Error: {error}</div>}
      <div className="chart-container-PB">
        <canvas id="personalBestChart" className="chart-PB" />
      </div>
    </div>
  );
};

export default PersonalRecords;
