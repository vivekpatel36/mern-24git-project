const router = require('express').Router();
const roleController = require('../Controller/RoleController');
router.post("/role", roleController.createRole);
router.get("/role", roleController.getAllRoles);
router.get("/role/:id", roleController.getRolebyId);
router.put("/role/:id", roleController.updateRoles);
router.delete("/role/:id", roleController.deleteRole);
module.exports = router;
