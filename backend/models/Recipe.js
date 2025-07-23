const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: false,
    default: "https://res.cloudinary.com/harry-cloud-unique/image/upload/v1736892398/Ratatouille-with_remy_x45hjy.webp",
  },
  cloudinaryId: {
    type: String,
    require: false,
    default:"easyRecipes/Ratatouille-with_remy_x45hjy",
  },
  servings: {
    type: String,
    required: false,
  },
  prepTime: {
    type: String,
    required: false,
  },
  cookTime: {
    type: String,
    required: false,
  },
  totalTime: {
    type: String,
    required: false,
  },
  ingredients: {
    type: [],
    required: false,
  },
  method: {
    type: [],
    required: false,
  },
  supabaseUserId: {
    type: String,
    ref: "supabaseUserId",
  },
  username: { 
    type: String, 
    required: true 
  },
  profilePicture: {
    type: String,
    ref: "profilePicture",
    default: "https://res.cloudinary.com/harry-cloud-unique/image/upload/v1736891691/Remy_adbmvr.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sourceLink: {
    type: String,
    required: false,
  },
  tags: {
    type: [],
    required: false,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
