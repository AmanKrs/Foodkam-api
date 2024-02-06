var mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const cart_item = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RestaurantsMenu",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const shopping_session = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
    required: true,
  },
});

const Users = mongoose.model("User", customerSchema);
const Cart = mongoose.model("Cart_item", cart_item);
const Session = mongoose.model("Shopping_session", shopping_session);
// module.exports = Users;
module.exports = { Users, Cart, Session };