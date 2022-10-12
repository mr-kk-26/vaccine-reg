
const registeredSlots = require("../controllers/registeredSlots.controller")

const {authJwt} = require("../middlewears");
module.exports = (app)=>{
    
    app.get("/vr/api/v1/slots",[authJwt.verifyToken], registeredSlots.registeredSlots)
}