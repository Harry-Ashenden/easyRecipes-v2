import axiosInstance from "./axiosInstance"; // Import Axios instance


// Get user data
export const getUserData = async () => {
  try {
    const response = await axiosInstance.get("/users/me"); 
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Get user profile picture
export const getUserProfilePicture = async () => {
  try {
    const response = await axiosInstance.get("/users/profile-picture"); 
    return response.data.userProfilePicture.profilePicture
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Update profile picture
export const updateProfilePicture = async (formData) => {
  try {
    const response = await axiosInstance.put("/users/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // This is important for uploading files
      },
    });
    return response.data; // Return the updated user data or success message
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};
