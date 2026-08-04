const mongoose = require("mongoose");

const ShoppingListSchema = new mongoose.Schema({
    supabaseUserId: {
        type: String,
        ref: "supabaseUserId",
    },
    shoppingListItems: [
        {
            quantity: {
                type: Number,
            },
            unit: {
                type: String,
            },
            name: {
                type: String,
                required: true,
            },
            checked: {
                type: Boolean,
                default: false,
            },
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);