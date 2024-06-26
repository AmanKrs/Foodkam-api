const express = require("express");
const router = express.Router();
const Validator = require("../../Middleware/loginValidator");
const resValidator = require("../../Middleware/registerValidator");
// const ValidatorSignup = require("../Middleware/validateSignup");
const jwt = require("jsonwebtoken");
// const data = require("../database");
const mongoose = require("mongoose");
const RestaurantInfo = require("../../Schema/RestaurantSchema");

router.post("/register",resValidator, async (req, res) => {
  
  const {
    resName,
    address,
    phone,
    resowner,
    password,
    resopentime,
    resclosetime,
    restype,
    cuisine,
    resprofilepic,
  } = req.body;

  const findRestaurant = await RestaurantInfo.find({
    phone: req.body.phone,
  });

  if (findRestaurant.length !== 0) {
    res.status(403).send({ msg: "Restaurant Already Present" });
  } else {
    const Restaurant = new RestaurantInfo(req.body);
    const addRestaurant = await Restaurant.save();

    if (addRestaurant) {
      res.status(200).send({ msg: "Restaurant Register Successfully" });
    } else {
      res.status(503).send({ msg: "Unable to Register Restaurant " });
    }
  }

  res.end();
});

router.post("/login", Validator, async (req, res) => {
  console.log(req.body);
  const {
    resName,
    address,
    phone,
    resowner,
    password,
    resopentime,
    resclosetime,
    restype,
    cuisine,
    resprofilepic,
  } = req.body;

  const RestaurantExist = await RestaurantInfo.findOne({
    phone: req.body.phone,
  });
 
  if (RestaurantExist) {
    const resturantData = {
      resid: RestaurantExist._id,
      phone: RestaurantExist.phone,
      resName: RestaurantExist.resName,
      resowner: RestaurantExist.resowner,
      address: RestaurantExist.address,
      resopentime: RestaurantExist.resopentime,
      resclosetime: RestaurantExist.resclosetime,
      restype: RestaurantExist.restype,
      cuisine: RestaurantExist.cuisine,
      resprofilepic: RestaurantExist.resprofilepic,
    };
    if (password == RestaurantExist.password) {
      const token = jwt.sign(resturantData, "resSecret");
      res.status(200).send({ token: token });
    } else {
      res.status(401).send({ msg: "username or password is incorrect" });
    }
  } else {
    res.status(403).send({ msg: "Please register Restaurant doesn't exist" });
  }
  res.end();
});

router.post("/getresturantDetails", async (req, res) => {
  const menuList = await RestaurantInfo.find();
  console.log(menuList);
  res.status(200).send(menuList);
});

module.exports = router;
