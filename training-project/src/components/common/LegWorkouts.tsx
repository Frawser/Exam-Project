import React, { useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/ListWorkouts.css";

const LegWorkouts: React.FC = () => {
  const legWorkouts: { [key: string]: string[] } = {
    Quadriceps: [
      "Squats",
      "Leg Press",
      "Leg Extensions",
      "Sumo Squats",
      "Hack Squats",
      "Smith Machine Squats",
      "Front Squats",
      "Barbell Lunges",
      "Split Squats",
      "Pistol Squats",
      "Curtsy Lunges",
    ],
    Hamstrings: [
      "Deadlifts",
      "Romanian Deadlifts",
      "Step-Ups",
      "Hamstring Curls",
      "Stiff-Leg Deadlifts",
    ],
    Calves: ["Calf Raises", "Leg Press Calf Raises", "Seated Calf Raises"],
    Glutes: [
      "Glute Bridges",
      "Walking Lunges",
      "Single Leg Deadlifts",
      "Hip Thrusts",
    ],
    Plyometrics: ["Box Jumps", "Kettlebell Swings"],
    Other: [
      "Lunges",
      "Reverse Lunges",
      "Dumbbell Step-Ups",
      "Seated Leg Curls",
    ],
  };

  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("Quadriceps");
  const navigate = useNavigate();

  const handleToggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  const handleExerciseSelect = (exercise: string) => {
    localStorage.setItem("selectedExercise", exercise);
    navigate(`/logworkout/${exercise}`);
  };

  return (
    <div className="list-workouts">
      <div className="toggle-button-container">
        <h2 onClick={handleToggleCategories}>Leg Workouts</h2>
        <div>
          <button className="toggle-button" onClick={handleToggleCategories}>
            {showCategories ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
          </button>
        </div>
      </div>
      {showCategories && (
        <div className="categories">
          <h3>Categories</h3>
          {Object.keys(legWorkouts).map((category) => (
            <button
              key={category}
              className={currentCategory === category ? "active" : ""}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      {showCategories && (
        <div className="workouts">
          <h3>{currentCategory}</h3>
          <ul>
            {legWorkouts[currentCategory].map((workout, index) => (
              <li key={index} onClick={() => handleExerciseSelect(workout)}>
                {workout}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LegWorkouts;
