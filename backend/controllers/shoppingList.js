const ShoppingList = require('../models/ShoppingList');
const Recipe = require('../models/Recipe');

module.exports = {
  
  // Add ingredients to the shopping list
  addToList: async (req, res) => {
    try {
      const { supabaseUserId } = req; // Supabase User ID from JWT
      const { recipeId } = req.params; // Extract recipe ID from request params

      // Validate inputs
      if (!recipeId) {
        return res.status(400).json({ error: 'Recipe ID is required.' });
      }

      // Find the recipe by ID to get its ingredients
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found.' });
      }

      // Validate that the recipe has ingredients
      if (!recipe.ingredients || recipe.ingredients.length === 0) {
        return res.status(400).json({ error: 'Recipe has no ingredients to add to the shopping list.' });
      }

      // Find the user's shopping list
      let userShoppingList = await ShoppingList.findOne({ supabaseUserId });

      if (!userShoppingList) {
        // Create a new shopping list if one doesn't exist
        userShoppingList = await ShoppingList.create({
          supabaseUserId,
          items: recipe.ingredients, // Add the recipe ingredients
        });

        return res.status(201).json({
          message: 'Ingredients added to shopping list successfully.',
          shoppingList: userShoppingList,
        });
      } else {
        // Append the recipe ingredients to the existing shopping list, ensuring no duplicates
        const newItems = recipe.ingredients.filter(item => !userShoppingList.items.includes(item));
        userShoppingList.items.push(...newItems);
        userShoppingList.updatedAt = Date.now();
        await userShoppingList.save();

        return res.status(200).json({
          message: 'Ingredients added to shopping list successfully.',
          shoppingList: userShoppingList,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while adding to the shopping list.',
        details: err.message,
      });
    }
  },

  // Get the user's shopping list
  getShoppingList: async (req, res) => {
    try {
      const { supabaseUserId } = req; // Supabase User ID from JWT

      // Find the user's shopping list
      const userShoppingList = await ShoppingList.findOne({ supabaseUserId });

      if (!userShoppingList) {
        return res.status(404).json({ error: 'No shopping list found for this user.' });
      }

      res.status(200).json({
        shoppingList: userShoppingList,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while fetching the shopping list.',
        details: err.message,
      });
    }
  },

  // Update the user's shopping list
  updateList: async (req, res) => {
    try {
      const { supabaseUserId } = req; // Supabase User ID from JWT
      const { shoppingListText } = req.body; // Extract shopping list text from request body

      // Validate input
      if (!shoppingListText || typeof shoppingListText !== 'string' || shoppingListText.trim() === '') {
        return res.status(400).json({ error: 'Shopping list must be provided as a non-empty text string.' });
      }

      // Convert the shopping list text into an array by splitting on newlines
      const shoppingListArray = shoppingListText.split('\n').filter((item) => item.trim() !== '');
      // Filter removes empty lines (caused by extra newlines)

      // Find the user's shopping list
      let userShoppingList = await ShoppingList.findOne({ supabaseUserId });

      if (!userShoppingList) {
        return res.status(404).json({ error: 'Shopping list not found for this user.' });
      }

      // Replace the shopping list and update the timestamp
      userShoppingList.items = shoppingListArray;
      userShoppingList.updatedAt = Date.now();
      await userShoppingList.save();

      res.status(200).json({
        message: 'Shopping list updated successfully.',
        shoppingList: userShoppingList,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while updating the shopping list.',
        details: err.message,
      });
    }
  },
};
