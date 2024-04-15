const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  servicename: {
    type: String,
  },

  serviceprovider: {
    type: Schema.Types.ObjectId,
    ref: "ServiceProvider",
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "Subcategory",
  },

  type: {
    type: Schema.Types.ObjectId,
    ref: "Type",
  },

  fees: {
    type: Number,
  },

  area: {
    type: String,
  },

  city: {
    type: String,
  },

  state: {
    type: String,
  },

  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
