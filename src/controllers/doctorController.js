const _ = require('lodash');

const doctors = [
  { id: 1, name: 'Dr. Alice Brown', specialty: 'Cardiology', license: 'MD-12345' },
  { id: 2, name: 'Dr. Carlos Rivera', specialty: 'Endocrinology', license: 'MD-67890' },
  { id: 3, name: 'Dr. Emily Chen', specialty: 'Pulmonology', license: 'MD-11223' }
];

const getAll = (req, res) => res.json(doctors);

const getById = (req, res) => {
  const doctor = _.find(doctors, { id: parseInt(req.params.id) });
  if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
  res.json(doctor);
};

const create = (req, res) => {
  const newDoctor = { id: doctors.length + 1, ...req.body };
  doctors.push(newDoctor);
  res.status(201).json(newDoctor);
};

module.exports = { getAll, getById, create };
