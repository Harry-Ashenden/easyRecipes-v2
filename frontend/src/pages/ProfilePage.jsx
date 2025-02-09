import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateProfilePicture } from "../services/api"; 
import { getCurrentUser, logoutUser } from "../hooks/useAuth"; 

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [file, setFile] = useState(null); // For storing the file when updating the profile picture
    const navigate = useNavigate();

    // Fetch user data & check authentication on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const supabaseUser = await getCurrentUser(); 
                if (!supabaseUser) {
                    console.error("No Supabase user found. Redirecting to login.");
                    navigate("/"); // Redirect to login if not authenticated
                    return;
                }

                const data = await getUserData(); 
                setUserData(data.user);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
                navigate("/"); // Redirect to login if fetching fails
            }
        };

        fetchUserData();
    }, [navigate]);

    // Handle profile picture upload
    const handleProfilePictureChange = async () => {
        if (!file) {
            console.error("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await updateProfilePicture(formData);
            const updatedUser = await getUserData();
            setUserData(updatedUser.user);
        } catch (error) {
            console.error("Error updating profile picture:", error.message);
        }
    };

    if (!userData) return <div>Loading...</div>;

    const handleLogout = async () => {
        await logoutUser();
        navigate("/"); 
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <p>Username: {userData.username}</p>
            <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
            
            <div>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={handleProfilePictureChange}>Upload Profile Picture</button>
            </div>
            
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfilePage;
