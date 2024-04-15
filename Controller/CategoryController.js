const CategorySchema = require("../Models/CategoryModel");

const createCategory = async (req, res) => {
  try {
    const savedCategory = await CategorySchema.create(req.body);
    res.status(200).json({
      message: "Category Created",
      flag: 1,
      data: savedCategory,
    }); 
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};


const getAllCategory = async (req, res) => {
  try {
    const category = await CategorySchema.find();
    res.status(200).json({
      message: "Category Fetched",
      flag: 1,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getCategorybyId = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await CategorySchema.findById(id);
    res.status(200).json({
      message: "Category Fetched",
      flag: 1,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const updateCategory = await CategorySchema.findByIdAndUpdate(id,req.body);
    res.status(201).json({
      message: "Category Updated Successfully",
      flag: 1,
      data: updateCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCategory = await CategorySchema.findByIdAndDelete(id);
    res.status(201).json({
      message: "Category Deleted Successfully",
      flag: 1,
      data: deleteCategory,
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
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getCategorybyId
};
