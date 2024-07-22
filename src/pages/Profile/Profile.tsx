import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ProfilePage.css";
import { fetchData } from "../../utils/customHooks/fetchData";
import ProfilePicture from "./832.jpg";
import GridPattern from "../../components/landing/GridPattern";
import { cn } from "../../lib/utils";
import CommonButton from "../../components/common/CommonButton";
import { Box, Typography, TextField, } from '@mui/material';
import { styled } from '@mui/system';
import useUpdateProfile from "../../utils/customHooks/useUpdateProfile";

interface User {
  name: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>({ name: "", email: "" });
  const [newName, setNewName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { updateName, error } = useUpdateProfile();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchData();
      if (userData && userData.user) {
        setCurrentUser(userData.user);
        setNewName(userData.user.name);
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  const handleNameUpdate = async () => {
    try {
      await updateName(newName);
      setCurrentUser((prevUser) => ({ ...prevUser, name: newName }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update name:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const ProfileBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    fontFamily: 'Inter, sans-serif',
  }));

  const ProfileImage = styled('img')({
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    marginBottom: '20px',
  });

  return (
    <div className="profile-container">
      <GridPattern
        width={40}
        height={40}
        x={0}
        y={0}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          "absolute inset-0 z-0",
          "animate-pulse"
        )}
      />
      <ProfileBox>
        <ProfileImage src={ProfilePicture} alt="Profile" />
        <Typography variant="h5" sx={{
          flexGrow: 1,
          textAlign: 'center',
          fontFamily: "Playwrite DK Uloopet",
          fontWeight: 'bold',
          mt: 8,
        }}>
          Hi, {currentUser.name}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Inter, sans-serif', fontSize: '20px' }}>
          {currentUser.email}
        </Typography>
        
        {isEditing ? (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Update Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              fullWidth
              autoFocus
            />
            <CommonButton  onClick={handleNameUpdate} >
              Save Name
            </CommonButton>
          </Box>
        ) : (
          <CommonButton variant="contained" onClick={handleEditClick} >
            Edit Name
          </CommonButton>
        )}

        <CommonButton variant="contained" onClick={handleDashboardRedirect}>
          Go to Dashboard
        </CommonButton>

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </ProfileBox>
    </div>
  );
};

export default ProfilePage;
