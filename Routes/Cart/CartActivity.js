const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Users, Cart, Session } = require("../../Schema/CustomerSchema");
const RestaurantInfo = require("../../Schema/RestaurantSchema");
const RestaurantsMenu = require("../../Schema/RestaurantMenuSchema");

router.post("/addtocart", async (req, res) => {
  const isvalid = jwt.verify(req.headers.authorization, "secret");
  if (isvalid) {
    console.log(req.body.addItem);
    const itemList = await RestaurantsMenu.find({ _id: req.body.item._id });
    const qauntity = req.body.addItem + 1;
    const cartItem = {
      usrid: isvalid.uid,
      itemid: req.body.item._id,
      qauntity: qauntity,
    };

    console.log(cartItem);
  }
});

module.exports = router;
