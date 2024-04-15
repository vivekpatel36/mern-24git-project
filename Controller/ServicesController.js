const ServiceSchema = require("../Models/ServicesModel");
const Cloudinary = require("../Controller/CloudinaryController");
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

const createService = async (req, res) => {
  try {
    upload(req,res,async(err)=>{
      if(err){
        res.status(500).json({
          message: "Error uploading file"
        })
      }
      else{
        console.log("file....",req.file)
       
          const result = await Cloudinary.uploadImage(req.file.path);
          const serviceObj = {
            servicename: req.body.servicename,
            serviceprovider: req.body.serviceprovider,
            imageUrl: result.secure_url,
            area: req.body.area,
            city: req.body.city,
            state: req.body.state,
            fees: req.body.fees,
            type: req.body.type,
            category: req.body.category,
            subcategory: req.body.subcategory,
          };
          const savedService = await ServiceSchema.create(serviceObj);
          res.status(200).json({
            message: "Service Created",
            flag: 1,
            data: savedService,
          });
        
      }
    })
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getAllService = async (req, res) => {
  try {
    const service = await ServiceSchema.find()
      .populate("category")
      .populate("subcategory")
      .populate("serviceprovider")
      .populate("type");
    res.status(200).json({
      message: "Service Fetched",
      flag: 1,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};



const getServicebyId = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await ServiceSchema.findById(id)
      .populate("category")
      .populate("subcategory")
      .populate("type")
      .populate("serviceprovider")
      
    res.status(200).json({
      message: "Service Fetched",
      flag: 1,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const upadteService = async (req, res) => {
  try {
    const id = req.params.id;

    const upadteService = await ServiceSchema.findByIdAndUpdate(id, req.body);

    res.status(201).json({
      message: "Service Updated Successfully..",
      flag: 1,
      data: upadteService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteService = await ServiceSchema.findByIdAndDelete(id);
    res.status(200).json({
      message: "Service Deleted successfully",
      flag: 1,
      data: deleteService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getServiceByServiceproviderId = async(req, res) => {
  const serviceProviderId = req.params.id; //loggedin service provider id

  try {
    const services = await ServiceSchema.find({ serviceprovider: serviceProviderId })
    .populate("category")
    .populate("subcategory")
    .populate("type");
    console.log(services)
    if (services && services.length > 0) {
      res.status(200).json({
        message: "service found",
        flag: 1,
        data: services,
      });
    } else {
      res.status(404).json({
        message: "no service found",
        flag: -1,
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "no service found",
      flag: -1,
      data: [],
    });
  }
};




const filterServices = async(req, res)=>{
  try {
    console.log(req.query);
    const service = await ServiceSchema.find({
      servicename: { $regex: req.query.name, $options: "(?i)" },
    })
      .populate("category")
      .populate("subcategory")
      .populate("type")
      .populate("serviceprovider");
    if (service && service.length > 0) {
      res.status(200).json({
        message: "Service found.",
        data: service,
        flag: 1,
      });
    } else {
      res.status(404).json({
        message: "No Service found",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "no service found",
      flag: -1,
      data: [],
    });
  }
}

module.exports = {
  getAllService,
  createService,
  upadteService,
  deleteService,
  getServicebyId,
  getServiceByServiceproviderId,
  filterServices
};
