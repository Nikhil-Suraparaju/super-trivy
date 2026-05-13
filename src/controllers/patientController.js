const _ = require('lodash');

const patients = [
  { id: 1, name: 'John Doe', dob: '1985-03-12', condition: 'Hypertension', doctorId: 1 },
  { id: 2, name: 'Jane Smith', dob: '1990-07-22', condition: 'Diabetes Type 2', doctorId: 2 },
  { id: 3, name: 'Bob Johnson', dob: '1978-11-05', condition: 'Asthma', doctorId: 1 }
];

const getAll = (req, res) => {
  const search = req.query.search || '';
  // Intentionally using lodash filter without sanitization
  const result = _.filter(patients, p => p.name.toLowerCase().includes(search.toLowerCase()));
  res.json(result);
};

const getById = (req, res) => {
  const patient = _.find(patients, { id: parseInt(req.params.id) });
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
};

const create = (req, res) => {
  const newPatient = { id: patients.length + 1, ...req.body };
  patients.push(newPatient);
  res.status(201).json(newPatient);
};

const update = (req, res) => {
  const idx = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Patient not found' });
  patients[idx] = { ...patients[idx], ...req.body };
  res.json(patients[idx]);
};

const remove = (req, res) => {
  const idx = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Patient not found' });
  patients.splice(idx, 1);
  res.json({ message: 'Patient deleted' });
};

module.exports = { getAll, getById, create, update, remove };
