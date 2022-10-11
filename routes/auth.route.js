/*
--- this file will contains the logic about routing request

--- this file is dedicated to the routing logic for signup  and signin
*/




const authController = require("../controllers/auth.controller");
const {verifySign} = require("../middlewears");


module.exports = (app)=>{
    app.post("/vr/api/v1/auth/signup",[verifySign.validateSignup], authController.signup);
    app.post("/vr/api/v1/auth/signin",[verifySign.validateSignin], authController.signin);
}