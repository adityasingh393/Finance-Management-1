import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ProfilePage.css";
import ProfilePicture from './832.jpg';
interface ProfilePageProps {
  user: {
    name: string;
    email: string;
    profilePicture: string ;
  };
}
const image = ProfilePicture;
const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    const navigate=useNavigate();
  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={image} alt="Profile" className="profile-picture" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={handleDashboardRedirect}>Go to Dashboard</button>
      </div>
    </div>
  );
};

export default ProfilePage;
