const Recipe = require('../models/Recipe');
const User = require("../models/User");
const cloudinary = require('../middleware/cloudinary');
const axios = require("axios");
const dotenv = require('dotenv');

dotenv.config({ path: "./.env" });

module.exports = {

  // Get all public recipes
  // getAllRecipes: async (req, res) => {
  //   try {
  //       const recipes = await Recipe.find(); // Fetch all recipes

  //       // Attach user data manually
  //       const recipesWithUsers = await Promise.all(
  //         recipes.map(async (recipe) => {
  //           const user = await User.findOne({ supabaseUserId: recipe.supabaseUserId }).select("username profilePicture");
        
  //           return {
  //             ...recipe.toObject(),
  //             user, // Attach user data manually
  //           };
  //         })
  //       );
        
  //       res.status(200).json(recipesWithUsers);
        
  //   } catch (err) {
  //     console.error(`Error fetching recipes: ${err.message}`);
  //     res.status(500).json({ error: 'Server error whilst fetching all recipes' });
  //   }
  // },

  // getAllRecipes: async (req, res) => {
  //   try {
  //     const recipes = await Recipe.find().populate("user", "username profilePicture"); // Fetch recipes + user details
  //     res.status(200).json(recipes);
  //   } catch (err) {
  //     console.error(`Error fetching recipes: ${err.message}`);
  //     res.status(500).json({ error: "Server error whilst fetching all recipes" });
  //   }
  // },

  getAllRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find(); // No need to fetch user separately
      res.status(200).json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ error: "Server error fetching recipes" });
    }
  },

  // Get a specific recipe by ID
  getRecipe: async (req, res) => {
    try {
      const { recipeId } = req.params; // Destructure recipe ID from the request parameters
      const recipe = await Recipe.findById(recipeId); // Find the recipe by ID
      console.log('Fetching recipe with ID:', recipeId);
  
      if (!recipe) return res.status(404).json({ error: 'Recipe not found with that ID' });
  
      // Find the user using the supabaseUserId in the Recipe model
      const user = await User.findOne({ supabaseUserId: recipe.supabaseUserId }).select('username profilePicture');
      
      if (!user) return res.status(404).json({ error: 'User not found for the recipe.' });
  
      // Attach the user data to the recipe before sending the response
      recipe.user = user; // Add the user data to the recipe
  
      res.status(200).json(recipe); // Send the recipe with user data
    } catch (err) {
      console.error(`Error fetching recipe: ${err.message}`);
      res.status(500).json({ error: 'Server error whilst fetching specific recipes' });
    }
  },

  // Get all recipes created by the logged-in user
  getUserRecipes: async (req, res) => {
    try {
      const { supabaseUserId } = req; // Destructure Supabase User ID from the JWT
      const userRecipes = await Recipe.find({ supabaseUserId });
      res.status(200).json(userRecipes);
    } catch (err) {
      console.error(`Error fetching users recipes: ${err.message}`);
      res.status(500).json({ error: 'Server error whilst fetching users recipes' });
    }
  },

  // Create a new recipe
  createRecipe: async (req, res) => {
    try {
      const { title, servings, prepTime, cookTime, totalTime, ingredients, method, sourceLink, tags } = req.body;
      const supabaseUserId = req.user.supabaseUserId;

      // Fetch user details
      const user = await User.findOne({ supabaseUserId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Split the arrays
      const ingredientsArray = ingredients.split('\n');
      const methodArray = method.split('\n');
      const tagsArray = tags.split('\n');

      // Handle image upload to Cloudinary
      let imageUrl, cloudinaryId;
      if (req.file) {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'easyRecipes' });
        imageUrl = uploadResult.secure_url;
        cloudinaryId = uploadResult.public_id;
      }

      const newRecipe = new Recipe({
        title,
        image: imageUrl || undefined,
        cloudinaryId: cloudinaryId || undefined,
        servings,
        prepTime,
        cookTime,
        totalTime,
        ingredients: ingredientsArray,
        method: methodArray,
        userId: req.supabaseUserId,
        username: user.username,
        profilePicture: user.profilePicture,
        sourceLink,
        tags: tagsArray,
      });

      const savedRecipe = await newRecipe.save();
      res.status(201).json(savedRecipe);
    } catch (err) {
      console.error(`Error creating new recipe: ${err.message}`);
      res.status(500).json({ error: 'Server error whilst creating new recipe' });
    }
  },

  // Create a recipe from a URL
  createRecipeUrl: async (req, res) => {
    try {
      const { recipeUrl } = req.body; // Destructure recipe URL from the request body
      if (!recipeUrl) {
        return res.status(400).json({ error: 'Recipe URL is required.' });
      }

      const supabaseUserId = req.user.supabaseUserId;

      // Fetch user details
      const user = await User.findOne({ supabaseUserId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Define the recipe API request
      const recipeUrlApi = {
        method: 'GET',
        url: 'https://cookr-recipe-parser.p.rapidapi.com/getRecipe',
        params: { source: recipeUrl },
        headers: {
          'content-type': 'text/plain',
          'X-RapidAPI-Key': process.env.RECIPE_URL_API,
          'X-RapidAPI-Host': 'cookr-recipe-parser.p.rapidapi.com',
        },
      };

      // Make the request to the recipe parser API
      const response = await axios.request(recipeUrlApi);
      const recipeData = response.data.recipe;

      if (!recipeData) {
        return res.status(404).json({ error: 'Failed to retrieve recipe data.' });
      }

      // Handle image upload to Cloudinary
      let cloudinaryResult = null;
      if (recipeData.image) {
        const imageUrl = Array.isArray(recipeData.image) ? recipeData.image[0] : recipeData.image;
        cloudinaryResult = await cloudinary.uploader.upload(imageUrl, { folder: 'easyRecipes' });
      }

      // Create the recipe document in MongoDB
      const newRecipe = await Recipe.create({
        title: recipeData.name,
        image: cloudinaryResult ? cloudinaryResult.secure_url : undefined,
        cloudinaryId: cloudinaryResult ? cloudinaryResult.public_id : undefined,
        servings: recipeData.recipeYield || null,
        prepTime: recipeData.prepTime || null,
        cookTime: recipeData.cookTime || null,
        totalTime: recipeData.totalTime || null,
        ingredients: recipeData.recipeIngredients || [],
        method: recipeData.recipeInstructions || [],
        userId: req.supabaseUserId, // The user's Supabase ID
        username: user.username,
        profilePicture: user.profilePicture,
        tags: recipeData.keywords || [], // Optional tags (e.g., keywords from the recipe API)
        sourceLink: recipeUrl,
      });

      res.status(201).json({
        message: 'Recipe successfully created.',
        recipe: newRecipe,
      });
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data) {
        return res.status(500).json({
          error: 'Failed to fetch recipe data from external API.',
          details: err.response.data,
        });
      }

      res.status(500).json({
        error: 'An error occurred while creating the recipe.',
        details: err.message,
      });
    }
  },

  // Update an existing recipe
  updateRecipe: async (req, res) => {
    try {
      const { recipeId } = req.params; // Destructure recipe ID from URL
      const { title, servings, prepTime, cookTime, totalTime, ingredients, method, tags } = req.body;

      // Find the recipe to ensure it exists and is owned by the current user
      const recipe = await Recipe.findById(recipeId);

      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found.' });
      }

      if (recipe.userId.toString() !== req.supabaseUserId) {
        return res.status(403).json({ error: 'You are not authorized to update this recipe.' });
      }

      // Prepare data for updating
      const updatedData = {
        title: title || recipe.title,
        servings: servings || recipe.servings,
        prepTime: prepTime || recipe.prepTime,
        cookTime: cookTime || recipe.cookTime,
        totalTime: totalTime || recipe.totalTime,
        ingredients: ingredients ? ingredients.split('\n') : recipe.ingredients,
        method: method ? method.split('\n') : recipe.method,
        tags: tags ? tags.split('\n') : recipe.tags,
      };

      // Handle image replacement if a new image is uploaded
      if (req.file) {
        if (recipe.cloudinaryId) {
          await cloudinary.uploader.destroy(recipe.cloudinaryId);
        }

        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'easyRecipes' });
        updatedData.image = result.secure_url;
        updatedData.cloudinaryId = result.public_id;
      }

      // Update the recipe in the database and return the updated document
      const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updatedData, { new: true });

      res.status(200).json({ message: 'Recipe updated successfully.', recipe: updatedRecipe });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the recipe.', details: err.message });
    }
  },

  // Delete a recipe
  deleteRecipe: async (req, res) => {
    try {
      const { recipeId } = req.params; // Destructure recipe ID from URL

      const recipe = await Recipe.findById(recipeId);
      if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

      if (recipe.cloudinaryId) {
        await cloudinary.uploader.destroy(recipe.cloudinaryId);
      }

      await Recipe.findByIdAndDelete(recipeId);
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete recipe' });
    }
  },
};
