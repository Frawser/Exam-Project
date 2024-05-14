import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart, ChartOptions } from "chart.js";
import "../../styles/WieghtTracker.css";

interface WeightEntry {
  weight: number;
  createdAt: string;
}

interface WeightTrackerProps {
  userId: string;
}

const WeightTracker: React.FC<WeightTrackerProps> = ({ userId }) => {
  const [weight, setWeight] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [, setWeightData] = useState<WeightEntry[]>([]);
  const weightChart = useRef<Chart | null>(null);

  const fetchWeightData = async () => {
    try {
      const response = await axios.get<WeightEntry[]>(
        `http://localhost:5000/api/weight/${userId}`
      );
      setWeightData(response.data);
      setError("");
      createChart(response.data);
    } catch (error) {
      console.error("Error fetching weight data:", error);
      setError("Error fetching weight data");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWeightData();
    }
  }, [userId]);

  const createChart = (data: WeightEntry[]) => {
    if (!data) return;

    const ctx = document.getElementById("weightChart") as HTMLCanvasElement;
    if (ctx) {
      if (weightChart.current) {
        weightChart.current.destroy();
      }
      weightChart.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((entry) =>
            new Date(entry.createdAt).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Weight (kg)",
              data: data.map((entry) => entry.weight),
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
        } as ChartOptions,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found");
        return;
      }
      await axios.post(
        "http://localhost:5000/api/weight",
        { userId, weight: parseFloat(weight) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWeight("");
      setError("");
      fetchWeightData();
    } catch (error) {
      console.error("Error adding weight:", error);
      setError("Error adding weight");
    }
  };

  return (
    <div className="weight-tracker inter-font">
      <h2 className="weight-title">Weight Tracker</h2>
      <form onSubmit={handleSubmit} className="weight-tracker_form">
        <label className="weight-tracker_label">
          Weight (kg):
          <input
            type="text"
            pattern="[0-9]*(\.[0-9]+)?"
            className="weight-tracker_input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="weight-tracker_submit-btn">
          Submit
        </button>
      </form>
      {error && <div className="weight-tracker_error">Error: {error}</div>}
      <div className="weight-tracker_chart-container">
        <canvas id="weightChart" className="weight-tracker_chart" />
      </div>
    </div>
  );
};

export default WeightTracker;
