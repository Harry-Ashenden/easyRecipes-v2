const mongoose = require("mongoose");

const FavouritesSchema = new mongoose.Schema({
    supabaseUserId: {
        type: String,
        ref: "supabaseUserId",
    },
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe",
        }
    ]
});

module.exports = mongoose.model("Favourites", FavouritesSchema);