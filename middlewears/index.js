/**
 * 
 *   ---- All middlewares will be exported form here
 */



const authJwt = require("./auth.jwt");
const bookingValidator = require("./booking.validator");
const getSlotsValidator = require("./getSlots.validator");
const verifySign = require("./verifySign");

module.exports = {
    authJwt,
    bookingValidator,
    getSlotsValidator,
    verifySign

}