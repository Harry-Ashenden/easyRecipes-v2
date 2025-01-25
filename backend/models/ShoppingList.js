const mongoose = require("mongoose");

const ShoppingListSchema = new mongoose.Schema({
    supabaseUserId: {
        type: String,
        ref: "supabaseUserId",
    },
    items: {
        type: [],
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);