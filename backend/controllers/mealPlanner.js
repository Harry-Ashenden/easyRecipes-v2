const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');

module.exports = {

  getMealPlanner: async (req, res) => {
    try {
        const supabaseUserId = req.supabaseUserId; // Extract user ID from token

        // Find the meal planner for the logged-in user
        const mealPlanner = await MealPlan.findOne({ supabaseUserId })
            .populate("mealPlan.recipe"); // Populate the recipes field to get full recipe details

        if (!mealPlanner) {
            return res.status(200).json([]); // Return an empty array if no meal planner exists for the user
        }

        res.status(200).json(mealPlanner.mealPlan);
    } catch (error) {
        console.error("Error fetching meal planner:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  },

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
          mealPlan: [
            {
              recipe: recipe._id, // Store the recipe ID in the meal plan
              notes: '', // Initialize notes as an empty string
              completed: false, // Initialize completed status as false
            }
          ],
          updatedAt: Date.now(),
        });

        return res.status(201).json({
          message: 'Recipe added to meal planner successfully.',
          mealPlan: userMealPlan,
        });
      } else {
        // Append the recipe title to the existing meal plan
        userMealPlan.mealPlan.push({
          recipe: recipe._id,
          notes: '',
          completed: false
        });
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
  
  removeFromPlanner: async (req, res) => {
    try {
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT
     const { mealPlanEntryId } = req.params; // Extract recipe ID from URL parameters

      //accept a recipe ID and remove it from the meal planner
      let userMealPlan = await MealPlan.findOne({ supabaseUserId });
      if (!userMealPlan) {
        return res.status(404).json({ error: 'Meal planner not found for this user.' });
      }
      // Filter out the recipe to be removed from the meal plan
      userMealPlan.mealPlan = userMealPlan.mealPlan.filter(
        (item) => item._id.toString() !== mealPlanEntryId
      );
      userMealPlan.updatedAt = Date.now();
      await userMealPlan.save();
      res.status(200).json({
        message: 'Recipe removed from meal planner successfully.',
        mealPlan: userMealPlan,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while removing from the meal planner.', details: err.message });
    }
  },

updatePlannerOrder: async (req, res) => {
    try {      
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT
      const { newOrder } = req.body; // Extract new order of meal plan entries from request body

      // Validate input
      if (!Array.isArray(newOrder)) {
        return res.status(400).json({ error: 'New order must be provided as an array of meal plan entry IDs.' });
      }

      // Find the user's meal plan
      let userMealPlan = await MealPlan.findOne({ supabaseUserId });

      if (!userMealPlan) {
        return res.status(404).json({ error: 'Meal planner not found for this user.' });
      }

      // Reorder the meal plan based on the new order of entry IDs
      const reorderedMealPlan = newOrder.map((entryId) => {
        return userMealPlan.mealPlan.find((entry) => entry._id.toString() === entryId);
      });
      userMealPlan.mealPlan = reorderedMealPlan;
      userMealPlan.updatedAt = Date.now();
      await userMealPlan.save();
      res.status(200).json({
        message: 'Meal planner order updated successfully.',
        mealPlan: userMealPlan,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while updating the meal planner order.',
        details: err.message,
      });
    }
  },  

  toggleRecipeCompletion: async (req, res) => {
    try {
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT
      const { mealPlanEntryId } = req.params; // Extract meal plan entry ID from URL parameters
      
      // Find the user's meal plan
      let userMealPlan = await MealPlan.findOne({ supabaseUserId });

      if (!userMealPlan) {
        return res.status(404).json({ error: 'Meal planner not found for this user.' });
      }

      // Find the specific entry to toggle completion
      const entryIndex = userMealPlan.mealPlan.findIndex((entry) => entry._id.toString() === mealPlanEntryId);

      if (entryIndex === -1) {
        return res.status(404).json({ error: 'Meal plan entry not found.' });
      }

      // Toggle the completion status
      userMealPlan.mealPlan[entryIndex].completed = !userMealPlan.mealPlan[entryIndex].completed;
      userMealPlan.updatedAt = Date.now();
      await userMealPlan.save();

      res.status(200).json({
        message: 'Recipe completion status updated successfully.',
        mealPlan: userMealPlan,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while toggling recipe completion.',
        details: err.message,
      });
    }
  },

  updateMealPlanEntryNotes: async (req, res) => {
    try {
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT
      const { mealPlanEntryId } = req.params; // Extract meal plan entry ID from URL parameters
      const { notes } = req.body; // Extract new notes from request body

      // Validate input
      if (typeof notes !== 'string') {
        return res.status(400).json({ error: 'Notes must be provided as a string.' });
      }

      // Find the user's meal plan
      let userMealPlan = await MealPlan.findOne({ supabaseUserId });

      if (!userMealPlan) {
        return res.status(404).json({ error: 'Meal planner not found for this user.' });
      }

      // Find the specific entry to update notes
      const entryIndex = userMealPlan.mealPlan.findIndex((entry) => entry._id.toString() === mealPlanEntryId);

      if (entryIndex === -1) {
        return res.status(404).json({ error: 'Meal plan entry not found.' });
      }

      // Update the notes for the specific entry
      userMealPlan.mealPlan[entryIndex].notes = notes;
      userMealPlan.updatedAt = Date.now();
      await userMealPlan.save();

      res.status(200).json({
        message: 'Meal plan entry notes updated successfully.',
        mealPlan: userMealPlan,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while updating meal plan entry notes.',
        details: err.message,
      });
    }
  },

  clearMealPlanner: async (req, res) => {
    try {
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT

      // Find the user's meal plan
      let userMealPlan = await MealPlan.findOne({ supabaseUserId });

      if (!userMealPlan) {
        return res.status(404).json({ error: 'Meal planner not found for this user.' });
      }

      // Clear the meal plan and update the timestamp
      userMealPlan.mealPlan = [];
      userMealPlan.updatedAt = Date.now();
      await userMealPlan.save();

      res.status(200).json({
        message: 'Meal planner cleared successfully.',
        mealPlan: userMealPlan,
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while clearing the meal planner.',
        details: err.message,
      });
    }
  },
};