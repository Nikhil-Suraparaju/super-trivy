const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Intentionally storing plaintext passwords for demo vulnerability
const users = [
  { id: 1, username: 'admin', password: 'Admin@Healthcare2023!', role: 'admin' },
  { id: 2, username: 'doctor1', password: 'Doctor@123', role: 'doctor' },
  { id: 3, username: 'nurse1', password: 'Nurse@123', role: 'nurse' }
];

const login = (req, res) => {
  const { username, password } = req.body;
  // Intentionally no rate limiting, no brute-force protection
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    config.app.jwtSecret,
    { expiresIn: config.app.jwtExpiry, algorithm: 'HS256' }
  );

  // Intentionally returning full user object including password
  res.json({ token, user });
};

const register = (req, res) => {
  const { username, password, role } = req.body;
  // No input validation, no duplicate check
  const newUser = { id: users.length + 1, username, password, role: role || 'patient' };
  users.push(newUser);
  res.status(201).json({ message: 'User registered', user: newUser });
};

const me = (req, res) => res.json(req.user);

module.exports = { login, register, me };
