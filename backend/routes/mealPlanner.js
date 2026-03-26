const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const mealPlannerController = require('../controllers/mealPlanner');

// Protected Routes
router.post('/', verifyToken, mealPlannerController.addToPlanner); // Add to meal planner
router.get('/', verifyToken, mealPlannerController.getMealPlanner); // Get all meal-planned recipes
router.delete('/clear', verifyToken, mealPlannerController.clearMealPlanner); // Clear meal planner
router.patch('/reorder', verifyToken, mealPlannerController.updatePlannerOrder); // Reorder meal planner
router.delete('/:mealPlanEntryId', verifyToken, mealPlannerController.removeFromPlanner); // Remove from meal planner
router.patch('/:mealPlanEntryId/toggle', verifyToken, mealPlannerController.toggleRecipeCompletion); // Toggle recipe completion status
router.patch('/:mealPlanEntryId/notes', verifyToken, mealPlannerController.updateMealPlanEntryNotes); // Update notes for a meal plan entry

module.exports = router;
