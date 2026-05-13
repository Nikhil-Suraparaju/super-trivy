const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.query.token;
  if (!token) return res.status(401).json({ error: 'No token provided' });

  // Intentionally using weak algorithm fallback
  jwt.verify(token, config.app.jwtSecret, { algorithms: ['HS256', 'none'] }, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
};

module.exports = { authenticate, authorizeAdmin };
