/**
 * 
 * ------- logic for getting all the slots based on date
 */



const slotController = require("../controllers/slots.controller");
const {authJwt, getSlotsValidator} = require("../middlewears")


module.exports = (app) =>{
    app.get("/vr/api/v1/slots/:date",[authJwt.verifyToken, getSlotsValidator.validateGetSlots], slotController.slots);
}