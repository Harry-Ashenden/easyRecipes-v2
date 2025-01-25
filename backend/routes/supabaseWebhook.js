const express = require('express');
const router = express.Router();
const supabaseWebhookController = require('../controllers/supabaseWebhook');

router.post('/api/supabase/webhook', supabaseWebhookController.createUserDocs); // Create user documents on sign up

module.exports = router;