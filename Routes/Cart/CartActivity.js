const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Users, Cart, Session } = require("../../Schema/CustomerSchema");
const RestaurantInfo = require("../../Schema/RestaurantSchema");
const RestaurantsMenu = require("../../Schema/RestaurantMenuSchema");

// router.post("/addtocart", async (req, res) => {
//   //verifying the request comes from registeruser
//   const isvalid = jwt.verify(req.headers.authorization, "secret");
//   if (isvalid) {
//     console.log(req.body);

//     //const itemList = await RestaurantsMenu.find({ _id: req.body.item._id });

//     // setting the quantity of item adding to cart
//     let quantity = req.body.quantity + 1;
//     console.log("quantityfrom ui", quantity);

//     //checking item already exists in cart or not
//     const cart_for_user = await Cart.findOne({
//       user_id: isvalid.uid,
//       item_id: req.body.item._id,
//     });
//     console.log("check cart exist", cart_for_user);
//     //if item exists in cart then

//     if (cart_for_user) {
//       console.log("quantity before update", cart_for_user.quantity);
//       //updating the qauntity of item in cart
//       const updateCartItem = await Cart.findOneAndUpdate(
//         { user_id: isvalid.uid, item_id: req.body.item._id },
//         { quantity: quantity },
//         { new: true }
//       );

//       // check if item quantity updated, then update the shopping session of user
//       if (updateCartItem) {
//         //finding all item in cart for the user
//         const itemInCart = await Cart.find({ user_id: isvalid.uid });

//         //checking items for user is true then return all the items with id in array
//         if (itemInCart) {
//           let itemPrices = itemInCart.map(async (elem) => {
//             return {
//               prm: await RestaurantsMenu.findById(elem.product_id),
//               quant: elem.quantity,
//             };
//           });
//         }
//       }
//       console.log("updateCartItem", updateCartItem);
//       res.send({ cartItemDetail: updateCartItem });
//     }
//     // if item not exists in cart then
//     else {
//       const cartItem = {
//         user_id: isvalid.uid,
//         item_id: req.body.item._id,
//         quantity: quantity,
//       };

//       const addnewItem = new Cart(cartItem);

//       const addItem_cart = await addnewItem.save();
//       if (addItem_cart) {
//         console.log("addItem_cart", addItem_cart);
//         res.send({ cartItemDetail: addItem_cart });
//       }
//     }
//   }
// });

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
        { quantity: quantity },
        { new: true }
      );
      console.log("removeItem", removeItem);
      if (!quantity) {
        const delItem = await Cart.findOneAndDelete(
          { user_id: isvalid.uid, item_id: req.body.item._id },
          { quantity: quantity }
        );
      }
      console.log(removeItem);
    }
  }
});

router.post("/addtocart", async (req, res) => {
  //verifying the request comes from registeruser
  const isvalid = jwt.verify(req.headers.authorization, "secret");
  // const isvalid = req.body.user;
  if (isvalid) {
    // setting the quantity of item adding to cart
    let quantity = req.body.quantity + 1;
    //checking item already exists in cart or not
    const cart_for_user = await Cart.findOne({
      user_id: isvalid.uid,
      item_id: req.body.item._id,
    });

    //if item exists in cart then
    if (cart_for_user) {
      //updating the qauntity of item in cart
      const updateCartItem = await Cart.findOneAndUpdate(
        { user_id: isvalid.uid, item_id: req.body.item._id },
        { quantity: quantity },
        { new: true }
      );

      // check if item quantity updated, then update the shopping session of user
      if (updateCartItem) {
        //finding all item in cart for the user
        const itemInCart = await Cart.find({ user_id: isvalid.uid });
        //console.log(itemInCart);
        //checking items for user is true then return all the items with id in array
        if (itemInCart) {
          let itemPrices = itemInCart.map(async (elem) => {
            //console.log(elem);
            return {
              itemIncartDetail: await RestaurantsMenu.findById(elem.item_id),
              qauntOfItem: elem.quantity,
            };
          });

          console.log("itemPrices", itemPrices);
          //handling all promises occur at ones
          Promise.all(itemPrices).then(async (resp) => {
            console.log("itemPrices", resp);
            let orderTotal = 0;
            //setting the total added item cost
            resp.forEach((elem) => {
              console.log("elem", elem);
              orderTotal += elem.itemIncartDetail.itemprice * elem.qauntOfItem;
            });
            //updating order session for user
            const updateOrderSession = await Session.findOneAndUpdate(
              { user_id: isvalid.uid },
              { $set: { totalAmount: orderTotal } }
            );
            console.log("updateOrderSession:", updateOrderSession);
            if (updateOrderSession) {
              res.status(200).send({
                msg: "cart and Order session updated successfully",
                result: resp,
              });
            }
            console.log("orderTotal:", orderTotal);
            // res.send({ result: resp });
          });
        }
        //res.send({ cartItemDetail: updateCartItem });
      }
    }
    // if item not exists in cart then
    else {
      const cartItem = {
        user_id: isvalid.uid,
        item_id: req.body.item._id,
        quantity: quantity,
      };

      const addnewItem = new Cart(cartItem);
      //add new item in the cart
      const addItem_cart = await addnewItem.save();

      if (addItem_cart) {
        //once it is saved, find all the items in the cart for this user to get their prices and sum total of them to update in the order session
        const cartExist = await Cart.find({ user_id: isvalid.uid });

        if (cartExist) {
          let total = 0;

          let itemsInCart = cartExist.map(async (elem) => {
            return {
              itemIncartDetail: await RestaurantsMenu.findById(elem.item_id),
              qauntOfItem: elem.quantity,
            };
          });

          Promise.all(itemsInCart).then(async (resp) => {
            resp.forEach((elem) => {
              total =
                total + elem.itemIncartDetail.itemprice * elem.qauntOfItem;
            });

            // check if shopping session already exist for this user
            const orderingSessionCheck = await Session.findOne({
              user_id: isvalid.uid,
            });
            if (orderingSessionCheck) {
              const update_total = await Session.findOneAndUpdate(
                { user_id: isvalid.uid },
                { $set: { totalAmount: total } }
              );

              if (update_total) {
                res.status(200).send({
                  msg: "updated order session as well",
                  result: resp,
                });
              }
            }
            //create a new Order session
            else {
              const orderSession = {
                user_id: isvalid.uid,
                totalAmount: total,
              };

              const OrderDetails = new Session(orderSession);
              const sessionCreated = await OrderDetails.save();
              if (addItem_cart && sessionCreated) {
                res.status(200).send({
                  msg: "data added successfully",
                  result: resp,
                });
              }
            }
          });
        }
        // console.log("addItem_cart", addItem_cart);
        // res.send({ cartItemDetail: addItem_cart });
      }
    }
  }
});

router.post("/getcartItem", async (req, res) => {
  //verifying the request comes from registeruser
  const isvalid = jwt.verify(req.headers.authorization, "secret");
  // const isvalid = req.body.user;
  const itemname = req.body._id;
  console.log("itemname", req.body._id);

  const fetchCart = await Cart.find({
    item_id: itemname,
  });
  console.log(fetchCart);
  if (fetchCart) {
    let itemInCart = fetchCart.map((elem) => {
      return {
        prm: elem.item_id,
        quant: elem.quantity,
      };
    });
    res.status(200).send({ itemInCart: itemInCart });
    //   Promise.all(productsInCart).then((resp) => {
    //     res.status(200).send({ result: resp });
    //   });
  }
});
module.exports = router;
