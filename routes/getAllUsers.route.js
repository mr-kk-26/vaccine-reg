/**
 * 
 * ------ route logic for getting all the users only for Admin based on some filters also
 * 
 */


const UsersController = require("../controllers/getAllUsers.controller")


module.exports = (app)=>{
    app.get("/vr/api/v1/users/getUsers", UsersController.getAllUsers)
}