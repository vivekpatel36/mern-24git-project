const router = require("express").Router();
const TypeController = require("../Controller/TypeController");
router.post("/type", TypeController.createType);
router.get("/type", TypeController.getAllType);
router.get("/type/:id", TypeController.getTypebyId);
router.put("/type/:id", TypeController.updateType);
router.delete("/type/:id", TypeController.deleteType);
module.exports = router;
