const TypeSchema = require("../Models/TypeModel");

const createType = async (req, res) => {
  try {
    const savedType = await TypeSchema.create(req.body);
    res.status(200).json({
      message: "Type Created",
      flag: 1,
      data: savedType,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const type = await TypeSchema.find();
    res.status(200).json({
      message: "type Fetched",
      flag: 1,
      data: type,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getTypebyId = async (req, res) => {
  try {
    const id = req.params.id;
    const Type = await TypeSchema.findById(id);
    res.status(200).json({
      message: "Type Fetched",
      flag: 1,
      data: Type,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateType = async (req, res) => {
  try {

    const id = req.params.id
    const updateType = await TypeSchema.findByIdAndUpdate(id,req.body);
    res.status(201).json({
      message: "type updated successfully",
      flag: 1,
      data: updateType,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};


const deleteType = async (req, res) => {
  try {

    const id = req.params.id;
    const deleteType = await TypeSchema.findByIdAndUpdate(id);
    res.status(201).json({
      message: "type deleted...",
      flag: 1,
      data: deleteType,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};


module.exports = {
  getAllType,
  createType,
  updateType,
  deleteType,
  getTypebyId
};
