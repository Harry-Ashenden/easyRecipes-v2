import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserData, updateProfilePicture } from "../services/api"; 
import { getCurrentUser, logoutUser } from "../hooks/useAuth"; 

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const supabaseUser = await getCurrentUser(); 
                if (!supabaseUser) return navigate("/");
                const data = await getUserData(); 
                setUserData(data.user);
            } catch (error) {
                console.error("Error fetching user data:", error.message);
                navigate("/");
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleProfilePictureChange = async () => {
        if (!file) return;
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

    const handleLogout = async () => {
        await logoutUser();
        navigate("/"); 
    };

    if (!userData) return <div className="text-center mt-10"><span className="loading loading-dots loading-lg"></span></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Profile Card */}
            <div className="max-w-xl mx-auto bg-base-100 shadow-lg rounded-box p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="avatar mb-4">
                        <div className="w-24 rounded-full">
                            <img src={userData.profilePicture} alt="Profile" />
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{userData.username}</h2>
                    
                    {/* Upload */}
                    <div className="flex flex-col items-center gap-2 w-full sm:flex-row sm:justify-center sm:gap-4 mt-4">
                        <input 
                            type="file" 
                            className="file-input file-input-bordered w-full sm:max-w-xs" 
                            onChange={(e) => setFile(e.target.files[0])} 
                        />
                        <button className="btn btn-primary" onClick={handleProfilePictureChange}>
                            Update Picture
                        </button>
                    </div>

                    {/* Logout Button */}
                    <button className="btn btn-error mt-6" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Links to Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
                <Link to="/shopping-list" className="card bg-base-100 shadow-md hover:shadow-lg transition p-4 text-center hover:bg-primary hover:text-white">
                    <h3 className="font-bold text-lg">🛒 Shopping List</h3>
                    <p className="text-sm mt-2">View your ingredients list</p>
                </Link>

                <Link to="/meal-plan" className="card bg-base-100 shadow-md hover:shadow-lg transition p-4 text-center hover:bg-primary hover:text-white">
                    <h3 className="font-bold text-lg">📅 Meal Plan</h3>
                    <p className="text-sm mt-2">See your weekly plan</p>
                </Link>

                <Link to="/favourites" className="card bg-base-100 shadow-md hover:shadow-lg transition p-4 text-center hover:bg-primary hover:text-white">
                    <h3 className="font-bold text-lg">❤️ Favourites</h3>
                    <p className="text-sm mt-2">Your saved recipes</p>
                </Link>
            </div>
        </div>
    );
};

export default ProfilePage;
