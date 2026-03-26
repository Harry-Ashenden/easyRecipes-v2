const mongoose = require("mongoose");

const MealPlanSchema = new mongoose.Schema({
    supabaseUserId: {
        type: String,
        ref: "supabaseUserId",
    },
    mealPlan: [
        {
            recipe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Recipe",
            },
            notes: {
                type: String,
            },
            completed: {
                type: Boolean,
                default: false,
            }
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("MealPlan", MealPlanSchema);