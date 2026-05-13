const express = require('express');
const router = express.Router();
const { getAll, getById, getFile, renderNote } = require('../controllers/recordController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getAll);
router.get('/:id', authenticate, getById);
router.get('/file/:filename', authenticate, getFile);
router.post('/render', authenticate, renderNote);

module.exports = router;
