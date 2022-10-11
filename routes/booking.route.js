
/**
 *  ---- Route logic for booking the slots
 * 
 */


const {authJwt, bookingValidator} = require("../middlewears")
const bookingController = require("../controllers/booking.controller");

module.exports = (app) =>{
    app.post("/vr/api/v1/slots/booking/:_id",[authJwt.verifyToken, bookingValidator.validateBooking], bookingController.booking)
}