const User = require('../models/User');
const cloudinary = require('../middleware/cloudinary');

module.exports = {
  
  // Get user data
  getUserData: async (req, res) => {
    try {
      const { supabaseUserId } = req; // Destructure Supabase User ID from JWT

      // Find the user in the database
      const user = await User.findOne({ supabaseUserId }).select('username profilePicture supabaseUserId');

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Respond with the user data
      res.status(200).json({
        message: 'User data retrieved successfully.',
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while retrieving user data.',
        details: err.message,
      });
    }
  },

  // Update user profile picture
  updateProfilePicture: async (req, res) => {
    try {
      const { supabaseUserId } = req; // Destructure Supabase User ID from JWT
      const { file } = req; // Destructure the uploaded file from Multer middleware

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      // Find the user in the database
      const user = await User.findOne({ supabaseUserId });

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Delete the current profile picture from Cloudinary if it exists
      if (user.cloudinaryPPId) {
        await cloudinary.uploader.destroy(user.cloudinaryPPId);
      }

      // Upload the new profile picture to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, { folder: 'easyRecipes' });

      // Update the user's profile picture and Cloudinary ID
      user.profilePicture = result.secure_url;
      user.cloudinaryPPId = result.public_id;
      await user.save();

      // Respond with a success message and the new profile picture URL
      res.status(200).json({
        message: 'Profile picture updated successfully.',
        profilePicture: user.profilePicture,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while updating the profile picture.',
        details: err.message,
      });
    }
  },
};
