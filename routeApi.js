const express = require("express");
const router = express.Router();

const customerLogin = require("./Routes/Login/customerLogin");
const resturantLogin = require("./Routes/Login/resturantLogin");
const resturantMenu = require("./Routes/RestaurantMenu/restaurantMenu");

router.use("/user", customerLogin);
router.use("/partner", resturantLogin);
router.use("/restaurant", resturantMenu)

module.exports = router;
