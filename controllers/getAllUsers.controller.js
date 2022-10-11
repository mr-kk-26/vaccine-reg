const User = require("../models/user.model");


exports.getAllUsers = async (req, res) => {
    if(req.body.name != "admin"){
        res.status(401).send({
            message: "only admin have previllages"
        })
    }
    if(req.body.password != "admin"){
        res.status(401).send({
            message: "only admin have previllages"
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
    if (req.query.doseTaken) {
        query["doseTaken"] = req.query.doseToken
    }
    let users = await User.find(query).exec();
    users = users.map(u => { return { _id: u._id, name: u.name, phoneNumber: u.phoneNumber, age: u.age, aadhar_No: u.aadhar_No, slotsBooked: u.slotsBooked, doseTaken: u.doseTaken } })
    return res.status(200).send(users)
}