const RoleSchema = require('../Models/RoleModel')

const createRole = async (req, res) => {
  try {
    const savedRole = await RoleSchema.create(req.body);
    res.status(200).json({
      message: "Role Created",
      flag: 1,
      data: savedRole,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const role = await RoleSchema.find();
    res.status(200).json({
      message: "Role Fetched",
      flag: 1,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getRolebyId = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await RoleSchema.findById(id);
    res.status(200).json({
      message: "Role Fetched",
      flag: 1,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};


const updateRoles = async (req,res) =>{
  try{
      const id =  req.params.id;
      const updateRole = await RoleSchema.findByIdAndUpdate(id)

      res.status(201).json({
        message: "Role updated successfully..",
        flag: 1,
        data:updateRole,
      })

  }catch(error){
      res.status(500).json({
        message:"Server error",
        flag: -1,
        data: error,
      });
  }
}

const deleteRole = async (req,res) =>{

  try{
    const id = req.params.id
    const deleteRole = await RoleSchema.findByIdAndDelete(id)

    res.status(201).json({
      message: "Role deleted successfully",
      flag: 1,
      data: deleteRole
    })
  }
  catch(error){
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error
    })
  }

}

module.exports = {
  getAllRoles,
  createRole,
  updateRoles,
  deleteRole,
  getRolebyId
}