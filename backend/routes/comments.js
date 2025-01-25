const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const commentsController = require('../controllers/comments');

// Protected Routes
router.post('/api/comments', verifyToken, commentsController.createComment); // Create a comment
router.delete('/api/comments/:id', verifyToken, commentsController.deleteComment); // Delete a comment

module.exports = router;
