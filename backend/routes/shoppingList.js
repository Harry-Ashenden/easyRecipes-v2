const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const shoppingListController = require('../controllers/shoppingList');

// Protected Routes
router.get('/', verifyToken, shoppingListController.getShoppingList); // Fetch a user's shopping list
router.post('/manual', verifyToken, shoppingListController.addManualItem); // Add a manual item to the shopping list
router.post('/recipe/:recipeId', verifyToken, shoppingListController.addRecipeToShoppingList); // Add recipe ingredients to shopping list
router.delete('/clear', verifyToken, shoppingListController.clearShoppingList); // Clear the shopping list
router.delete('/:itemId', verifyToken, shoppingListController.removeItem); // Remove an item from the shopping list
router.patch('/:itemId/toggle', verifyToken, shoppingListController.toggleItem); // Toggle item status

module.exports = router;
