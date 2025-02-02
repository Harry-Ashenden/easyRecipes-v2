const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipesController = require("../controllers/recipe");
const verifyToken = require("../middleware/verifyToken");

// Public Routes
router.get('/', recipesController.getAllRecipes); // Fetch all public recipes
router.get('/:recipeId', recipesController.getRecipe); // Fetch a public recipe by ID

// Protected Routes
router.get('/user', verifyToken, recipesController.getUserRecipes); // Read all recipes created by the logged-in user
router.post('/', verifyToken, upload.single('file'), recipesController.createRecipe); // Create a new recipe
router.post('/from-url', verifyToken, recipesController.createRecipeUrl); // Create a recipe from a URL
router.put('/:recipeId', verifyToken, upload.single('file'), recipesController.updateRecipe); // Update an existing recipe
router.delete('/:recipeId', verifyToken, recipesController.deleteRecipe); // Delete a recipe

module.exports = router;

