const User = require("../models/user.model");


const validateSignup = async (req, res, next)=>{
    
    // checking the name is provided or not

    if(!req.body.name){
        return res.status(400).send({
            message: "Name is not provided"
        })
    }

    // checking the password is provided or not

    if(!req.body.password){
        return res.status(400).send({
            message: "password is not provided"
        })
    }

    // checking the password is provided or not

    if(!req.body.phoneNumber){
        return res.status(400).send({
            message: "phone number is not provided"
        })
    }

    // checking the age is provided or not

    if(!req.body.age){
        return res.status(400).send({
            message: "age is not provided"
        })
    }

    // checking the pincode is provided or not

    if(!req.body.pincode){
        return res.status(400).send({
            message: "pincode is not provided"
        })
    }

    /// checking the aadhar is provided or not

    if(!req.body.aadhar_No){
        return res.status(400).send({
            message: "aadhar No is not provided"
        })
    }

    try{

        // checking the phone number is already exist in db  or not

        const phoneNumber = await User.findOne({phoneNumber: req.body.phoneNumber})

        if(phoneNumber != null){
            return res.status(400).send({
                message: "Failed phone no already exists"
            })
        }
        
        // checking the aadhar number is already exist in db or not

        const aadhar_No = await User.findOne({aadhar_No: req.body.aadhar_No});

        if(aadhar_No != null){
            return res.status(400).send({
                message: "Failed Aadhar no already exists"
            })
        }

        
    }catch(err){
        return res.status(500).send({
            message: "Internal server error while validating singup request"
        })
    }

    next()
}

const validateSignin = async (req, res, next)=>{

    // checking if the user is Admin

    if(req.body.name == "admin"){
        return next()
    }
    
    // checking if the password is provided or not

    if(!req.body.password){
        return res.status(400).send({
            message: "password is not provided"
        })
    }

    // checking if the phone number is provided or not

    if(!req.body.phoneNumber){
        return res.status(400).send({
            message: "phone no not provided"
        })
    }
    next();
}

module.exports = {
    validateSignup,
    validateSignin
}