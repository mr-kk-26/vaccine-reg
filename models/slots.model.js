const mongoose = require("mongoose");

//slots(document)
//
const slotSchema = new mongoose.Schema({
  date: String,
  time: String,
  availableSlots: Number,
  firstDose: {
    type: Number
  },
  secondDose: {
    type: Number
  },
  userBooked: [{
    type: String
}]
},{versionkey : false});

const slotModel = mongoose.model("slot", slotSchema);
module.exports = slotModel