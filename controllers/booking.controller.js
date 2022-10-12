
/**
 *   this file will contain the logic
 *   for the bookings of slots by user
 *   
 */



const User = require("../models/user.model");
const slotModel = require("../models/slots.model")



exports.booking = async (req, res)=>{

    try{
        // fetching the slot by id form params
    const slot = await slotModel.findOne({_id : req.params._id});

    if(slot){
        
        let user =  await User.findOne({_id: req.userId});
        user.slotsBooked.push(slot._id);
        user.doseBooked = req.body.doseBooked
        await user.save();

        slot.availableSlots = slot.availableSlots-1;
        
        if(user.doseBooked == "second dose"){
            slot.secondDose = slot.secondDose+1
        }
        
        if(user.doseBooked == "first dose"){
            slot.firstDose = slot.firstDose+1
        }
        slot.userBooked.push(user._id)
        
        
        slot.save();
        
        console.log(slot)
        console.log(user);

    }
    res.status(200).send({
        message: "slot booked sucessfully",
        slotId: slot._id
    })
}catch(err){
    console.log(err.message);
    return res.status(500).send("internal server error")
}
}