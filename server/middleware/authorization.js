const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = function(req, res, next) {
  // Get token from header  
const jwtToken = req.header("token");

if(!jwtToken){
    return res.status(403).json("Not Authorized")
}
try{

const payload = jwt.verify(jwtToken,process.env.jwtSecret);
req.user = payload.user;
next();

}catch(err){
console.error(err.message);
 return  res.status(403).json("You are not Authorized");

}


}