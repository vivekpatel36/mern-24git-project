const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  
  name: {
    type: String,
  }

});

module.exports = mongoose.model("Type", TypeSchema);


//1.Outdoor service 2.In-home service 3.In-place service