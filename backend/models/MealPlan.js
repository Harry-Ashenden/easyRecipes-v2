const mongoose = require("mongoose");

const MealPlanSchema = new mongoose.Schema({
    supabaseUserId: {
        type: String,
        ref: "supabaseUserId",
    },
    mealPlan: {
        type: [],
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("MealPlan", MealPlanSchema);