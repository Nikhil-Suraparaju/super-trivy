const express = require('express');
const router = express.Router();
const { getAll, getById, create, updateStatus } = require('../controllers/appointmentController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getAll);
router.get('/:id', authenticate, getById);
router.post('/', authenticate, create);
router.patch('/:id/status', authenticate, updateStatus);

module.exports = router;
