/**
 * 
 * ------ route logic for getting all the users only for Admin based on some filters also
 * 
 */

const {authJwt} = require("../middlewears");
const UsersController = require("../controllers/getAllUsers.controller")


module.exports = (app)=>{
    
    app.get("/vr/api/v1/users/getUsers",[authJwt.verifyToken], UsersController.getAllUsers)
}


//?age=25
//?pincode=20202
//?doseBooked=first+dose
//?doseTaken=firstDose
//?doseTaken=secondDose