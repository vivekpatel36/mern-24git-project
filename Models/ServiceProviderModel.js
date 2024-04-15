const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceProviderSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
  },

  phone: {
    type: String,
    unique: true,
  },

  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
});

//module.exports = mongoose.model('Service Providers', ServiceProviderSchema);
module.exports = mongoose.model("ServiceProvider", ServiceProviderSchema);