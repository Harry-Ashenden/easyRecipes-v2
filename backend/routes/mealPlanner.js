const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const mealPlannerController = require('../controllers/mealPlanner');

// Protected Routes
router.post('/api/meal-planner', verifyToken, mealPlannerController.addToPlanner); // Add to meal planner
router.put('/api/meal-planner/:id', verifyToken, mealPlannerController.updatePlanner); // Update meal planner

module.exports = router;
