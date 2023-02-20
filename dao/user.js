const { User } = require("../models/usermodel");
const createuser=async(body)=>{   
  console.log(body);
   return   await User.create(body);
}
const findUserByEmail=(email)=>{
  //console.log(email,"line 7");
  return User.find({email});
}
const findUserForLogin=async(email)=>{
  console.log(email,"line 11")
  return await User.find({email});
}

module.exports={
 createuser,
 findUserForLogin,
 findUserByEmail

}
