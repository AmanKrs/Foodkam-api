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
      categoryMenu: {
        itemname: itemname,
        quantity: quantity,
        description: description,
        itempic: itempic,
        itemtype: itemtype,
        itemprice: itemprice,
      },
      
    };

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
  const isvalid = jwt.verify(req.headers.authorization, "resSecret");
  if (isvalid) {
    const menuList = await RestaurantsMenu.find({ resId: isvalid.resid });

    res.status(200).send(menuList);
  }
});

router.post("/getItems", async (req, res) => {
  const isvalid = jwt.verify(req.headers.authorization, "secret");
  if (isvalid) {
    const menuList = await RestaurantsMenu.find({ resId: req.body.id });
    const resinfo = await RestaurantInfo.findOne({ _id: req.body.id });
    res.status(200).send({menuList,resinfo});
  }

  console.log("req", req.body.id);
});

module.exports = router;
