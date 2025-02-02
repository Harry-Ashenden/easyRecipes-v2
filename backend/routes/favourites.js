const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const favouritesController = require('../controllers/favourites');

// Protected Routes
router.put('/:recipeId', verifyToken, favouritesController.favRecipe); // Add to favourites
router.delete('/:recipeId', verifyToken, favouritesController.unFavRecipe); // Update favourites
router.get('/', verifyToken, favouritesController.getFavRecipes) //Get all favourites

module.exports = router;
