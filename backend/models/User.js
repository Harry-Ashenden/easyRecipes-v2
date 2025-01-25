const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true,
        require: true,
    },
    profilePicture: {
        type: String,
        require: false,
        default: "https://res.cloudinary.com/harry-cloud-unique/image/upload/v1736891691/Remy_adbmvr.jpg",
    },
    cloudinaryPPId: {
        type: String,
        require: false,
        default: "easyRecipes/Remy_adbmvr",
    },
    supabaseUserId: {
        type: String,
        unique: true,
        require: true,
    }
});

module.exports = mongoose.model("User", UserSchema);