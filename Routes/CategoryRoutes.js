const router = require("express").Router();
const CategoryController = require("../Controller/CategoryController");
router.post("/category", CategoryController.createCategory);
router.get("/category", CategoryController.getAllCategory);
router.get("/category/:id", CategoryController.getCategorybyId);
router.put("/category/:id",CategoryController.updateCategory);
router.delete("/category/:id",CategoryController.deleteCategory);
module.exports = router;
