const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const userController = require('../controllers/user');
const upload = require('../middleware/multer');

// Protected Routes
router.get('/me', verifyToken, userController.getUserData); // Get user data
router.put('/profile-picture', verifyToken, upload.single('file'), userController.updateProfilePicture); // Update profile picture

module.exports = router;
