const express = require('express');
const router = express.Router();

const customer = require('../controllers/customer.js');

router.get('/:googleID', customer.getCustomer);
router.post('/:googleID', customer.createCustomer);

module.exports = router;
