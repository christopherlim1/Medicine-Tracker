const express = require('express');
const router = express.Router();

const medicine = require('../controllers/medicine.js');

router.get('/:customer', medicine.getMedicine);

module.exports = router;
