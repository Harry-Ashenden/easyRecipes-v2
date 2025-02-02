const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const commentsController = require('../controllers/comments');

// Protected Routes
router.post('/', verifyToken, commentsController.createComment); // Create a comment
router.delete('/:commentId', verifyToken, commentsController.deleteComment); // Delete a comment
router.get('/recipe/:recipeId', verifyToken, commentsController.getComments); // Get comments for a recipe

module.exports = router;
