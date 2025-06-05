import axiosInstance from "./axiosInstance"; // Import Axios instance
import easyRecipesIcon from "../assets/easyRecipes-icon.png";

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

// Get users recipes
export const getUserRecipes = async () => {
  try {
    const response = await axiosInstance.get("/recipes/user");
    return response.data.map(({ _id, title, image, tags }) => ({ _id, title, image, tags })); 
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    return [];
  }
};

// Get all recipes
export const getAllRecipes = async () => {
    try {
      const response = await axiosInstance.get("/recipes");
      return response.data.map(({ _id, title, image, tags, username, profilePicture }) => ({
        _id,
        title,
        image,
        tags,
        username: username || "Unknown",
        profilePicture: profilePicture || { easyRecipesIcon },
      }));
    } catch (error) {
      console.error("Error fetching all recipes:", error);
      return [];
    }
};

// Get individual recipe
export const getRecipeById = async(recipeId) => {
  try {
    const response = await axiosInstance.get(`/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching individual recipes:", error);
    return [];
  }
};

// Delete individual recipe
export const deleteRecipeById = async (recipeId) => {
  try {
    const response = await axiosInstance.delete(`/recipes/${recipeId}`);
    return response.data; // should return: { message: "Recipe deleted successfully" }
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Edit recipe
export const updateRecipe = async (recipeId, formData) => {
  try {
    const response = await axiosInstance.put(`/recipes/${recipeId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};
