import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ProfilePage.css";
import { fetchData } from "../../utils/customHooks/fetchData";
import ProfilePicture from "./832.jpg";

interface User {
  name: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>({ name: "", email: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchData();
      if (userData && userData.user) {
        // console.log(userData.user);
        setCurrentUser(userData.user);
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={ProfilePicture} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>Hii! {currentUser.name}</h2>
          <p>{currentUser.email}</p>
          <button onClick={handleDashboardRedirect}>Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
