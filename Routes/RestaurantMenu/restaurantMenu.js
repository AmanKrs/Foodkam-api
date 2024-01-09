const express = require("express");
const router = express.Router();
const RestaurantsMenu = require("../../Schema/RestaurantMenuSchema");
const jwt = require("jsonwebtoken");

router.post("/addmenu", async (req, res) => {
  console.log(req.headers.authorization);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNpZCI6IjY1OTVjZjgwODhlMmI1YTY1MWY5YTk5NCIsInJlc251bWJlciI6MTIzNDU2Nzg5MDEsInJlc05hbWUiOiJhbWFuIiwicmVzb3duZXIiOiJhc0BnLmNvbSIsImFkZHJlc3MiOiJrciIsInJlc29wZW50aW1lIjoiMTA6MzAiLCJyZXNjbG9zZXRpbWUiOiIyMDoyMSIsInJlc3R5cGUiOiJGb29kIFRydWNrIiwiY3Vpc2luZSI6IkNoaW5lc2UiLCJpYXQiOjE3MDQ4MzIyOTh9.10V1GW2TmOh4uPgeZWIIahIUd8g4lJU5_f-rBXOTb8o";
  const isvalid = jwt.verify(token, "resSecret");
  if (isvalid) {
    const {
     
      itemname,
      quantity,
      category,
      description,
      itempic,
      itemcuisine,
      itemprice,
    } = req.body;


    const menuItem ={
      itemId:Math.ceil(Math.random() * 10000),
      resId:isvalid.resid,
      itemname:itemname,
      quantity:quantity,
      category:category,
      description:description,
      itempic:itempic,
      itemcuisine:itemcuisine,
      itemprice:itemprice,
    }

    const addMenuItem = new RestaurantsMenu(menuItem);

  const menuItemAdded = await addMenuItem.save();

  if (menuItemAdded) {
    res.status(200).send({ msg: "menuItem added" });
  } else {
    res.status(403).send({ msg: "Error menuItem not added" });
  }

  } else {
    res.status(403).send({ msg: "Please register Restaurant doesn't exist" });
  }

  res.end();
});


router.post("/getmenulist", async (req, res) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNpZCI6IjY1OTVjZjgwODhlMmI1YTY1MWY5YTk5NCIsInJlc251bWJlciI6MTIzNDU2Nzg5MDEsInJlc05hbWUiOiJhbWFuIiwicmVzb3duZXIiOiJhc0BnLmNvbSIsImFkZHJlc3MiOiJrciIsInJlc29wZW50aW1lIjoiMTA6MzAiLCJyZXNjbG9zZXRpbWUiOiIyMDoyMSIsInJlc3R5cGUiOiJGb29kIFRydWNrIiwiY3Vpc2luZSI6IkNoaW5lc2UiLCJpYXQiOjE3MDQ4MzIyOTh9.10V1GW2TmOh4uPgeZWIIahIUd8g4lJU5_f-rBXOTb8o";
  const isvalid = jwt.verify(token, "resSecret");
  if (isvalid) {
  const menuList = await RestaurantsMenu.find({ resId: isvalid.resid });

  res.status(200).send(menuList);}
});

module.exports = router;
