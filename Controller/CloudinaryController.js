const cloundanry = require("cloudinary").v2;

const uploadImage = async (file) => {
  cloundanry.config({
    cloud_name: "dmnzygrdh",
    api_key: "629925856836656",
    api_secret: "PWKjn2yYDaICkeaaFuCXbrFiG-0",
  });

  const result = await cloundanry.uploader.upload(file);
  return result;
};
module.exports = {
  uploadImage,
};
