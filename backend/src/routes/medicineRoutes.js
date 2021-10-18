const express = require('express');
const router = express.Router();

const medicine = require('../controllers/medicine.js');

router.get('/:customer', medicine.getMedicine);
router.post('/:customer', medicine.createMedicine);

module.exports = router;
