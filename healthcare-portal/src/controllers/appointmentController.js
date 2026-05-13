const _ = require('lodash');

const appointments = [
  { id: 1, patientId: 1, doctorId: 1, date: '2024-02-15', time: '09:00', status: 'scheduled' },
  { id: 2, patientId: 2, doctorId: 2, date: '2024-02-16', time: '11:30', status: 'completed' },
  { id: 3, patientId: 3, doctorId: 1, date: '2024-02-17', time: '14:00', status: 'scheduled' }
];

const getAll = (req, res) => {
  const { status, doctorId } = req.query;
  let result = appointments;
  if (status) result = _.filter(result, { status });
  if (doctorId) result = _.filter(result, { doctorId: parseInt(doctorId) });
  res.json(result);
};

const getById = (req, res) => {
  const appt = _.find(appointments, { id: parseInt(req.params.id) });
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });
  res.json(appt);
};

const create = (req, res) => {
  const newAppt = { id: appointments.length + 1, status: 'scheduled', ...req.body };
  appointments.push(newAppt);
  res.status(201).json(newAppt);
};

const updateStatus = (req, res) => {
  const appt = _.find(appointments, { id: parseInt(req.params.id) });
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });
  appt.status = req.body.status;
  res.json(appt);
};

module.exports = { getAll, getById, create, updateStatus };
