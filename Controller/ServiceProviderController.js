const ServiceProviderSchema = require("../Models/ServiceProviderModel");
const mailUtil = require("../Util/MailUtil");
const encrypt = require("../Util/Encrypt");

const createServiceProvider = async (req, res) => {
  try {
    
    const hashedPassword = encrypt.encryptPassword(req.body.password);
    const serviceProviderObj = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      role: req.body.role,
    };
    //maill
    const savedServiceProvider = await ServiceProviderSchema.create(serviceProviderObj);
    const mailRes = await mailUtil.mailSend(
      savedServiceProvider.email,
      "Welcome mail",
      "Welcome to local service..."
    );
    //mail
    res.status(201).json({
      message: "Created ServiceProvider successfully",
      data: savedServiceProvider,
      flag: 1,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in creating ServiceProvider",
      data: err,
      flag: -1,
    });
  }
};

const getAllServiceProvider = async (req, res) => {
  try {
    const ServiceProvider = await ServiceProviderSchema.find().populate('role');
    res.status(200).json({
      message: "Service Provider Fetched",
      flag: 1,
      data: ServiceProvider,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getServiceProviderbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const ServiceProvider = await ServiceProviderSchema.findById(id).populate("role");
    res.status(200).json({
      message: "Service Provider Fetched",
      flag: 1,
      data: ServiceProvider,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateServiceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const updateServiceProvider = await ServiceProviderSchema.findByIdAndUpdate(id,req.body)
    res.status(201).json({
      message: "Service Provider updated successfully",
      flag: 1,
      data: updateServiceProvider,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const deleteServiceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteServiceProvider = await ServiceProviderSchema.findByIdAndDelete(id);
    res.status(201).json({
      message: "Service Provider deleted successfully",
      flag: 1,
      data: deleteServiceProvider,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const loginServiceProvider = async (req, res) => {
  //select * from ServiceProviders where email = ? and password = ?
  //db -->password -->encrypt
  // req.body.password 123456 -->
  try {
    //kunal@gmail.com
    const email = req.body.email;
    const password = req.body.password; //123456

    const serviceproviderFromMail = await ServiceProviderSchema.findOne({ email: email }); //db
    if (serviceproviderFromMail != null) {
      console.log("ServiceProvider found");
      const flag = encrypt.comparePassword(password, serviceproviderFromMail.password);
      if (flag == true) {
        res.status(200).json({
          message: "ServiceProvider login successfully",
          flag: 1,
          data: serviceproviderFromMail,
        });
      } else {
        res.status(404).json({
          message: "ServiceProvider not found",
          flag: -1,
        });
      }
    } else {
      res.status(404).json({
        message: "ServiceProvider not found",
        flag: -1,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error in login ServiceProvider",
      data: err,
      flag: -1,
    });
  }
};


module.exports = {
    getAllServiceProvider,
    createServiceProvider,
    updateServiceProvider,
    deleteServiceProvider,
    getServiceProviderbyId,
    loginServiceProvider
}