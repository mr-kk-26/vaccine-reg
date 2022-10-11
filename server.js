/**
 * 
 *    --------- This is going to be the starting point of the application
 */



const express = require("express");
const {PORT} = require("./configs/server.config");
const {DB_URL} = require("./configs/db.config");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")



// registering the bodyparser middleware

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//  initializing the  connection to the mongoDB

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", ()=>{
    console.log("Error while connecting to mongodb");
});
db.once("open", ()=>{
    console.log("connected to mongodb");
   
})

//  connecting routes to the server

require("./routes/auth.route")(app);
require("./routes/slots.route")(app);
require("./routes/booking.route")(app);
require("./routes/getAllUsers.route")(app);
require("./routes/updateSlots.route")(app);
require("./routes/registeredSlots")(app);


// for starting the server

app.listen(PORT, (err)=>{
    if(err){
        console.log("error server");
    }
    console.log(`server is running on PORT : ${PORT}`);
})