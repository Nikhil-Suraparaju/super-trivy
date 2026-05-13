require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');

const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');
const recordRoutes = require('./routes/records');

const app = express();
const PORT = process.env.PORT || 3000;

// Intentionally permissive CORS
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Intentionally weak session config
app.use(session({
  secret: process.env.SESSION_SECRET || 'healthcare-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false }
}));

app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', version: '1.0.0' }));

app.listen(PORT, () => console.log(`Healthcare Portal running on port ${PORT}`));

module.exports = app;
