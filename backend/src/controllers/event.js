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



// UPDATE /v0/event/update/:googleID/:eventID
exports.updateEvent = async (req, res) => {
    console.log(req.params.googleID);
    console.log(req.params.eventID);
    const googleID = req.params.googleID;
    const Medicine = await MedicineInfo.find({ googleID: googleID });
    let event = {};
    let index = 0;
    let eventsArray = [];
    for(let i = 0; i < Medicine.length; i++) {
        for(let j = 0; j < Medicine[i]['events'].length; j++) {
            if(Medicine[i]['events'][j]['id'] == req.params.eventID) {
                index = i;
                event = Medicine[i]['events'][j];
                Medicine[i]['events'][j]['taken'] = req.body.taken;
                eventsArray = Medicine[index].events;
            }
        }
    }
    // console.log(Medicine[index]);
    Medicine[index].events = [];
    Medicine[index].events = eventsArray;
    // console.log(Medicine[index]);
    Medicine[index].save();
    console.log(Medicine[index]);
    res.status(201).json(Medicine);
};