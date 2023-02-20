const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { createuser, findUserByEmail, findUserForLogin } = require("../../dao/user.js");
const { User } = require("../../models/usermodel.js");

//functions

const createuserfxn = async (req, res) => {
    const { first_name, password, last_name, email, contact_number } = req.body;
    const new_password=password.toString();
    bcrypt.hash(new_password, 5, async(err, securepass)=> {    
  try {     
     const user = await findUserByEmail(email);  
      console.log(user,"line 14")
    if (user.length > 0) {
           res.send("user already exits");
    } else {
      await createuser({
        first_name,
        password:securepass,
        last_name,
        email,
        contact_number,
      });
      res.send("successfully registered");
    }
  } catch (error) {
    //console.log(error, "line 17");
    res.status(404).send({
      message: "some error occurerd in signup with user",
    });
  }
})
};
const loginfxn=async(req, res) => {    
    const {email,password}=req.body;   
    try {
       const user=await User.find({email})
    if(user.length>0){          
        bcrypt.compare(password.toString(),user[0].password,(err,result)=>{
            if(result){
              let token=jwt.sign({ user:user[0]._id},'billtracker');             
              res.send({message:"successfully login","token":token});               
            }else{
              res.send("wrong crendentials");
              // console.log(err);
            }
        })
    } else {
      res.send("wrong credentials")
    } 
      } catch (error) {
        // console.log(error);
      }}

    
//post request for login
router.post("/login", loginfxn);

//request for signup

router.post("/signup", createuserfxn);

module.exports = router;
