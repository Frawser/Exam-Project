import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";
import "../../styles/common.css";

interface WeightEntry {
  weight: number;
  createdAt: string;
}

interface WeightTrackerProps {
  userId: string;
}

const WeightTracker: React.FC<WeightTrackerProps> = ({ userId }) => {
  const [weight, setWeight] = useState<number | "">(0);
  const [error, setError] = useState<string>("");
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);
  const weightChart = useRef<Chart<"line"> | null>(null);
  const [fetchCount, setFetchCount] = useState<number>(0);

  const fetchWeightData = async () => {
    try {
      const response = await axios.get<WeightEntry[]>(
        `http://localhost:5000/api/weight/${userId}`
      );
      setWeightData(response.data);
      setError(""); // Clear error state on successful fetch
      createChart(); // Create or update the chart with the new data
      setFetchCount(fetchCount + 1); // Increment fetch count
    } catch (error) {
      console.error("Error fetching weight data:", error);
      setError("Error fetching weight data");
    }
  };

  useEffect(() => {
    if (userId && fetchCount < 2) {
      fetchWeightData();
    }
  }, [userId, fetchCount]);

  const createChart = () => {
    if (!weightData) return;

    if (weightChart.current) {
      weightChart.current.destroy();
    }
    const ctx = document.getElementById("weightChart") as HTMLCanvasElement;
    if (ctx) {
      weightChart.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: weightData.map((entry) =>
            new Date(entry.createdAt).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Weight (kg)",
              data: weightData.map((entry) => entry.weight),
              fill: false,
              borderColor: "rgb(252, 163, 17)",
              tension: 0.1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          animation: {
            duration: 0, // Disable animation
          },
        },
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
        { userId, weight },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWeight(""); // Reset weight after successful submission
      setError("");
      setFetchCount(fetchCount + 1); // Increment fetch count after submission
    } catch (error) {
      console.error("Error adding weight:", error);
      setError("Error adding weight");
    }
  };

  return (
    <div className="weight-tracker inter-font">
      <h2>Weight Tracker</h2>
      <form onSubmit={handleSubmit} className="weight-tracker_form">
        <label className="weight-tracker_label">
          Weight (kg):
          <input
            type="number"
            className="weight-tracker_input"
            value={weight === "" ? "" : weight}
            onChange={(e) => {
              const value = e.target.value.trim(); // Trim leading/trailing whitespace
              setWeight(value !== "" ? parseInt(value) : ""); // Parse only if not empty
            }}
            required
          />
        </label>
        <button type="submit" className="weight-tracker_submit-btn">Submit</button>
      </form>
      {error && <div className="weight-tracker_error">Error: {error}</div>}
      <div className="weight-tracker_chart-container">
        <canvas id="weightChart" className="weight-tracker_chart" />
      </div>
    </div>
  );
};

export default WeightTracker;
