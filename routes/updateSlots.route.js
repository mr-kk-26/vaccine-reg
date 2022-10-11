/**
 * 
 * --- this route is used for updating the slots booked by 
 *         the user only  24 hours prior to his registered slot time
 *
 */

const updateController = require("../controllers/slotsUpdate.controller");
const {authJwt} = require("../middlewears")

module.exports = (app)=>{
    app.put("/vr/api/v1/slots/update/:_id",[authJwt.verifyToken], updateController.updateSlots)
}