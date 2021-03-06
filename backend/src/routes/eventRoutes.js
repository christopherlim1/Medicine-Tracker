const express = require('express');
const router = express.Router();

const event = require('../controllers/event.js');

// router.get('/:googleID', event.getEvent);
// router.post('/:googleID', event.createEvent);
// router.delete('/delete/:eventID', event.deleteEvent);
router.put('/update/:googleID/:eventID', event.updateEvent);

module.exports = router;