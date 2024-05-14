import React, { useState } from "react";
import "../../styles/ListWorkouts.css";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ArmWorkouts: React.FC = () => {
  const armWorkouts: { [key: string]: string[] } = {
    Biceps: [
      "Bicep Curls",
      "Hammer Curls",
      "Preacher Curls",
      "Reverse Curls",
      "Concentration Curls",
      "Barbell Curls",
      "Cable Curls",
      "EZ Bar Preacher Curls",
    ],
    Triceps: [
      "Tricep Dips",
      "Tricep Extensions",
      "Skull Crushers",
      "Close Grip Bench Press",
      "Dumbbell Overhead Tricep Extension",
      "Rope Tricep Pushdowns",
      "Tricep Kickbacks",
    ],
    Shoulders: [
      "Shoulder Press",
      "Arnold Press",
      "Dumbbell Shoulder Press",
      "Arnold Dumbbell Press",
      "Machine Shoulder Press",
      "Behind-the-Neck Press",
    ],
  };

  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("Biceps");
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
    <div className="list-workouts armworkout">
      <div className="toggle-button-container">
        <h2 onClick={handleToggleCategories}>Arm Workouts</h2>
        <div>
          <button className="toggle-button" onClick={handleToggleCategories}>
            {showCategories ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
          </button>
        </div>
      </div>
      {showCategories && (
        <div className="categories">
          <h3>Categories</h3>
          {Object.keys(armWorkouts).map((category) => (
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
            {armWorkouts[currentCategory].map((workout, index) => (
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

export default ArmWorkouts;
