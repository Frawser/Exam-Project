import React, { useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/ListWorkouts.css";

const BackWorkouts: React.FC = () => {
  const backWorkouts: { [key: string]: string[] } = {
    Lats: [
      "Pull-Ups",
      "Lat Pulldowns",
      "Chin-Ups",
      "Wide Grip Pull-Ups",
      "Close Grip Pull-Ups",
      "Assisted Pull-Ups",
      "One-Arm Lat Pulldowns",
      "Inverted Rows",
      "Lat Pulldowns Behind the Neck",
    ],
    MiddleBack: [
      "Bent Over Rows",
      "T-Bar Rows",
      "Seated Cable Rows",
      "Single-Arm Dumbbell Rows",
      "Chest Supported T-Bar Rows",
      "Machine Rows",
      "Barbell Rows (Overhand Grip, Underhand Grip)",
      "Dumbbell Rows (Overhand Grip, Underhand Grip)",
    ],
    Traps: ["Barbell Shrugs", "Face Pulls"],
    RearDelts: [
      "Reverse Flyes",
      "Pullovers",
      "Cable Pullovers",
      "Machine Rear Delt Flyes",
    ],
    LowBack: [
      "Deadlift",
      "Good Mornings",
      "Hyperextensions",
      "Deadlift Variations (Sumo, Romanian, Stiff-legged)",
      "Trap Bar Deadlifts",
      "Lawnmower Rows",
    ],
  };

  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("Lats");
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
        <h2 onClick={handleToggleCategories}>Back Workouts</h2>
        <div>
          <button className="toggle-button" onClick={handleToggleCategories}>
            {showCategories ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
          </button>
        </div>
      </div>
      {showCategories && (
        <div className="categories">
          <h3>Categories</h3>
          {Object.keys(backWorkouts).map((category) => (
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
            {backWorkouts[currentCategory].map((workout, index) => (
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

export default BackWorkouts;
