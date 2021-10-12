const mongoose = require('mongoose');
const MedicineInfo = require('../models/medicineInfo.js');

exports.getMedicine = async (req, res) => {
    console.log("customer ID:", req.params.customer);
    res.status(200).json(
        [
            {
                "name": "Pfizer",
                "description": "Helps against COVID-19",
                "id": "17b0afb2-df3a-4047-a394-249817f3fe32"
            }
        ]
    );
    // try {
    //     const medicine = await MedicineInfo.find();
    //     res.status(200).json(medicine);
    // } catch(error) {
    //     res.status(404).json({message: error.messasge});
    // }
};

exports.createMedicine = async (req, res) => {
    const newMedicine = new MedicineInfo(req.body);
    try {
        await newMedicine.save();
        res.status(201).json(req.body);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
};

