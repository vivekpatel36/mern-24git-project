const addressModel = require("../Models/AddressModel");
const userModel = require("../Models/UserModel");

const createaddress = async (req, res) => {
  try {
    const savedaddress = await addressModel.create(req.body);

    const userId = req.body.user;

    // Find the user by id and update its addresses array
    await userModel.findByIdAndUpdate(
      userId,
      { $push: { addresses: savedaddress._id } }, // Push the address id to the addresses array
      { new: true } // To return the updated user document
    );

    res.status(200).json({
      message: "address added ..",
      data: savedaddress,
      flag: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error..",
      // data : savedaddress,
      flag: -1,
    });
  }
};

const getaddress = async (req, res) => {
  try {
    const getaddress = await addressModel.find();
    res.status(200).json({
      message: "Address fetched successfully",
      data: getaddress,
      flag: 1,
    });
  } catch (e) {
    res.staus(500).json({
      message: "Error in server !!!",
      data: e,
      flag: -1,
    });
  }
};

const getaddressById = async (req, res) => {
  try {
    const getaddress = await addressModel.findById(req.params.id);
    res.status(200).json({
      message: "Address fetched successfully",
      data: getaddress,
      flag: 1,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error in server !",
      data: e,
      flag: -1,
    });
  }
};

const deleteaddress = async (req, res) => {
  try {
    const deleteaddress = await addressModel.findByIdAndDelete(req.params.id);
    if (deleteaddress != null) {
      res.status(200).json({
        message: "address deleted successfully...",
        data: deleteaddress,
        flag: 1,
      });
    } else {
      res.status(404).json({
        message: "Address not found !!!",
      });
    }
  } catch (e) {
    console.log(e);

    res.status(500).json({
      message: "Error in server !!!",
      data: e,
      flag: -1,
    });
  }
};

const updateaddress = async (req, res) => {
  try {
    const updateaddress = await addressModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (updateaddress != null) {
      res.status(200).json({
        message: "Address updated successfully...",
        // data: updateroledata,
        flag: 1,
      });
    } else {
      res.status(404).json({
        message: "Address not found !!! ",
        flag: -1,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error in server !!!",
      data: e,
      flag: -1,
    });
  }
};
module.exports = {
  createaddress,
  getaddress,
  deleteaddress,
  updateaddress,
  getaddressById,
};
