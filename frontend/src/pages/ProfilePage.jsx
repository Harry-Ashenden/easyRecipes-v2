import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('supabaseToken');
      if (!token) {
        return navigate('/login');
      }

      try {
        const user = await supabase.auth.getUser();
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="max-w-sm mx-auto mt-10 p-5">
      <h2 className="text-2xl mb-4">Profile</h2>
      <p>Username: {userData.user.user_metadata.username}</p>
      <p>Email: {userData.user.email}</p>
    </div>
  );
};

export default ProfilePage;
