const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Users, Cart, Session } = require("../../Schema/CustomerSchema");
const RestaurantInfo = require("../../Schema/RestaurantSchema");
const RestaurantsMenu = require("../../Schema/RestaurantMenuSchema");

router.post("/addtocart", async (req, res) => {
  const isvalid = jwt.verify(req.headers.authorization, "secret");
  if (isvalid) {
    // console.log(req.body.addItem);
    const itemList = await RestaurantsMenu.find({ _id: req.body.item._id });
    // console.log(itemList);
    const quantity = req.body.addItem + 1;

    const cart_for_user = await Cart.findOne({
      user_id: isvalid.uid,
      item_id: req.body.item._id,
    });
    console.log("check cart exist", cart_for_user);
    if (cart_for_user) {
      const updateCartItem = await Cart.findOneAndUpdate(
        { user_id: isvalid.uid, item_id: req.body.item._id },
        { quantity: quantity }
      );
    } else {
      const cartItem = {
        user_id: isvalid.uid,
        item_id: req.body.item._id,
        quantity: quantity,
      };

      const addnewItem = new Cart(cartItem);

      const addItem_cart = await addnewItem.save();
      if (addItem_cart) {
        console.log(cartItem);
      }
    }
  }
});



router.post("/removeCartItem", async (req, res) => {
  const isvalid = jwt.verify(req.headers.authorization, "secret");
  if (isvalid) {
    const quantity = req.body.addItem - 1;
    console.log("remove quantity", quantity);
    const cart_for_user = await Cart.findOne({
      user_id: isvalid.uid,
      item_id: req.body.item._id,
    });
    // console.log("check cart exist", cart_for_user);
    if (cart_for_user) {
      const removeItem = await Cart.findOneAndUpdate(
        { user_id: isvalid.uid, item_id: req.body.item._id },
        { quantity: quantity }
      );

      console.log(removeItem);
    }
  }
});

module.exports = router;
