const router = require("express").Router();
const SubcategoryController = require("../Controller/SubcategoryController");
router.post("/subcategory", SubcategoryController.createSubcategory);
router.get("/subCategory", SubcategoryController.getAllSubcategory);
router.get("/subCatergory/:id", SubcategoryController.getSubCategorybyId);
router.put("/subCategory/:id", SubcategoryController.updateSubcategory);
router.delete("/subCategory/:id", SubcategoryController.deleteSubcategory);
module.exports = router;
