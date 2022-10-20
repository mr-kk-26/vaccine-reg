
const registeredSlots = require("../controllers/registeredSlots.controller")

const {authJwt} = require("../middlewears");
module.exports = (app)=>{
    
    app.get("/vr/api/v1/registeredSlots",[authJwt.verifyToken], registeredSlots.registeredSlots)
}

//?date=2022-06-04
//?firstDoseMin=0
//?firstDoseMax=0
//?secondDoseMin=0
//?secondDoseMax=0