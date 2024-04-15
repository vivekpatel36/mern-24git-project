const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    ref: "Role",
  },

  latitude: {
    type: String,
  },

  longitude: {
    type: String,
  },
  
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address", // Reference to the Address model
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
