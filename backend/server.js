const express = require('express');
const app = express()
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/database");
const morgan = require('morgan');

// Import routes
const userRoutes = require('./routes/users');
const supabaseWebhookRoutes = require('./routes/supabaseWebhook');
const commentsRoutes = require('./routes/comments');
const favouritesRoutes = require('./routes/favourites');
const mealPlannerRoutes = require('./routes/mealPlanner');
const recipesRoutes = require('./routes/recipes');
const shoppingListRoutes = require('./routes/shoppingList');

// Configure .env to correct location
dotenv.config({ path: "./.env" });

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan('dev')); // Log HTTP requests for debugging

// Set up routes in which the server is listening
app.use('/api/users', userRoutes);
app.use('/api/supabase', supabaseWebhookRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/favourites', favouritesRoutes);
app.use('/api/meal-planner', mealPlannerRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/shopping-list', shoppingListRoutes);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
  });
});

// Global Error Handler
app.use((err, res) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

//Connect to DB then server Running
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running, you better catch it on http://localhost:${process.env.PORT}`);
    });
  })