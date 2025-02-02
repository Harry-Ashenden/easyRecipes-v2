const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

module.exports = {

  getComments: async (req, res) => {
    const { recipeId } = req.params; // Extract recipeId from request parameters

    try {
        // Fetch all comments related to the given recipeId
        const comments = await Comment.find({ recipeId }).sort({ createdAt: -1 });

        if (!comments.length) {
            return res.status(404).json({ error: "No comments found for this recipe" });
        }

        return res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createComment: async (req, res) => {
    try {
      const { comment, recipeId } = req.body; // Extract comment and recipe ID from request body
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT
      const profilePicture = req.profilePicture; // User's profile picture from JWT

      // Validate inputs
      if (!comment || !recipeId) {
        return res.status(400).json({ error: 'Comment text and recipe ID are required.' });
      }

      // Ensure the recipe exists
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found.' });
      }

      // Create the new comment
      const newComment = await Comment.create({
        comment,
        supabaseUserId,
        profilePicture,
        recipe: recipeId,
      });

      res.status(201).json({
        message: 'Comment created successfully.',
        comment: newComment,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the comment.', details: err.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { id: commentId } = req.params; // Extract comment ID from request parameters
      const supabaseUserId = req.supabaseUserId; // Supabase User ID from JWT

      // Find the comment by ID
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found.' });
      }

      // Check if the logged-in user is the owner of the comment
      if (comment.supabaseUserId !== supabaseUserId) {
        return res.status(403).json({ error: 'Unauthorized to delete this comment.' });
      }

      // Delete the comment
      await comment.remove();

      res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the comment.', details: err.message });
    }
  },
};


