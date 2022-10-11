const Slots = require("../models/slots.model");

exports.registeredSlots = async (req, res)=>{

    try{
    if(req.body.name != "admin"){
        res.status(401).send({
            message: "only admin have previllages"
        })
    }
    if(req.body.password != "admin"){
        res.status(401).send({
            message: "only admin have previllages"
        })
    }
    let query = {};
    if(req.query.date){
        const d = new Date(req.query.date);
        query["date"] = d.toDateString();
    }
    if(req.query.firstDose){
        query["firstDose"] = req.query.firstDose
    }
    if(req.query.secondDose){
        query["secondDose"] = req.query.secondDose
    }

    let slots = await Slots.find(query).exec();
    slots = slots.map(s =>{ return res.status(200).send(slots)})
}catch(err){
    console.log(err.message);
}
}