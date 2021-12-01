const MedicineInfo = require("../models/medicineInfo.js");
const { v4: uuidv4 } = require('uuid');

// GET /medicine/:googleID
exports.getAllMedicine = async (req, res) => {
  const googleID = req.params.googleID;
  const myMedicine = await MedicineInfo.find({ googleID: googleID });
  if (myMedicine.length > 0) {
    res.status(200).json(myMedicine);
  } else {
    res.status(404).send();
  }
};

// GET /medicine/:medicineID
exports.getMedicine = async (req, res) => {
  const medicineID = req.params.medicineID;
  const myMedicine = await MedicineInfo.find({ '_id': medicineID });
  if (myMedicine.length > 0) {
    res.status(200).json(myMedicine);
  } else {
    res.status(404).send();
  }
};

// POST /medicine/:googleID
exports.createMedicine = async (req, res) => {
  try {
    const googleID = req.params.googleID;
    const newMedicine = new MedicineInfo(req.body); // Extract newMedicine from req.body
    const startDate = req.body.time; // Extract startDate from req.body
    newMedicine["googleID"] = googleID;  // Add googleID to newMedicine
    createEvents(newMedicine, startDate); // Create events for medicine
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE /medicine/delete/:medicineID
exports.deleteMedicine = async (req, res) => {
  await MedicineInfo.findByIdAndRemove(req.params.medicineID);
  res.status(200).send("Medicine is Deleted");
};

// UPDATE /medicine/update/:id
exports.updateMedicine = async (req, res) => {
  const Medicine = await MedicineInfo.findById(req.params.medicineID);
  Medicine.name = req.body.name;
  Medicine.description = req.body.description;
  Medicine.frequency = Number(req.body.frequency);
  Medicine.doses = Number(req.body.doses);
  Medicine.totalAmount = Number(req.body.totalAmount);
  Medicine.time = req.body.time;
  Medicine.events = [];
  createEvents(Medicine, req.body.time);
  Medicine.save();
  res.status(201).json(Medicine);
};

// GET /medicine/events/:googleID
exports.getEvents = async (req, res) => {
  const events = [];
  const googleID = req.params.googleID;
  const myMedicine = await MedicineInfo.find({ googleID: googleID });
  if (myMedicine.length > 0) {
    for (const med of myMedicine) {
      for (const event of med.events) {
        events.push(event);
      }
    }
    res.status(200).json(events);
  } else {
    res.status(404).send();
  }
};

// CREATE events for medicine
createEvents = async (medicine, date) => {
  // Alternative: add a startDate to medicine.
  // This implementation will create events based
  // on the current date.
  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + 15);

  for (let i = 0; i < medicine.totalAmount; i++) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const event = {
      id: uuidv4(),
      title: medicine.name,
      start: start,
      end: end,
      taken: false,
    };
    medicine.events.push(event);
    startDate.setDate(startDate.getDate() + medicine.frequency);
    endDate.setDate(endDate.getDate() + medicine.frequency);
  }
};
