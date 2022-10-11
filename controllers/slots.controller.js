/**
 * ------- this file will contaion the logic to fetch the slots collection from the DB
 *  which are already created in DB maually
 * 
 */

const slotModel = require("../models/slots.model");


exports.slots = async (req, res)=>{
    try{
        const d = new Date(req.params.date);
        const slots = await slotModel.find({date: d.toDateString()});
        if(slots){
        res.status(200).send(slots)
        }
    }catch(err){
    console.log(err.message);
}

}



