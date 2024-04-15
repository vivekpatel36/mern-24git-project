const router = require("express").Router();
const UserController = require("../Controller/UserController");
router.post("/user", UserController.createUser);
router.get("/user", UserController.getAllUser);
router.get("/user/:id",UserController.getUserbyId);
router.put("/user/:id",UserController.updateUser);
router.delete("/user/:id",UserController.deleteUser);
router.post("/user/login", UserController.loginUser);
router.post("/user/isuserexist",UserController.isUserExist);
router.post("/user/resetpassword",UserController.resetPassword);
module.exports = router;