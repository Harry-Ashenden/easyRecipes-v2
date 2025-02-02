import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseClient";
import axios from "axios";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("supabaseToken"); // Get the Supabase JWT token

            if (!token) {
                navigate("/");  // If no token, redirect to login
                return;
            }

            try {
                // Now, we will send the token to the backend in the Authorization header
                const response = await axios.get("http://localhost:3000/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
                    },
                });

                console.log(response.data.user)

                setUserData(response.data.user);  // Assuming your backend sends user data under `user`
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/");  // Redirect to login if an error occurs
            }
        };

        fetchUserData();
    }, [navigate]);

    if (!userData) return <div>Loading...</div>;

    return (
        <div className="max-w-sm mx-auto mt-10 p-5">
            <h2 className="text-2xl mb-4">Profile</h2>
            <p>Username: {userData.user_metadata?.username || "No username set"}</p>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default ProfilePage;
