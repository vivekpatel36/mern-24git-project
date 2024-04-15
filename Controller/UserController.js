const UserSchema = require("../Models/UserModel");
const ServiceProviderSchema = require("../Models/ServiceProviderModel")
const mailUtil =require("../Util/MailUtil");
const encrypt = require("../Util/Encrypt");
const otpSchema = require("../Models/OtpModel");

const createUser = async (req, res) => {
  try {
    const hashedPassword = encrypt.encryptPassword(req.body.password);
    const userObj = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      role: req.body.role,
    };
    //maill
    const savedUser = await UserSchema.create(userObj);
    const mailRes = await mailUtil.mailSend(
      savedUser.email,
      "Welcome mail",
      "Welcome to local service..."
    );
    //mail
    res.status(201).json({
      message: "Created user successfully",
      data: savedUser,
      flag: 1,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in creating user",
      data: err,
      flag: -1,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await UserSchema.find().populate("addresses");
    res.status(200).json({
      message: "User Fetched",
      flag: 1,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const getUserbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const User = await UserSchema.findById(id).populate("addresses");
    res.status(200).json({
      message: "User Fetched",
      flag: 1,
      data: User,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await UserSchema.findByIdAndUpdate(id,req.body)
    res.status(201).json({
      message: "User Updated successfully",
      flag: 1,
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await UserSchema.findByIdAndDelete(id);
    res.status(201).json({
      message: "User Deleted successfully",
      flag: 1,
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      flag: -1,
      data: error,
    });
  }
};

const loginUser = async (req, res) => {
  //select * from users where email = ? and password = ?
  //db -->password -->encrypt
  // req.body.password 123456 -->
  try {
    //kunal@gmail.com
    const email = req.body.email;
    const password = req.body.password; //123456

    const userFromEmail = await UserSchema.findOne({ email: email }); //db
    if (userFromEmail != null) {
      console.log("User found");
      const flag = encrypt.comparePassword(
        password,
        userFromEmail.password
      );
      if (flag == true) {
        res.status(200).json({
          message: "User login successfully",
          flag: 1,
          data: userFromEmail,
        });
      } else {
        res.status(404).json({
          message: "User not found",
          flag: -1,
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
        flag: -1,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error in login User",
      data: err,
      flag: -1,
    });
  }
};

const isUserExist = async (req, res) => {
  try {
    const email = req.body.email;
    const getUser = await UserSchema.findOne({ email: email });
    const getServiceProvider = await ServiceProviderSchema.findOne({
      email: email,
    });
    console.log(getUser);
    console.log(getServiceProvider);
    if (getUser) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const mailRes = await mailUtil.mailSend(
        getUser.email,
        "OTP For Reset Password...",
        `Your OTP for reset password is ${otp}`
      );
      const otpObj = {
        otp: otp,
        email: getUser.email,
        status: true,
      };
      await otpSchema.create(otpObj);

      res.status(200).json({
        message: "User Found",
        flag: 1,
        data: getUser,
      });
    } else if (getServiceProvider) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const mailRes = await mailUtil.mailSend(
        getServiceProvider.email,
        "OTP For Reset Password...",
        `Your OTP for reset password is ${otp}`
      );
      const otpObj1 = {
        otp: otp,
        email: getServiceProvider.email,
        status: true,
      };
      await otpSchema.create(otpObj1);

      res.status(200).json({
        message: "Service Provider Found",
        flag: 1,
        data: getServiceProvider,
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in finding User",
      flag: -1,
    });
  }
};

const resetPassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const otp = req.body.otp;
  const time = req.body.time;

  console.log(email, password);

  const getuserForOTP = await otpSchema.findOne({ email: email });
  console.log(getuserForOTP);
  if (getuserForOTP) {
    if (getuserForOTP.otp === otp) {

      const timeDifference = time - getuserForOTP.time 
      const is60SecondsGap = timeDifference >= 60000;

      if(is60SecondsGap){
        res.status(401).json({
          message: "OTP is expired",
          flag: -1,
        })
      }else{
        const hashedPassword = await encrypt.encryptPassword(password);
      try {
        const updateUserPassword = await UserSchema.findOneAndUpdate(
          { email: email },
          { $set: { password: hashedPassword } }
        );
        await otpSchema.findOneAndDelete({ email: email });
        const updateAerviceProviderPassword =
          await ServiceProviderSchema.findOneAndUpdate(
            { email: email },
            { $set: { password: hashedPassword } }
          );
        await otpSchema.findOneAndDelete({ email: email });
        res.status(200).json({
          message: "Password Updated Successfully",
          flag: 1,
        });
      } catch (error) {
        res.status(500).json({
          message: "Error in updating Password",
          flag: -1,
        });
      }
      }

      
    } else {
      // delete otp
      await otpSchema.findOneAndDelete({ email: email });
      res.status(401).json({
        message: "Invalid OTP",
        flag: -1,
      });
    }
  } else {
    //delete otp
    await otpSchema.findOneAndDelete({email : email})
    res.status(500).json({
      message: "Error...",
      flag: -1,
    });
  }
};



module.exports ={
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserbyId,
  loginUser,
  isUserExist,
  resetPassword
}