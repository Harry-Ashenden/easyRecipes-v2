const ShoppingList = require('../models/ShoppingList');
const Recipe = require('../models/Recipe');

module.exports = {
  
  // Get the user's shopping list
  getShoppingList: async (req, res) => {
    try {
      const { supabaseUserId } = req; // Supabase User ID from JWT

      // Find the user's shopping list
      const userShoppingList = await ShoppingList.findOne({ supabaseUserId });

      // Return empty array if no list exists
      if (!userShoppingList) {
        return res.status(200).json({ shoppingListItems: [] });
      }

      res.status(200).json({ shoppingListItems: userShoppingList.shoppingListItems });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while fetching the shopping list.',
        details: err.message,
      });
    }
  },

  //Add a manual item to the shopping list
  addManualItem: async (req, res) => {
    try {
      const { supabaseUserId } = req;
      const { name, quantity, unit } = req.body; //get the item details from the request body

      // Find the user's shopping list
      const userShoppingList = await ShoppingList.findOne({ supabaseUserId });

      // Create a new shopping list if one doesn't exist
      if (!userShoppingList) {
        const newShoppingList = await ShoppingList.create({
          supabaseUserId,
          shoppingListItems: [{ name, quantity, unit, checked: false }],
        });
      } else {
        // check if item is currently in shopping list with exact name and unit
        const existingItem = userShoppingList.shoppingListItems.find(item => item.name === name && item.unit === unit);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          userShoppingList.shoppingListItems.push({ name, quantity, unit, checked: false });
        }

        await userShoppingList.save();

        res.status(200).json({
          message: 'Item added to shopping list successfully.',
          shoppingList: userShoppingList,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while adding the item to the shopping list.',
        details: err.message,
      });
    }
  },

  // Add recipe to shopping list
  addRecipeToShoppingList: async (req, res) => {
    try {
      const { supabaseUserId } = req;
      const { recipeId } = req.params;
      
      // check if recipe not found
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found.' });
      }

      // Find the user's shopping list
      let userShoppingList = await ShoppingList.findOne({ supabaseUserId });

      // Create a new shopping list if one doesn't exist
      if (!userShoppingList) {
        userShoppingList = await ShoppingList.create({
          supabaseUserId,
          shoppingListItems: recipe.ingredients.map(ingredient => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            checked: false,
          })),
        });
      } else {
        // check if item is currently in shopping list with exact name and unit
        recipe.ingredients.forEach(ingredient => {
          const existingItem = userShoppingList.shoppingListItems.find(item => item.name === ingredient.name && item.unit === ingredient.unit);

          // if in shopping list add the quantity for a new total
          if (existingItem) {
            existingItem.quantity += ingredient.quantity; 
          } else {
            userShoppingList.shoppingListItems.push({
              name: ingredient.name,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
              checked: false,
            });
          }
        });

        await userShoppingList.save();
      }

      res.status(200).json({
        message: 'Recipe ingredients added to shopping list successfully.',
        shoppingList: userShoppingList,
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while adding the recipe to the shopping list.',
        details: err.message,
      });
    }
  },

  // Remove item from shopping list
  removeItem: async (req, res) => {
    try {
      const { supabaseUserId } = req;
      const { itemId } = req.params; 

      // Find the user's shopping list
      const userShoppingList = await ShoppingList.findOne({ supabaseUserId });

      if (!userShoppingList) {
        return res.status(404).json({ error: 'Shopping list not found for this user.' });
      }

      // remove the item from the shopping list
      userShoppingList.shoppingListItems = userShoppingList.shoppingListItems.filter(
        (item) => item._id.toString() !== itemId
      );

      await userShoppingList.save();

      res.status(200).json({
        message: 'Item removed from shopping list successfully.',
        shoppingList: userShoppingList,
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while removing the item from the shopping list.',
        details: err.message,
      });
    }
  },

  // Toggle item
  toggleItem: async (req, res) => {
    try {
      const { supabaseUserId } = req;
      const { itemId } = req.params;
    
      // Find the user's shopping list
      const userShoppingList = await ShoppingList.findOne({ supabaseUserId });

      if (!userShoppingList) {
        return res.status(404).json({ error: 'Shopping list not found for this user.' });
      }

      // Find the item in the shopping list
      const item = userShoppingList.shoppingListItems.id(itemId);

      if (!item) {
        return res.status(404).json({ error: 'Item not found in the shopping list.' });
      }

      // Toggle the checked status of the item
      item.checked = !item.checked;
      await userShoppingList.save();

      res.status(200).json({
        message: 'Item toggled successfully.',
        shoppingList: userShoppingList,
      });
    
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while toggling the item in the shopping list.',
        details: err.message,
      });
    }    
  },

  // Clear shopping list
  clearShoppingList: async (req, res) => {
    try {

      const { supabaseUserId } = req;

      // Find the user's shopping list
      const userShoppingList = await ShoppingList.findOne({ supabaseUserId });

      if (!userShoppingList) {
        return res.status(404).json({ error: 'Shopping list not found for this user.' });
      }

      // Clear the shopping list and update the timestamp
      userShoppingList.shoppingListItems = [];
      userShoppingList.updatedAt = Date.now();
      await userShoppingList.save();

      res.status(200).json({
        message: 'Shopping list cleared successfully.',
        shoppingList: userShoppingList,
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while clearing the shopping list.',
        details: err.message,
      });
    }
  },

};
