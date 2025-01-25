const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');

module.exports = {
  addToPlanner: async (req, res) => {
    try {
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT
      const { recipeId } = req.body; // Extract recipe ID from request body

      // Validate inputs
      if (!recipeId) {
        return res.status(400).json({ error: 'Recipe ID is required.' });
      }

      // Find the recipe by ID to get its title
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found.' });
      }

      // Find the user's meal plan
      let userMealPlan = await MealPlan.findOne({ supabaseUserId });

      if (!userMealPlan) {
        // Create a new meal plan if one doesn't exist
        userMealPlan = await MealPlan.create({
          supabaseUserId,
          mealPlan: [recipe.title], // Start with the recipe title
        });

        return res.status(201).json({
          message: 'Recipe added to meal planner successfully.',
          mealPlan: userMealPlan,
        });
      } else {
        // Append the recipe title to the existing meal plan
        userMealPlan.mealPlan.push(recipe.title);
        userMealPlan.updatedAt = Date.now();
        await userMealPlan.save();

        return res.status(200).json({
          message: 'Recipe added to meal planner successfully.',
          mealPlan: userMealPlan,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while adding to the meal planner.',
        details: err.message,
      });
    }
  },

  updatePlanner: async (req, res) => {
    try {
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT
      const { mealPlanText } = req.body; // Extract meal plan text from request body

      // Validate input
      if (!mealPlanText || typeof mealPlanText !== 'string') {
        return res.status(400).json({ error: 'Meal plan must be provided as a text string.' });
      }

      // Convert the meal plan text into an array by splitting on newlines
      const mealPlanArray = mealPlanText.split('\n').filter((item) => item.trim() !== '');
      // Filter removes empty lines (caused by extra newlines)

      // Find the user's meal plan
      let userMealPlan = await MealPlan.findOne({ supabaseUserId });

      if (!userMealPlan) {
        return res.status(404).json({ error: 'Meal planner not found for this user.' });
      }

      // Replace the meal plan and update the timestamp
      userMealPlan.mealPlan = mealPlanArray;
      userMealPlan.updatedAt = Date.now();
      await userMealPlan.save();

      res.status(200).json({
        message: 'Meal planner updated successfully.',
        mealPlan: userMealPlan,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while updating the meal planner.',
        details: err.message,
      });
    }
  },
};