const express = require("express");
const router = express.Router();
// const Validator = require("../Middleware/Validator");
// const ValidatorSignup = require("../Middleware/validateSignup");
const jwt = require("jsonwebtoken");
// const data = require("../database");
const mongoose = require("mongoose");
const RestaurantInfo = require("../../Schema/RestaurantSchema");

router.post("/register", async (req, res) => {
  const {
    resName,
    address,
    resnumber,
    resowner,
    password,
    resopentime,
    resclosetime,
    restype,
    cuisine,
  } = req.body;


  const findRestaurant = await RestaurantInfo.find({
    resnumber: req.body.resnumber,
  });

  if (findRestaurant.length !== 0) {

    res.status(400).send({ msg: "Restaurant Already Present" });
  } else {
    const Restaurant = new RestaurantInfo(req.body);
    const addRestaurant = await Restaurant.save();

    if (addRestaurant) {
      res.status(200).send({ msg: "Restaurant Register Successfully" });
    } else {
      res.status(403).send({ msg: "Unable to Register Restaurant " });
    }
  }

  res.end();
});

router.post("/login", async (req, res) => {
  const {
    resName,
    address,
    resnumber,
    resowner,
    password,
    resopentime,
    resclosetime,
    restype,
    cuisine,
  } = req.body;

  const RestaurantExist = await RestaurantInfo.findOne({
    resnumber: req.body.resnumber,
  });
  
  if (RestaurantExist) {
    const resturantData = {
      resid: RestaurantExist._id,
      resnumber: RestaurantExist.resnumber,
      resName: RestaurantExist.resName,
      resowner: RestaurantExist.resowner,
      address: RestaurantExist.address,
      resopentime: RestaurantExist.resopentime,
      resclosetime: RestaurantExist.resclosetime,
      restype: RestaurantExist.restype,
      cuisine: RestaurantExist.cuisine,
    };
    if (password == RestaurantExist.password) {
      const token = jwt.sign(resturantData, "resSecret");
      res.status(200).send({ token: token });
    } else {
      res.status(401).send({ msg: "password is incorrect" });
    }
  } else {
    res.status(403).send({ msg: "Please register Restaurant doesn't exist" });
  }
  res.end();
});

module.exports = router;
