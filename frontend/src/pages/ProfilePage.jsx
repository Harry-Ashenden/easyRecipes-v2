import { useState, useEffect } from "react";
import { getUserData, updateProfilePicture } from "../services/api"; // Import API service functions
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [file, setFile] = useState(null); // For storing the file when updating the profile picture
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {

    const fetchUserData = async () => {
      try {
        let data = await getUserData(); // Call the getUserData function
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        navigate("/"); // Redirect to login if user data fetch fails
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle profile picture upload
  const handleProfilePictureChange = async (event) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await updateProfilePicture(formData);
    
        const updatedUser = await getUserData();
        setUserData(updatedUser.user);
    } catch (error) {
      console.error("Error updating profile picture:", error.message);
    }
  };

  if (!userData) return <div>Loading... </div>;

  const handleLogout = () => {
    localStorage.removeItem("supabaseToken");
    sessionStorage.removeItem("supabaseToken");
    navigate("/"); // Redirect to login page
  };
  
  

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Username: {userData.username}</p>
      <img
        src={userData.profilePicture}
        alt="Profile"
        className="profile-picture"
      />
      
      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])} // Set the file for upload
        />
        <button onClick={handleProfilePictureChange}>Upload Profile Picture</button>
      </div>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
