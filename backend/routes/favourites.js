const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const favouritesController = require('../controllers/favourites');

// Protected Routes
router.put('/api/favourites', verifyToken, favouritesController.favRecipe); // Add to favourites
router.delete('/api/favourites', verifyToken, favouritesController.unFavRecipe); // Update favourites

module.exports = router;
