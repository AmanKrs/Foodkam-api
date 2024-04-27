const express = require("express");
const router = express.Router();
const RestaurantsMenu = require("../../Schema/RestaurantMenuSchema");
const RestaurantInfo = require("../../Schema/RestaurantSchema");
const jwt = require("jsonwebtoken");

router.post("/addmenu", async (req, res) => {
  const isvalid = jwt.verify(req.headers.authorization, "resSecret");
  if (isvalid) {
    const {
      itemname,
      quantity,
      category,
      description,
      itempic,
      itemtype,
      itemprice,
    } = req.body;

    const menuItem = {
      itemId: Math.ceil(Math.random() * 10000),
      resId: isvalid.resid,
      category: category,
      itemname: itemname,
      quantity: quantity,
      description: description,
      itempic: itempic,
      itemtype: itemtype,
      itemprice: itemprice,
    };

    const addMenuItem = new RestaurantsMenu(menuItem);

    const menuItemAdded = await addMenuItem.save();

    if (menuItemAdded) {
      const menuList = await RestaurantsMenu.find({ resId: req.body.id });
      res.status(200).send({ msg: "menuItem added", menuList });
    } else {
      res.status(403).send({ msg: "Error menuItem not added" });
    }
  } else {
    res.status(403).send({ msg: "Please register Restaurant doesn't exist" });
  }

  res.end();
});

router.post("/getmenulist", async (req, res) => {
  const isvalid = jwt.verify(req.headers.authorization, "resSecret");
  if (isvalid) {
    const menuList = await RestaurantsMenu.find({ resId: isvalid.resid });

    res.status(200).send(menuList);
  }
});

router.post("/getRestaurantInfo", async (req, res) => {
  const isvalid = jwt.verify(req.headers.authorization, "secret");
  console.log(isvalid);
  if (isvalid) {
    const resinfo = await RestaurantInfo.findOne({ _id: req.body.id });

    if (resinfo) {
      res.status(200).send({ resinfo });
    } else {
      res.status(404).send({ message: " cannot connect to restaurants" });
    }
  }

  console.log("req", req.body.id);
});

router.post("/getItems", async (req, res) => {
  let resId = req.body.id;

  console.log("req", req.body.id);
  const Starter = await RestaurantsMenu.find({
    resId: req.body.id,
    category: "starter",
  });
  const Chinese = await RestaurantsMenu.find({
    resId: req.body.id,
    category: "chinese",
  });
  const Main_Course = await RestaurantsMenu.find({
    resId: req.body.id,
    category: "Main Course",
  });
  const Dessert = await RestaurantsMenu.find({
    resId: req.body.id,
    category: "dessert",
  });
  const Breads = await RestaurantsMenu.find({
    resId: req.body.id,
    category: "breads",
  });
  const Rice = await RestaurantsMenu.find({
    resId: req.body.id,
    category: "rice",
  });
  const Biryani = await RestaurantsMenu.find({
    resId: req.body.id,
    category: "biryani",
  });
  const Beverages = await RestaurantsMenu.find({
    resId: req.body.id,
    category: "beverages",
  });

  res
    .status(200)
    .send([
      { Starter },
      { Chinese },
      { Main_Course },
      { Breads },
      { Rice },
      { Biryani },
      { Dessert },
      { Beverages },
    ]);
});

module.exports = router;
