var mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  resName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  resowner: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resopentime: {
    type: String,
    required: true,
  },
  resclosetime: {
    type: String,
    required: true,
  },
  resprofilepic: {
    type: String,
    required: true,
  },
  restype: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
});

const RestaurantInfo = mongoose.model("Restaurant", restaurantSchema);

module.exports = RestaurantInfo;
