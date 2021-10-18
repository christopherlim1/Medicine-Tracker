const express = require('express');
const router = express.Router();

const customer = require('../controllers/customer.js');

router.post('/', customer.createCustomer);

module.exports = router;
