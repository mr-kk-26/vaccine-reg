const Slots = require("../models/slots.model");

exports.registeredSlots = async (req, res)=>{

    try{

         // validating admin or not

        if(req.body.name != "admin"){
            return res.status(401).send({
                message: "unauthorized"
            })
        }

    let query = {};
    if(req.query.date){
        const d = new Date(req.query.date);
        query["date"] = d.toDateString();
    }
    if(req.query.firstDoseMin){
        query["firstDose"] = {
            "$gt": parseInt(req.query.firstDoseMin)
            
        }
    }
    if(req.query.firstDoseMax){
        query["firstDose"] = {
            "$lt": parseInt(req.query.firstDoseMax)
        }
    }
    if(req.query.secondDoseMin){
        query["secondDose"] = {
            "$gt": parseInt(req.query.secondDoseMin)
        }
    }
    if(req.query.secondDoseMax){
        query["secondDose"] = {
            "$lt": parseInt(req.query.secondDoseMax)
        }
    }
    
    console.log(query);
    if(Object.keys(query).length <= 0){
        return res.status(400).send({
            
            message: "NOT FOUND!"
        })
    }
    
    let slots = await Slots.find(query)
    if(slots.length >= 1){
        slots = slots.map(s =>{ return res.status(200).send(slots)})
    }else{
        res.status(400).send({
            message: "NOT FOUND!"
        })
    }
        
   
    
}catch(err){
    console.log(err.message);
}
}   