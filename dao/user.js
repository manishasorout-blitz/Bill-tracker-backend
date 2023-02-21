const { User } = require("../models/usermodel");

/**
 * 
 * @param {*} body 
 * @returns 
 */


const createUser=async(body)=>{   
  console.log(body);
   return await User.create(body);
}

const findUserByEmail=async({email,contact_number})=>{
  console.log(email,"line 7");
  return await User.find({$or:[{email},{contact_number}]});
}

const findUserForLogin=async(email)=>{
  console.log(email,"line 11")
  return await User.find({email});
}

module.exports={
  createUser,
 findUserForLogin,
 findUserByEmail

}
