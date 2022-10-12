
const User = require("../models/user.model");
const Slots = require("../models/slots.model");
const constants = require("../utis/constants")

exports.updateSlots = async (req, res)=>{

    try{
    
        const slot = await Slots.findOne({_id : req.body.oldSlot});

        // this code checks if the slot is still before one day before to update
        
        let date = new Date();
        date.setDate(date.getDate()+1)

        if(slot.date >= date.toDateString()){
            return res.status(400).send({
                message: "Time limit exceeded to change the slot"
            })
        }
        // undoing all the previous bookings

    let user = await User.findOne({_id: req.userId});

        slot.availableSlots = slot.availableSlots+1
        if(user.doseBooked == "first dose"){
            slot.firstDose = slot.firstDose-1
        }
        if(user.doseBooked == "second dose"){
            slot.secondDose = slot.secondDose-1
        }
        slot.userBooked.forEach((item, index, arr) => {
            if (item == user._id) {
              arr.splice(index, 1);
            }
          });
        

    user.slotsBooked = [];
    user.doseBooked = "no";

    

   
    

      // checking the user is taken first dose or not before booking him a slot for second dose
    
      if(req.body.doseBooked == constants.doseTypes.secondDose && user.doseTaken.firstDose == "no"){
        res.status(500).send({
            message: "you have not taken first dose"
        })
    }

         //  creating new Booking
        let newSlot = await Slots.findOne({_id: req.body.newSlot})
        console.log("----------------", newSlot._id);
        user.slotsBooked.push(newSlot._id);
        user.doseBooked = req.body.doseBooked ? req.body.doseBooked : "no"
        

        newSlot.availableSlots = newSlot.availableSlots-1;
       
        if(user.doseBooked == "first dose"){
            newSlot.firstDose = newSlot.firstDose+1

        }
        if(user.doseBooked == "second dose"){
            newSlot.secondDose = newSlot.secondDose+1
            
        }
        newSlot.userBooked.push(user._id)
        await user.save()
        await slot.save()
        
  

    res.status(200).send({
        message: "slot booked sucessfully",
        slotId: newSlot._id,
    })


}catch(err){
    console.log(err.message);
    res.status(400).send({
        message: "some internal error updating the slot"
    })
}
}


    

    
   