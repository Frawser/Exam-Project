// WorkoutList.tsx
import React from "react";
import BackWorkouts from "../components/common/BackWorkouts";
import ChestWorkouts from "../components/common/ChestWorkouts";
import LegWorkouts from "../components/common/LegWorkouts";
import ArmWorkouts from "../components/common/ArmWorkouts";

import "../styles/WorkoutList.css";

const WorkoutList: React.FC = () => {
  return (
    <div className="workoutlist-container inter-font">
      <BackWorkouts />
      <ChestWorkouts />
      <LegWorkouts />
      <ArmWorkouts />
    </div>
  );
};

export default WorkoutList;
