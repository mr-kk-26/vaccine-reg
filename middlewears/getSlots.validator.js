const Slots = require("../models/slots.model");


const validateGetSlots = async (req, res, next)=>{

    const date = req.params.date;

    if(!date){
        res.status(500).send({
            message: "date is not provided in params"
        })
    }

    next();
    
}

module.exports={
    validateGetSlots
}