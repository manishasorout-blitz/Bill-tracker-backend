const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createuser,
  findUserByEmail,
  findUserForLogin,
  createUser,
} = require("../../dao/user.js");
const { User } = require("../../models/usermodel.js");

//create user
const createUserForSignUp = async (req, res) => {
  console.log("create function called");
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    contact_number: contactNumber,
  } = req.body;

  try {
    //validation
    if (
      !firstName ||
      !firstName ||
      !email ||
      !firstName ||
      !password 
     
    ) {
      throw new Error("Firstname,lastname,email,contactnumber are mandatory");
    }
    const exsistingUser = await findUserByEmail(email);
    if (exsistingUser.length > 0) {
      throw new Error("user already exist");
    }
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password.toString(), 6, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });    
    await createUser({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      contact_number: contactNumber,
    });
    res.status(200).send({ message: "user successfully signup" });
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong");
  }
};


//loginuser
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existingUser = await findUserForLogin(email);
    if (existingUser.length > 0) {
      bcrypt.compare(
        password.toString(),
        existingUser[0].password,
        (err, result) => {
          if (result) {
            let token = jwt.sign({ user: existingUser[0]._id }, "billtracker");
            res.send({ message: "successfully login", token: token });
          } else {
           throw new Error("Wrong Credentials");
          }
        }
      );
    } else {
      res.send("wrong credentials");
    }
  } 
  catch (error) {
    console.log(error);
    res.status(404).send({message:"Wrong credentials"})
  }
};

router.post("/login", loginUser);
router.post("/signup", createUserForSignUp);

module.exports = router;
