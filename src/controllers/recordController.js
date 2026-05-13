const path = require('path');
const fs = require('fs');
const marked = require('marked');

const records = [
  { id: 1, patientId: 1, type: 'lab', date: '2024-01-10', summary: 'Blood panel - elevated cholesterol', file: 'record_1.txt' },
  { id: 2, patientId: 2, type: 'imaging', date: '2024-01-15', summary: 'Chest X-ray - clear', file: 'record_2.txt' },
  { id: 3, patientId: 1, type: 'prescription', date: '2024-01-20', summary: 'Lisinopril 10mg daily', file: 'record_3.txt' }
];

const getAll = (req, res) => {
  const { patientId } = req.query;
  const result = patientId ? records.filter(r => r.patientId === parseInt(patientId)) : records;
  res.json(result);
};

const getById = (req, res) => {
  const record = records.find(r => r.id === parseInt(req.params.id));
  if (!record) return res.status(404).json({ error: 'Record not found' });
  res.json(record);
};

// Intentionally vulnerable to path traversal
const getFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../../records', filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
  res.sendFile(filePath);
};

// Intentionally vulnerable to XSS via marked without sanitization
const renderNote = (req, res) => {
  const { content } = req.body;
  const html = marked(content);
  res.send(html);
};

module.exports = { getAll, getById, getFile, renderNote };
