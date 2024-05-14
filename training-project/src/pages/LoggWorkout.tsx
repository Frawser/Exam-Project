import { useEffect, useState } from "react";
import axios from "axios";
import Logger from "../components/common/Logger";
import PreviousLog from "../components/common/PreviousLog";

const LoggWorkout = () => {
  const [userId, setUserId] = useState<string>("");
  const [exerciseId, setExerciseId] = useState<string>("");
  const [updatePreviousLogs, setUpdatePreviousLogs] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserId(response.data.userId);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const handleUpdatePreviousLogs = () => {
    setUpdatePreviousLogs((prev) => !prev);
  };

  return (
    <div className="log-workout-container">
      <Logger
        userId={userId}
        setExerciseId={setExerciseId}
        updatePreviousLogs={handleUpdatePreviousLogs}
      />{" "}
      {userId && (
        <PreviousLog
          userId={userId}
          exerciseId={exerciseId}
          key={updatePreviousLogs ? "update" : "no-update"}
        />
      )}{" "}
  
    </div>
  );
};

export default LoggWorkout;
