// const EventInfo = require('../models/eventInfo.js');
const MedicineInfo = require('../models/medicineInfo.js');

// // GET /event/:googleID
// exports.getEvent = async (req, res) => {
//     const googleID = req.params.googleID;
//     const myEvent = await EventInfo.find({googleID: googleID});
//     if(myEvent.length > 0) {
//         res.status(200).json(myEvent);
//     } else {
//         res.status(404).send();
//     }
// };

// // POST /event/:googleID
// exports.createEvent = async (req, res) => {
//     try {
//         const googleID = req.params.googleID;
//         const newEvent = new EventInfo(req.body);
//         newEvent['googleID'] = googleID;
//         await newEvent.save();
//         res.status(201).json(newEvent);
//     } catch(error) {
//         res.status(409).json({message: error.message});
//     }
// };

// // DELETE /event/:eventID
// exports.deleteEvent = async (req, res) => {
//     await EventInfo.findByIdAndRemove(req.params.eventID);
//     res.status(200).send('Event is Deleted');
// };



// UPDATE /v0/event/update/:medicineID/:eventID
exports.updateEvent = async (req, res) => {
    console.log(req.params.medicineID);
    console.log(req.params.eventID);
    const Medicine = await MedicineInfo.findById(req.params.medicineID);
    let eventsArray = Medicine['events'];
    let event = {};
    for(let i = 0; i < eventsArray.length; i++) {
        if(eventsArray[i]['id'] == req.params.eventID) {
            event = eventsArray[i];
            eventsArray[i]['taken'] = req.body.taken;
        }
    }
    Medicine.events = eventsArray;
    Medicine.save();
    // console.log(Medicine.events);
    res.status(201).json(event);
};