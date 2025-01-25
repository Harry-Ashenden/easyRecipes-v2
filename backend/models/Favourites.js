const mongoose = require("mongoose");

const FavouritesSchema = new mongoose.Schema({
    supabaseUserId: {
        type: String,
        ref: "supabaseUserId",
    },
    recipes: {
        type: [],
        required: true,
    }
});

module.exports = mongoose.model("Favourites", FavouritesSchema);