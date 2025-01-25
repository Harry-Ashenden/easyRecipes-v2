const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const shoppingListController = require('../controllers/shoppingList');

// Protected Routes
router.post('/api/shopping-list', verifyToken, shoppingListController.addToList); // Add to shopping list
router.put('/api/shopping-list/:id', verifyToken, shoppingListController.updateList); // Update shopping list

module.exports = router;
