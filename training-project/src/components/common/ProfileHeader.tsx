import React, { useState, useEffect } from "react";
import axios from "axios";

// Import avatars
import avatar from "../../assets/usericons/avataaars.png";
import avatar1 from "../../assets/usericons/avataaars (1).png";
import avatar2 from "../../assets/usericons/avataaars (2).png";
import avatar3 from "../../assets/usericons/avataaars (3).png";
import avatar4 from "../../assets/usericons/avataaars (4).png";
import avatar5 from "../../assets/usericons/avataaars (5).png";
import avatar6 from "../../assets/usericons/avataaars (6).png";
import avatar7 from "../../assets/usericons/avataaars (7).png";
import avatar8 from "../../assets/usericons/avataaars (8).png";

interface ProfileHeaderProps {
  user: UserData;
  setUser: (updatedUserData: Partial<UserData>) => void;
}

interface UserData {
  _id: string;
  username: string;
  nickname: string;
  image?: string; // Optional image field
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, setUser }) => {
  const [selectedImage, setSelectedImage] = useState<string>(user.image || "");
  const [newNickname, setNewNickname] = useState<string>(user.nickname);
  const [error, setError] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [nicknameChanged, setNicknameChanged] = useState<boolean>(false);
  const [latestWeight, setLatestWeight] = useState<WeightData | null>(null);

  interface WeightData {
    _id: string;
    userId: string;
    weight: number;
    createdAt: string;
  }

  useEffect(() => {
    fetchLatestWeight();
  }, []);

  const handleImageChange = async (selectedImage: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.put(
          `http://localhost:5000/api/auth/image`,
          { userId: user._id, image: selectedImage },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedUser = response.data.user;
        setUser(updatedUser);
        setError("");
        setSelectedImage(updatedUser.image || "");
        console.log("Profile picture updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setError("Error updating profile picture");
    }
  };

  const fetchLatestWeight = async () => {
    try {
      const response = await axios.get<WeightData>(
        `http://localhost:5000/api/weight/latest/${user._id}`
      );
      setLatestWeight(response.data);
      console.log("Latest Weight:", response.data);
    } catch (error) {
      console.error("Error fetching latest weight:", error);
    }
  };

  const handleNicknameChange = async () => {
    try {
      if (!nicknameChanged || newNickname === user.nickname) {
        setEditMode(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.put(
          `http://localhost:5000/api/auth/nickname`,
          { userId: user._id, nickname: newNickname },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedUser = response.data.user;
        setUser(updatedUser);
        setNewNickname("");
        setNicknameChanged(false);
        setError("");
        console.log("Nickname updated successfully");
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating nickname:", error);
      setError("Error updating nickname");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const avatars = [
    avatar,
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
  ];

  return (
    <div className="profile-header inter-font">
      <div className="profile-info">
        <div className="profile-info-row">
          <div className="profile-image-container">
            <img
              className="profile-image"
              src={selectedImage ? selectedImage : avatar}
              alt="Profile"
            />
            {editMode && (
              <div className="preloaded-images">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index}`}
                    className="preloaded-image"
                    onClick={() => handleImageChange(avatar)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="profile-info-column">
            <h1 className="username">@{user.username}</h1>
            {editMode ? (
              <input
                className="edit-nickname"
                type="text"
                placeholder="New Nickname"
                value={newNickname}
                onChange={(e) => {
                  setNewNickname(e.target.value);
                  setNicknameChanged(true);
                }}
              />
            ) : (
              <p className="nickname">{user.nickname}</p>
            )}
            <div className="weight-info">
            {latestWeight ? (
              <p>{latestWeight.weight} kg</p>
            ) : (
              <p>No weight data available</p>
            )}
          </div>
          </div>
          
        </div>
      </div>
      <div className="edit-mode">
        {editMode ? (
          <>
            <button className="save-button" onClick={handleNicknameChange}>
              Save
            </button>
            <button className="cancel-button" onClick={toggleEditMode}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={toggleEditMode}>
            Edit
          </button>
        )}
      </div>
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};

export default ProfileHeader;
