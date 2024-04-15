const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 4000

//connect to mongoDB
const db = mongoose.connect("mongodb://127.0.0.1:27017/urbanservice-final");
db.then(() => {
  console.log("connected to mongodb");
}).catch((err) => {
  console.log(err);
});

//config
app.use(express.json());

const RoleRoute = require("./Routes/RoleRoutes")
const UserRoute = require("./Routes/UserRoutes");
const ServiceRoute = require("./Routes/ServiceRoutes");
const CategoryRoute = require("./Routes/CategoryRoutes");
const TypeRoute = require("./Routes/TypeRoutes");
const SubcategoryRoute = require("./Routes/SubcategoryRoutes");
const ServiceProviderRoute = require("./Routes/ServiceProviderRoutes");
const BookingRoute = require("./Routes/BookingRoutes.js");
const AddressRoute = require("./Routes/AddressRoutes.js")


//all routes
app.use("/address",AddressRoute);
app.use("/role",RoleRoute);
app.use("/user", UserRoute);
app.use("/service", ServiceRoute);
app.use("/category", CategoryRoute);
app.use("/type", TypeRoute);
app.use("/subcategory", SubcategoryRoute);
app.use("/serviceprovider", ServiceProviderRoute);
app.use("/book",BookingRoute)


try{
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  //console.log("server is running on port "+PORT)
});
}
catch(err){
    
}