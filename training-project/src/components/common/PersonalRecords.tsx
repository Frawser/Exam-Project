import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, ChartConfiguration, registerables, Plugin } from 'chart.js';
import '../../styles/common.css';

interface PersonalRecord {
  userId: string;
  exercise: string;
  value: number;
  createdAt: string; // Assuming the date is a string in ISO format
}

interface Props {
  userId: string;
}

const PersonalRecords: React.FC<Props> = ({ userId }) => {
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [newPersonalBest, setNewPersonalBest] = useState<string>('');
  const [error, setError] = useState<string>('');
  const personalBestChart = useRef<Chart<"line"> | null>(null);
  const [fetchCount, setFetchCount] = useState<number>(0);
  const [selectedExerciseData, setSelectedExerciseData] = useState<PersonalRecord[]>([]);

  const fetchPersonalRecords = async () => {
    try {
      const response = await axios.get<PersonalRecord[]>(`http://localhost:5000/api/personal-records/${userId}`);
      setError('');
      setSelectedExerciseData(response.data);
      setFetchCount(fetchCount + 1);
    } catch (error) {
      console.error('Error fetching personal records:', error);
      setError('Error fetching personal records');
    }
  };

  const createChart = () => {
    if (!selectedExerciseData || selectedExerciseData.length === 0) return;

    const personalBests: { [key: string]: number } = {};
    const dates: string[] = [];

    selectedExerciseData.forEach(record => {
      personalBests[record.exercise] = record.value;
      dates.push(record.createdAt); // Use createdAt field for dates
    });

    if (personalBestChart.current) {
      personalBestChart.current.destroy();
    }

    const ctx = document.getElementById('personalBestChart') as HTMLCanvasElement;
    if (ctx) {
      const plugins: Plugin<"line", ChartConfiguration<"line">>[] = registerables.map(plugin => plugin as Plugin<"line", ChartConfiguration<"line">>);
      const chartConfig: ChartConfiguration<'line'> = {
        type: 'line',
        data: {
          labels: dates,
          datasets: Object.keys(personalBests).map(exercise => ({
            label: `${exercise} Personal Best (kg)`,
            data: selectedExerciseData.filter(record => record.exercise === exercise).map(record => record.value),
            fill: false,
            borderColor: 'rgb(252, 163, 17)',
            tension: 0.1,
          })),
        },
        options: {
          maintainAspectRatio: false,
          animation: {
            duration: 0,
          },
          scales: {
            x: {
              type: 'time', // Use 'time' scale for x-axis
              time: {
                unit: 'day', // Display date labels by day
                displayFormats: {
                  day: 'MMM D', // Format: Jan 1
                },
              },
            },
          },
        },
        plugins: plugins,
      };

      personalBestChart.current = new Chart(ctx, chartConfig);
    }
  };

  const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExercise(event.target.value);
    setNewPersonalBest('');
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
          value: parseInt(newPersonalBest), // Convert input to number
        });
        console.log('Personal best updated');
        fetchPersonalRecords();
      } catch (error) {
        console.error('Error updating personal best:', error);
        setError('Error updating personal best');
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
    <div className="personal-records">
      <h2>Personal Records</h2>
      <label>
        Select Exercise:
        <select value={selectedExercise} onChange={handleExerciseChange}>
          <option value="">Select Exercise</option>
          <option value="deadlift">Deadlift</option>
          <option value="benchPress">Bench Press</option>
          <option value="squat">Squat</option>
        </select>
      </label>
      <br />
      {selectedExercise && (
        <div>
          <label>
            New Personal Best:
            <input type="text" value={newPersonalBest} onChange={handleInputChange} />
          </label>
          <button onClick={handleUpdatePersonalBest}>Submit</button>
        </div>
      )}
      {error && <div>Error: {error}</div>}
      <div className="personal-best-chart-container">
        <canvas id="personalBestChart" className="personal-best-chart" />
      </div>
    </div>
  );
};

export default PersonalRecords;
