const Favourites = require('../models/Favourites');

module.exports = {   

   // Mark a recipe as favourite
   favRecipe: async (req, res) => {
    try {
        const { recipeId } = req.params; // Recipe ID from URL
        const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT
  
        // Ensure the recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
          return res.status(404).json({ error: 'Recipe not found.' });
        }
  
        // Check if the user already has a favourites document
        let favourites = await Favourites.findOne({ supabaseUserId });
  
        // If no favourites document exists, create one
        if (!favourites) {
          favourites = new Favourites({
            supabaseUserId,
            recipes: [],
          });
        }
  
        // Add recipe ID to the favourites if not already present
        if (!favourites.recipes.includes(recipeId)) {
          favourites.recipes.push(recipeId);
          await favourites.save(); // Save changes to the database
          return res.status(200).json({ message: 'Recipe added to favourites.' });
        } else {
          return res.status(400).json({ error: 'Recipe is already in favourites.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding to favourites.', details: err.message });
    }
},

// Remove a recipe from favourites
unFavRecipe: async (req, res) => {
    try {
      const { recipeId } = req.params; // Recipe ID from URL
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT

      // Find the user's favourites document
      const favourites = await Favourites.findOne({ supabaseUserId });

      if (!favourites) {
        return res.status(404).json({ error: 'No favourites found for this user.' });
      }

      // Check if the recipe is in the favourites list
      const recipeIndex = favourites.recipes.indexOf(recipeId);
      if (recipeIndex === -1) {
        return res.status(400).json({ error: 'Recipe is not in favourites.' });
      }

      // Remove the recipe from the favourites
      favourites.recipes.splice(recipeIndex, 1); // Remove the recipe at the found index
      await favourites.save(); // Save changes to the database

      res.status(200).json({ message: 'Recipe removed from favourites.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while removing from favourites.', details: err.message });
    }
},
};