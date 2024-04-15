const BookingSchema = require("../Models/BookingModel");

const createBooking = async (req, res) => {
  try {
    const savedBooking = await BookingSchema.create(req.body);
    res.status(200).json({
      message: "Booking successfully",
      flag: 1,
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getAllBooking = async (req, res) => {
  try {
    const booking = await BookingSchema.find()
      .populate("service")
      .populate("serviceprovider")
      .populate("user");
    res.status(200).json({
      message: "All Booking are Fetched",
      flag: 1,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getBookingbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const Booking = await BookingSchema.findById(id)
      .populate("service")
      .populate("serviceprovider")
      .populate("user");
    res.status(200).json({
      message: "Booking Fetched",
      flag: 1,
      data: Booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const updateBooking = await BookingSchema.findByIdAndUpdate(id, req.body);

    res.status(201).json({
      message: "Booking updated successfully..",
      flag: 1,
      data: updateBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      flag: -1,
      data: error,
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBooking = await BookingSchema.findByIdAndDelete(id);
    res.status(201).json({
      message: "Booking Deleted Successfully",
      flag: 1,
      data: deleteBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updateStatus = await BookingSchema.findByIdAndUpdate(id, {
      status: req.body.status,
      address: req.body.address,
    });
    console.log(updateStatus);
    res.status(201).json({
      message: "Status Updated Successfully",
      flag: 1,
      data: updateStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getBookingByUserId = async (req, res) => {
  const userId = req.params.id; //loggedin service provider id

  try {
    const booking = await BookingSchema.find({
      user: userId,
    })
    .populate("address")
      .populate("service")
      .populate("serviceprovider")
      .populate("user");
    console.log(booking);
    if (booking && booking.length > 0) {
      res.status(200).json({
        message: "booking found",
        flag: 1,
        data: booking,
      });
    } else {
      res.status(404).json({
        message: "no booking found",
        flag: -1,
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "no booking found",
      flag: -1,
      data: [],
    });
  }
};

const getBookingByServiceProviderId = async (req, res) => {
  const serproId = req.params.id; //loggedin service provider id

  try {
    const booking = await BookingSchema.find({
      serviceprovider: serproId,
    })
    .populate("address")
      .populate("service")
      .populate("serviceprovider")
      .populate("user");
    console.log(booking);
    if (booking && booking.length > 0) {
      res.status(200).json({
        message: "booking found",
        flag: 1,
        data: booking,
      });
    } else {
      res.status(404).json({
        message: "no booking found",
        flag: -1,
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "no booking found",
      flag: -1,
      data: [],
    });
  }
};

const pendingStatusById = async (req, res) => {
  const userId = req.params.id;
  try {
    const doneStatus = await BookingSchema.find({
      user: userId,
      status: "Pending",
    })
      .populate("service")
      .populate("serviceprovider")
      .populate("user");
    if (doneStatus && doneStatus.length > 0) {
      res.status(200).json({
        message: "Pending Status are found",
        data: doneStatus,
        flag: 1,
      });
    } else {
      res.status(404).json({
        message: "No Pending Status Found!",
        data: [],
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      flag: -1,
      data: [],
    });
  }
};

const doneStatusByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const doneStatus = await BookingSchema.find({
      user: userId,
      status: "Done",
    })
      .populate({
        path: "service",
        populate: {
          path: "category",
          model: "Category",
        },
      })
      .populate("address")
      .populate("serviceprovider")
      .populate("user");
    if (doneStatus && doneStatus.length > 0) {
      res.status(200).json({
        message: "Done Status are found",
        data: doneStatus,
        flag: 1,
      });
    } else {
      res.status(404).json({
        message: "No Done Status Found!",
        data: [],
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      flag: -1,
      data: [],
    });
  }
};

const doneStatusByServiceProviderId = async (req, res) => {
  const serviceProviderId = req.params.id;

  try {
    const doneStatus = await BookingSchema.find({
      serviceprovider: serviceProviderId,
      status: "Done",
    })
      .populate("service")
      .populate("serviceprovider")
      .populate("user")
      .populate("address")
    if (doneStatus && doneStatus.length > 0) {
      res.status(200).json({
        message: "Done Status are found",
        data: doneStatus,
        flag: 1,
      });
    } else {
      res.status(404).json({
        message: "No Done Status Found!",
        data: [],
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      flag: -1,
      data: [],
    });
  }
};

module.exports = {
  createBooking,
  getAllBooking,
  getBookingbyId,
  updateBooking,
  deleteBooking,
  updateStatusById,
  getBookingByUserId,
  pendingStatusById,
  doneStatusByUserId,
  getBookingByServiceProviderId,
  doneStatusByServiceProviderId,
};
