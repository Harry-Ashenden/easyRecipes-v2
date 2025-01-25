const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipesController = require("../controllers/recipe");
const verifyToken = require("../middleware/verifyToken");

// Public Routes
router.get('/api/recipes', recipesController.getAllRecipes); // Fetch all public recipes
router.get('/api/recipes/:id', recipesController.getRecipe); // Fetch a public recipe by ID

// Protected Routes
router.get('/api/recipes/user', verifyToken, recipesController.getUserRecipes); // Read all recipes created by the logged-in user
router.post('/api/recipes', verifyToken, upload.single('file'), recipesController.createRecipe); // Create a new recipe
router.post('/api/recipes/from-url', verifyToken, recipesController.createRecipeUrl); // Create a recipe from a URL
router.put('/api/recipes/:id', verifyToken, upload.single('file'), recipesController.updateRecipe); // Update an existing recipe
router.delete('/api/recipes/:id', verifyToken, recipesController.deleteRecipe); // Delete a recipe

module.exports = router;

