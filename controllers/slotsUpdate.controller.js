
const User = require("../models/user.model");
const Slots = require("../models/slots.model");
const constants = require("../utis/constants")

exports.updateSlots = async (req, res)=>{

    try{
    
        const slot = await Slots.findOne({_id : req.params._id});

        // this code checks if the slot is still before one day before to update
        
        let date = new Date();
        date.setDate(date.getDate()+1)

        if(slot.date >= date.toDateString()){
        
        // undoing all the previous bookings

    let user = User.findOne({_id: req.userId});

        slot.availableSlots = slot.availableSlots+1
        if(user.doseBooked == "first dose"){
            slot.firstDose = slot.firstDose-1
        }
        if(user.doseBooked == "second dose"){
            slot.secondDose = slot.secondDose-1
        }

    user.slotsBooked = [];
    user.doseBooked = "no";
    await user.save();
    

   
    }

      // ichecking the user is taken first dose or not before booking him a slot for second dose
      let user = User.findOne({_id: req.userId})
      if(req.body.doseBooked == constants.doseTypes.secondDose && !user.doseTaken){
        res.status(500).send({
            message: "you have not taken first dose"
        })
    }

         //  creating new Booking
        
        
        user.slotsBooked.push(slot._id);
        user.doseBooked = req.body.doseBooked ? req.body.doseBooked : "no"
        await user.save();

        slot.availableSlots = slot.availableSlots-1;
        if(user.doseBooked == "first dose"){
            slot.firstDose = slot.firstDose+1
        }
        if(user.doseBooked == "second dose"){
            slot.secondDose = slot.secondDose+1
        }
        await slot.save();

    res.status(200).send({
        message: "slot booked sucessfully",
        slotId: slot._id,
    })

}catch(err){
    console.log(err.message);
    res.status(400).send({
        message: "some internal error updating the slot"
    })
}
}


    

    
   