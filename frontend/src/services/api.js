import axiosInstance from "./axiosInstance"; // Import Axios instance
import easyRecipesIcon from "../assets/easyRecipes-icon.png";
import { supabase } from "../hooks/useAuth";

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

  return axiosInstance.put(`/recipes/${recipeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Manual create recipe
export const createRecipe = async (formData) => {

  return axiosInstance.post("/recipes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Import a recipe from a URL
export const importRecipeFromUrl = async (recipeUrl) => {

  return axiosInstance.post("/recipes/from-url", { recipeUrl });
  
};

// Get all favourite recipes
export const getFavouriteRecipes = async () => {
  try {
    const response = await axiosInstance.get("/favourites");
    return response.data.map(({ _id, title, image, tags, username, profilePicture }) => ({
        _id,
        title,
        image,
        tags,
        username: username || "Unknown",
        profilePicture: profilePicture || { easyRecipesIcon },
      }));
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Add a recipe to favourites
export const addFavourite = async (recipeId) => {
  try {
    const response = await axiosInstance.put(`/favourites/${recipeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Remove a recipe from favourites
export const removeFavourite = async (recipeId) => {
  try {
    const response = await axiosInstance.delete(`/favourites/${recipeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Get meal planner
export const getMealPlanner = async () => {
  try {
    const response = await axiosInstance.get("/meal-planner");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Add a recipe to meal planner
export const addToMealPlanner = async (recipeId) => {
  try {
    const response = await axiosInstance.post("/meal-planner", { recipeId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Clear meal planner
export const clearMealPlanner = async () => {
  try {
    const response = await axiosInstance.delete("/meal-planner/clear");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Reorder meal planner
export const reorderMealPlanner = async (newOrder) => {
  try {
    const response = await axiosInstance.patch("/meal-planner/reorder", { newOrder });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Remove a recipe from meal planner
export const removeFromMealPlanner = async (mealPlanEntryId) => {
  try {
    const response = await axiosInstance.delete(`/meal-planner/${mealPlanEntryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Toggle recipe completion status in meal planner
export const toggleRecipeCompletion = async (mealPlanEntryId) => {
  try {
    const response = await axiosInstance.patch(`/meal-planner/${mealPlanEntryId}/toggle`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

// Update notes for a meal plan entry
export const updateMealPlanEntryNotes = async (mealPlanEntryId, notes) => {
  try {
    const response = await axiosInstance.patch(`/meal-planner/${mealPlanEntryId}/notes`, { notes });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}