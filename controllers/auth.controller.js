

/**
 *   this file will contain the logic
 *   for the registration of the user and login
 *    of the user.
 */



const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const Slots = require("../models/slots.model");




/*
  ----- Logic to accept the registration and login

  req ---> what we get from the client
  res --> what we return from the server

*/

// logic to signup

exports.signup = async (req, res)=>{


    //   Converting into the JS objest for inserting in the mongoDB
    const userObj = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8), 
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
        pincode: req.body.pincode,
        aadhar_No: req.body.aadhar_No
    };

    try{
        // inserting the userObj into DB
        const userCreated = await User.create(userObj);

        // creating a response obj from the new user and it will be sent as response if sucessfully registerd

        const response = {
            name: userCreated.name,
            phoneNumber: userCreated.phoneNumber,
            age: userCreated.age,
            pincode: userCreated.pincode,
            aadhar_No: userCreated.aadhar_No

        }
        res.status(201).send(response);
    }catch(err){
        console.log("some error", err.message);
        res.status(500).send({
            message: "some internal error"
        })
    }
}


// logic to signin

exports.signin = async (req, res)=>{

    // checking wheater it is admin or not
    // if it is admin he first if statement will only be exicuted and returned

    try{
        if(req.body.name == "admin"){
            const admin = await User.findOne({name: req.body.name})

            if(req.body.password == admin.password){
                const token = jwt.sign({id: admin._id}, authConfig.secret,{expiresIn: 600})
        
               return res.status(201).send({
                    name: admin.name,
                    accessToken: token
                });
            }
        }

        // fetching the user from the db from the provided phone number

        const user = await User.findOne({phoneNumber: req.body.phoneNumber});
      



         


        // checking wheather the user registered or not

        if(user == null){
            return res.status(400).send({
                message: "failed! user doesn't exist"
            });
        }
        
        // validating the password

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        
        if(!isPasswordValid){
            return res.status(401).send({
                message: "wrong password"
            });
        }


        // If the slot booked date is completed the user will be automatically considered as vaccinated

        let date = new Date();
        date.setDate(date.getDate()+1)
        let slot = await Slots.findOne({slotsBooked :user.slotsBooked})
    if(slot.date < date.toDateString()){
        if(user.doseBooked == constants.doseTypes.firstDose){
            user.doseTaken.push("first dose");
            user.doseBooked = "no"
        }
        if(user.doseBooked == constants.doseTypes.secondDose){
            user.doseTaken.push("second dose");
            user.doseBooked = "no"
        }
        await user.save()
        
    }
        
        // creating a jwt token // after sucessful login jwt token provided by user is only used for further authorization
        
        const token = jwt.sign({id: user._id}, authConfig.secret,{expiresIn: 600})
        
        res.status(201).send({
            name: user.name,
            accessToken: token,
            slotsBooked: user.slotsBooked,
            doseBooked: user.doseBooked,
            doseTaken : user.doseTaken
        });



    }catch(err){
        console.log("internal error: ", err.message);
        res.status(500).send({
            message: "some internal error while signin"
        })
    }
}

