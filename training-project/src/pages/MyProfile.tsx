import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import ProfileHeader from "../components/common/ProfileHeader";
import UserStats from "../components/common/UserStats";
import LogoutButton from "../components/common/LogoutButton";

interface UserData {
  _id: string;
  username: string;
  nickname: string;
  bio: string;
  image?: string;
}

const MyProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
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

          const { userId } = response.data;

          const userResponse = await axios.get<UserData>(
            `http://localhost:5000/api/auth/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(userResponse.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = (updatedUserData: Partial<UserData>) => {
    setUserData((prevUserData: UserData | null) => ({
      ...prevUserData!,
      ...updatedUserData,
    }));
  };

  return (
    <div className="profile-container">
      {userData && (
        <>
          <ProfileHeader user={userData} setUser={updateUser} />
          <UserStats userId={userData._id} />
          <LogoutButton />
        </>
      )}
    </div>
  );
};

export default MyProfile;
