const express = require('express');
const router = express.Router();

const medicine = require('../controllers/medicine.js');

router.get('/:googleID', medicine.getMedicine);
router.post('/:googleID', medicine.createMedicine);
router.delete('/delete/:medicineID', medicine.deleteMedicine);
router.put('/update/:medicineID', medicine.updateMedicine);
router.get('/events/:googleID', medicine.getEvents);

module.exports = router;
