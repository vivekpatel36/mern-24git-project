const SubcategorySchema = require("../Models/SubcategoryModel");

const createSubcategory = async (req, res) => {
  try {
    const savedSubCategory = await SubcategorySchema.create(req.body);
    res.status(200).json({
      message: "Subcategory Created",
      flag: 1,
      data: savedSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getAllSubcategory = async (req, res) => {
  try {
    const category = await SubcategorySchema.find().populate('category');
    res.status(200).json({
      message: "SubCategory Fetched",
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

const getSubCategorybyId = async (req, res) => {
  try {
    const id = req.params.id;
    const subcategory = await SubcategorySchema.findById(id);
    res.status(200).json({
      message: "SubCategory Fetched",
      flag: 1,
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};


const updateSubcategory = async (req, res) => {
  try {
    const id = req.params.id;
    const updateSubcategory = await SubcategorySchema.findByIdAndUpdate(id,req.body)
    res.status(201).json({
      message: "SubCategory Updated successfully",
      flag: 1,
      data: updateSubcategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteSubcategory = await SubcategorySchema.findByIdAndDelete(id);
    res.status(201).json({
      message: "SubCategory deleted successfully",
      flag: 1,
      data: deleteSubcategory,
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
  createSubcategory,
  getAllSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubCategorybyId
};
