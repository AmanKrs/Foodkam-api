const express = require("express");
const router = express.Router();
// const SendOtp = require('sendotp');
// const textflow = require("textflow.js");

// textflow.useKey(
//   "rbIbf5jXBcUmNFcxgk3v556tzcPkbu0vXoSaG7uSaOiMDw95j5iwnnQv47fSJEJZ"
// );
// const Validator = require("../Middleware/Validator");
// const ValidatorSignup = require("../Middleware/validateSignup");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Users = require("../../Schema/CustomerSchema");

router.post("/signup", async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  console.log(req.body);

  const finduser = await Users.find({ phone: req.body.phone });

  if (finduser.length !== 0) {
    console.log("finduser", finduser.length);
    res.status(400).send({ msg: "User Already Present" });
  } else {
    const user = new Users(req.body);
    const addUser = await user.save();

    if (addUser) {
      res.status(200).send({ msg: "User Register Successfully" });
    } else {
      res.status(403).send({ msg: "Unable to Register User " });
    }
  }

  res.end();
});
// router.post("/sendotp", async (req, res) => {
//   const { firstName, lastName, phone, email, password } = req.body;
//   console.log("verifyOTP", req.body);
//   let result = await textflow.sendSMS(phone, "your OTP ... 321345");
//   if (result.ok) {
//     console.log("SUCCESS");
//   }
// });
router.post("/login", async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  const userOne = await Users.findOne({ phone: req.body.phone });

  if (userOne) {
    const userData = {
      uid: userOne._id,
      phone: userOne.phone,
      firstName: userOne.firstName,
      lastName: userOne.lastName,
      email: userOne.email,
    };
    if (password == userOne.password) {
      const token = jwt.sign(userData, "secret");
      res.status(200).send({ token: token });
    } else {
      res.status(401).send({ msg: "password is incorrect" });
    }
  } else {
    res.status(403).send({ msg: "Please register user doesn't exist" });
  }
  res.end();
});

module.exports = router;
