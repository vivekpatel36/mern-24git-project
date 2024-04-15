const router = require("express").Router();
const ServiceProviderController = require("../Controller/ServiceProviderController");
router.post("/serviceprovider", ServiceProviderController.createServiceProvider);
router.post(
  "/serviceprovider/login",
  ServiceProviderController.loginServiceProvider
);

router.get("/serviceprovider", ServiceProviderController.getAllServiceProvider);
router.get("/serviceprovider/:id", ServiceProviderController.getServiceProviderbyId);
router.put("/serviceprovider/:id", ServiceProviderController.updateServiceProvider);
router.delete("/serviceprovider/:id", ServiceProviderController.deleteServiceProvider);
module.exports = router;
