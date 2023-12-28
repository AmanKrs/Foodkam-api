const express = require("express")
const router = express.Router()

const customerLogin = require("./Routes/Login/customerLogin");
const resturantLogin = require("./Routes/Login/resturantLogin")

router.use("/user", customerLogin);
router.use("/patrner", resturantLogin)


module.exports = router;