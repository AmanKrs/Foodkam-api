const express = require("express");
const router = express.Router();

const customerLogin = require("./Routes/Login/customerLogin");
const resturantLogin = require("./Routes/Login/resturantLogin");
const resturantMenu = require("./Routes/RestaurantMenu/restaurantMenu");
const cartActivity = require("./Routes/Cart/CartActivity");
router.use("/user", customerLogin);
router.use("/partner", resturantLogin);
router.use("/restaurant", resturantMenu);
router.use("/cart", cartActivity);
module.exports = router;
