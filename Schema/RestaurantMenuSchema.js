var mongoose = require("mongoose");

const restaurantMenuSchema = mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  resId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  categoryMenu: {
    itemname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    itempic: {
      type: String,
      required: true,
    },
    itemtype: {
      type: String,
      required: true,
    },
    itemprice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
});

const RestaurantsMenu = mongoose.model("RestaurantsMenu", restaurantMenuSchema);

module.exports = RestaurantsMenu;
