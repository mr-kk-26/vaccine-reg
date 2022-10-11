const Slots = require("../models/slots.model");
const User = require("../models/user.model");
const constants = require("../utis/constants");




const validateBooking = async (req, res, next)=>{
    
    // checking if the id of the slot is provided or not in the req.params
    
    if(!req.params._id){
        res.status(500).send({
            message: "slotId is not provided in params"
        })
    }

    // checking if the dose is provided or not in the req.body
    
    if(!req.body.dose){
        res.status(500).send({
            message: "dose is not mentioned "
        })
    }

    // fetching the slot from the DB based on it's id

    let slot = await Slots.findOne({_id: req.params._id});

    // checking  the slot is available or not

    if(slot.availableSlots <= 0){
        res.status(400).send({
            message: "slot is not available"
        })
    }
    

    let user = await User.findOne({_id: req.userId})

    // checking  the user is already vaccinated or not for the first dose

    if(user.doseTaken.firstDose == constants.doseTypes.firstDose && req.body.dose == constants.doseTypes.firstDose){
        res.status(400).send({
            message: "First dose already taken"
        })
    }

    // checking the user is already booked the slot
    if(user.slotsBooked.length > 1){
        res.status(400).send({
            message: "already slot booked"
        })
    }

    // checking  the user is already vaccinated or not for the second dose

    if(user.doseTaken.secondDose == constants.doseTypes.secondDose && req.body.dose == constants.doseTypes.secondDose){
        res.status(400).send({
            message: "Second dose already taken"
        })
    }


   
    // ichecking the user is taken first dose or not before booking him a slot for second dose

    if(req.body.doseBooked == constants.doseTypes.secondDose && user.doseTaken.firstDose != constants.doseTypes.firstDose){
        res.status(500).send({
            message: "you have not taken first dose"
        })
    }



    // If the slot booked date is completed the user will be automatically considered as vaccinated

    let date = new Date();
        date.setDate(date.getDate()+1)
    if(slot.date < date.toDateString()){
        if(slot.doseBooked == constants.doseTypes.firstDose){
            user.doseTaken.push("first dose")
        }
        if(slot.doseBooked == constants.doseTypes.secondDose){
            user.doseTaken.push("second dose")
        }
    }
    
    next()
}

module.exports = {
    validateBooking
}