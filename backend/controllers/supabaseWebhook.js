const User = require('../models/User');
const ShoppingList = require('../models/ShoppingList');
const MealPlanner = require('../models/MealPlan');
const Favourites = require('../models/Favourites');
const dotenv = require('dotenv');

dotenv.config({ path: "./.env" });

module.exports = {

    createUserDocs: async (req, res) => { 
        try {
          //Verify that the payload came from supabase by verifying the authorisation in hte header 
          const authHeader = req.headers.authorisation;
          if (authHeader !== `Bearer ${process.env.SUPABASE_WEBHOOK_SECRET}`) {
            return res.status(403).json({ error: 'Forbidden' });
          }

          console.log('Webhook Payload:', req.body);

          const { record: { id: supabaseUserId, raw_user_meta_data } } = req.body; // Extract data from Supabase webhook payload
          const username = raw_user_meta_data?.username; // Assume frontend sends username in app_metadata} 

          console.log('Supabase User ID:', supabaseUserId);
          console.log('Username:', username);
      
        
          if (!supabaseUserId || !username) { // Check to see if the supabaseUserId is present
            return res.status(400).json({ error: 'Invalid payload' });
          }
      
          // Create the user document
          await User.create({ supabaseUserId, username });
      
          // Create associated empty documents
          await ShoppingList.create({ supabaseUserId: supabaseUserId, items: [] });
          await MealPlanner.create({ supabaseUserId: supabaseUserId, mealPlan: [] });
          await Favourites.create({ supabaseUserId: supabaseUserId, recipes: [] });
      
          res.status(200).json({ message: 'User and associated data created successfully' });
        } catch (error) {
          console.error('Error in Supabase webhook:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
    }
};

