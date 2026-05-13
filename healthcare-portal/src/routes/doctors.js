const express = require('express');
const router = express.Router();
const { getAll, getById, create } = require('../controllers/doctorController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', authenticate, getAll);
router.get('/:id', authenticate, getById);
router.post('/', authenticate, authorizeAdmin, create);

module.exports = router;
