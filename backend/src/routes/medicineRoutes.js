const express = require('express');
const router = express.Router();

const medicine = require('../controllers/medicine.js');

router.get('/:googleID', medicine.getAllMedicine);
router.post('/:googleID', medicine.createMedicine);
router.delete('/delete/:medicineID', medicine.deleteMedicine);
router.put('/update/:medicineID', medicine.updateMedicine);
router.get('/events/:googleID', medicine.getEvents);
router.get('/single/:medicineID', medicine.getMedicine);

module.exports = router;
