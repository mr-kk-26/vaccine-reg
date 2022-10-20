const User = require("../models/user.model");


exports.getAllUsers = async (req, res) => {
    try{

        // validating admin or not

        if(req.body.name != "admin"){
            return res.status(401).send({
                message: "unauthorized"
            })
        }

    let query = {}
    if (req.query.age) {
        query['age'] = req.query.age
    }
    
    if (req.query.pincode) {
        query["pincode"] = req.query.pincode.toString();
    }
    if (req.query.doseBooked) {
        query["doseBooked"] = req.query.doseBooked;
    }
    if (req.query.firstDose) {
        query["doseTaken"] = [req.query.firstDose]
    }
    if (req.query.secondDose){
        query["doseTaken"] = [req.query.secondDose]
    }

    console.log(query);
  
    let users = await User.find(query);
    
    
    users = users.map(u => { return { _id: u._id, name: u.name, phoneNumber: u.phoneNumber, age: u.age, aadhar_No: u.aadhar_No, slotsBooked: u.slotsBooked, doseBooked: u.doseBooked, doseTaken: u.doseTaken } })
    return res.status(200).send(users)

}catch(err){
    console.log(err.message);
}
}


