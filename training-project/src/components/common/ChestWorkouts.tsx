import React, { useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/ListWorkouts.css";

const ChestWorkouts: React.FC = () => {
  const chestWorkouts: { [key: string]: string[] } = {
    UpperChest: [
      "Incline Dumbbell Fly",
      "Incline Bench Press",
      "Incline Dumbbell Press",
      "Incline Cable Flyes",
      "Smith Machine Incline Press",
    ],
    MidChest: [
      "Bench Press",
      "Dumbbell Bench Press",
      "Chest Press Machine",
      "Cable Flyes",
      "Pec Deck Machine",
      "Chest Press with Resistance Bands",
      "Machine Chest Press",
      "Floor Press",
    ],
    LowerChest: [
      "Decline Bench Press",
      "Dumbbell Pullover",
      "Decline Push-Ups",
      "Low Cable Crossover",
      "Chest Squeeze Press",
    ],
    Bodyweight: [
      "Push-Ups",
      "Chest Dips",
      "Diamond Push-Ups",
      "Wide Grip Push-Ups",
      "Medicine Ball Push-Ups",
      "Plyometric Push-Ups",
      "Push-Up Variations (Clap, Spiderman, etc.)",
    ],
    Alternative: [
      "One-Arm Dumbbell Bench Press",
      "Resistance Band Chest Press",
      "Chest Cable Pullover",
      "Dumbbell Squeeze Press",
    ],
  };

  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("UpperChest");
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
        <h2 onClick={handleToggleCategories}>Chest Workouts</h2>
        <div>
          <button className="toggle-button" onClick={handleToggleCategories}>
            {showCategories ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
          </button>
        </div>
      </div>
      {showCategories && (
        <div className="categories">
          <h3>Categories</h3>
          {Object.keys(chestWorkouts).map((category) => (
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
            {chestWorkouts[currentCategory].map((workout, index) => (
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

export default ChestWorkouts;
