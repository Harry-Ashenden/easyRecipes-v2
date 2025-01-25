const jwt = require('jsonwebtoken');

require("dotenv").config({ path: "../.end" });

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      const publicKey = process.env.SUPABASE_API_KEY;
      const decoded = jwt.verify(token, publicKey);
      req.supabaseUserId = decoded.sub;
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
  };

module.exports = verifyToken;