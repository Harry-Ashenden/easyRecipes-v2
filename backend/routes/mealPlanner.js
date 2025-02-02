const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const mealPlannerController = require('../controllers/mealPlanner');

// Protected Routes
router.post('/', verifyToken, mealPlannerController.addToPlanner); // Add to meal planner
router.put('/:id', verifyToken, mealPlannerController.updatePlanner); // Update meal planner
router.get('/', verifyToken, mealPlannerController.getMealPlanner); // Get all meal-planned recipes

module.exports = router;
