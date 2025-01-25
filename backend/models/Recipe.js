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
    type: Number,
    required: false,
  },
  prepTime: {
    type: Number,
    required: false,
  },
  cookTime: {
    type: Number,
    required: false,
  },
  totalTime: {
    type: Number,
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
  profilePicture: {
    type: String,
    ref: "profilePicture",
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
