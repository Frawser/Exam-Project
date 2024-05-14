import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/LogWorkout.css";

interface LoggerProps {
  userId: string;
  setExerciseId: React.Dispatch<React.SetStateAction<string>>;
  updatePreviousLogs: () => void;
}

const Logger: React.FC<LoggerProps> = ({
  userId,
  setExerciseId,
  updatePreviousLogs,
}) => {
  const [sets, setSets] = useState<number>(1);
  const [reps, setReps] = useState<string[]>(new Array(1).fill(""));
  const [weights, setWeights] = useState<string[]>(new Array(1).fill(""));
  const navigate = useNavigate();

  useEffect(() => {
    const selectedExercise = localStorage.getItem("selectedExercise");
    if (selectedExercise) {
      setExerciseId(selectedExercise);
    }
  }, [setExerciseId]);

  const handleLogWorkout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const logs = [];
      for (let i = 0; i < sets; i++) {
        logs.push({
          reps: parseInt(reps[i]),
          weight: parseFloat(weights[i]),
        });
      }

      const workoutData = {
        userId,
        exerciseId: localStorage.getItem("selectedExercise") || "",
        sets: logs,
      };

      const response = await axios.post(
        "http://localhost:5000/api/logger/log",
        workoutData
      );
      console.log("Logged workout:", response.data);
      console.log("Workout data:", workoutData);

      // Reset form fields
      setSets(1);
      setReps(new Array(1).fill(""));
      setWeights(new Array(1).fill(""));

      updatePreviousLogs();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error logging workout:", (error as AxiosError).message);
      } else {
        console.error("Error logging workout:", error);
      }
    }
  };

  const handleSetChange = (
    index: number,
    value: string,
    type: "reps" | "weight"
  ) => {
    const updatedValues = [...(type === "reps" ? reps : weights)];
    updatedValues[index] = value;
    type === "reps" ? setReps(updatedValues) : setWeights(updatedValues);
  };

  const goToWorkoutList = () => {
    setExerciseId("");
    navigate("/workoutlist");
  };

  return (
    <div className="logger inter-font">
      <h2 className="log-title">Log Your Workout</h2>
      <form onSubmit={handleLogWorkout}>
        <label className="exercise-label">
          Exercise:
          <input
            type="text"
            value={localStorage.getItem("selectedExercise") || ""}
            readOnly
            placeholder="Select an Exercise"
            className="exercise-input"
          />
        </label>
        <br />
        <button type="button" onClick={goToWorkoutList}>
          Select from List
        </button>
        <br />
        <label className="logger-label">
          Sets:
          <input
            type="number"
            value={sets}
            min={1}
            onChange={(e) => setSets(parseInt(e.target.value))}
          />
        </label>
        <br />
        {Array.from({ length: sets }).map((_, index) => (
          <div key={index}>
            <label className="logger-label-sets">
              Set {index + 1}:
              <input
                type="number"
                value={reps[index]}
                placeholder="Reps"
                onChange={(e) => handleSetChange(index, e.target.value, "reps")}
              />
              x Reps with
              <input
                type="number"
                value={weights[index]}
                placeholder="Weight (kg)"
                step="any"
                onChange={(e) =>
                  handleSetChange(index, e.target.value, "weight")
                }
              />
              kg
            </label>
            <br />
          </div>
        ))}
        <br />
        <button type="submit">Log Workout</button>
      </form>
    </div>
  );
};

export default Logger;
