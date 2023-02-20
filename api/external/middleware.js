const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{ 
    try {
    console.log(req.headers);
    let token =  req.headers.token;
        console.log(token,"token");
    let decoded = jwt.verify(token,'billtracker');
    console.log(decoded,"decoded token")
    req.userId = decoded.user;
     next();        
    } catch (error) {
        console.log(error,"error in middleware")
    }  
        
}
module.exports = {authMiddleware};