const CustomerInfo = require('../models/customerInfo.js');

// POST /customer/:googleID
exports.createCustomer = async (req, res) => {
    const newCustomer = new CustomerInfo();
    newCustomer['googleID'] = req.params.googleID;
    await newCustomer.save();
    res.status(201).json(newCustomer);
};

// GET /customer/:googleID
exports.getCustomer = async (req, res) => {
    const googleID = req.params.googleID;
    const customer = await CustomerInfo.find({googleID: googleID})
    if(customer[0] != undefined) {
        res.status(200).json(customer[0]);
    } else {
        res.status(404).send();
    }
}
