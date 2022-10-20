const mongoose = require("mongoose");
const constants = require("../utis/constants");


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true

    },
    age:{
        type: Number,
        required: true

    },
    pincode:{
        type: Number,
        required: true
    },
    aadhar_No:{
        type: Number,
        required: true,
        unique: true

    },
    userType: {
        type: String,
        default: "user"
    },
    slotsBooked: {
        type:[mongoose.SchemaTypes.ObjectId],
        ref: "slots"
    },
    doseBooked: {
        type: String,
        required: true,
        enum: [constants.doseTypes.firstDose, constants.doseTypes.secondDose, constants.doseTypes.no],
        default: "no"
    },
    doseTaken: [{
        type: String,
        enum: [constants.doseTypes.firstDose, constants.doseTypes.secondDose]
            
    }
    ]
})


module.exports = mongoose.model("user", userSchema)