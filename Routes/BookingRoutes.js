const router = require("express").Router();
const bookController = require("../Controller/BookingController");
router.post("/book", bookController.createBooking);
router.get("/book", bookController.getAllBooking);
router.get("/book/:id", bookController.getBookingbyId);
router.put("/book/:id", bookController.updateBooking);
router.delete("/book/:id",bookController.deleteBooking);
router.put("/bookStatus/:id", bookController.updateStatusById);
router.get("/pendingStatus/:id",bookController.pendingStatusById);
router.get("/doneStatusUser/:id", bookController.doneStatusByUserId);
router.get("/getBookingByUser/:id",bookController.getBookingByUserId)
router.get("/getBookingByServiceProvider/:id", bookController.getBookingByServiceProviderId);
router.get("/doneStatusServiceProvider/:id", bookController.doneStatusByServiceProviderId);
module.exports = router;
