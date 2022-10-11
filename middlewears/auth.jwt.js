
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const User = require("../models/user.model");



const verifyToken = (req, res, next) => {

  const token = req.headers["x-access-token"];

  // check if the token is present
  if(!token){
    return res.status(403).send({
      message : "No token provided ! Access prohibited"
    })
  }


  // Go and validate the token
jwt.verify(token, authConfig.secret, (err, decoded) =>{
  if(err){
    return res.status(401).send({
      message : "UnAuthorized ! "
    })
  }
  req.userId = decoded.id; // I am taking the user Id from token and setting it in request object
  next();
})

  // Read the value of the user id from the token and set it in the request
  // for furture use


}





const authJwt = {
  verifyToken : verifyToken

};

module.exports = authJwt
