const CustomerInfo = require('../models/customerInfo.js');
const MedicineInfo = require('../models/medicineInfo.js');

// GET /medicine/:googleID
exports.getMedicine = async (req, res) => {
    const googleID = req.params.googleID;
    const myMedicine = await MedicineInfo.find({googleID: googleID});
    if(myMedicine.length > 0) {
        res.status(200).json(myMedicine);
    } else {
        res.status(404).send();
    }
};

// POST /medicine/:googleID
exports.createMedicine = async (req, res) => {
    try {
        const googleID = req.params.googleID;
        const newMedicine = new MedicineInfo(req.body);
        newMedicine['googleID'] = googleID;
        createEvents(newMedicine); // Create events for medicine
        await newMedicine.save();
        res.status(201).json(newMedicine);
    } catch(error) {
        res.status(409).json({message: error.message});
    }
};

// DELETE /medicine/delete/:medicineID
exports.deleteMedicine = async (req, res) => {
    await MedicineInfo.findByIdAndRemove(req.params.medicineID);
    res.status(200).send('Medicine is Deleted');
};

// UPDATE /medicine/update/:id
exports.updateMedicine = async (req, res) => {
    const Medicine = await MedicineInfo.findById(req.params.medicineID);
    Medicine.name = req.body.name;
    Medicine.description = req.body.description;
    Medicine.frequency = Number(req.body.frequency);
    Medicine.doses = Number(req.body.doses);
    Medicine.totalAmount = Number(req.body.totalAmount);
    Medicine.save();
    res.status(201).json(Medicine);
};

// CREATE events for medicine
createEvents = async (medicine) => {

    // Alternative: add a startDate to medicine.
    // This implementation will create events based
    // on the current date.
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 10);


    for(let i = 0; i < medicine.totalAmount; i++) {
        const event = {
            title: medicine.name,
            allDay: false,
            start: startDate,
            end: endDate,
        };
        medicine.events.push(event);
        startDate.setDate(startDate.getDate()+medicine.frequency);
        endDate.setDate(endDate.getDate()+medicine.frequency);
    }
    console.log(medicine.events); // For debugging
};

// Delete events for medicine
deleteEvents = async (medicine) => {
    // Delete events for medicine
    medicine.events = [];
    medicine.save();
}