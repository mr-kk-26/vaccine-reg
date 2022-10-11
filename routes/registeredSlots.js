
const registeredSlots = require("../controllers/registeredSlots.controller")

module.exports = (app)=>{
    
    app.get("/vr/api/v1/slots", registeredSlots.registeredSlots)
}