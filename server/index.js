// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// app.use(require("cors")());
// //To print incoming requests from mongoose in the terminal
// mongoose.set("debug", true);
// // accept certain POST bodytypes
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// //connecting to mongoDB
// async function connecting() {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1/ecommerce");
//     console.log("Connected to the DB");
//   } catch (error) {
//     console.log(
//       "ERROR: Seems like your DB is not running, please start it up !!!"
//     );
//   }
// }

//redirect to routers
// app.use("/category", require("./routes/categories"));
// app.use("/product", require("./routes/products"));

// connecting().then(() => {
//   app.listen(4040, () => console.log("Serv is running at 4040"));
// });
const express = require("express");
const app = express();
// accept certain POST bodytypes

// Controlling the maximum request body size will do the trick, however, you do not need body-parser anymore. Instead of using body-parser middleware, use the new Express implementation:

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
require("dotenv").config();
const port = process.env.PORT || 5050;
app.use(require("cors")());
const mongoose = require("mongoose");
app.use("/payment", require("./routes/payment.route.js"));
mongoose.set("debug", true);

async function connectingDB() {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("DB running");
  } catch (error) {
    console.log("DB is not running");
  }
}
connectingDB();

// ADMINJS

// first install adminjs and the dependencies
// npm i adminjs @adminjs/express @adminjs/mongoose  tslib express-formidable express-session

// require adminjs
const AdminJS = require("adminjs");
// require express plugin
const AdminJSExpress = require("@adminjs/express");
// require mongoose adapter
AdminJS.registerAdapter(require("@adminjs/mongoose"));
// Import all the project's models
const Categories = require("./schemas/categories"); // replace this for your model
const Products = require("./schemas/products");
const Users = require("./schemas/users");
// const Description = require("./schemas/description");

// replace this for your model
// set up options -- models to use and a route to open dashboard
const adminOptions = {
  resources: [Categories, Products, Users],
  rootPath: "/admin",
};
// initialize adminjs
const admin = new AdminJS(adminOptions);
// build admin route
const router = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, router);
// end ADMINJS
app.use("/category", require("./routes/categories"));
app.use("/product", require("./routes/products"));
app.use("/users", require("./routes/users.routes"));
app.use("/emails", require("./routes/emails.routes.js"));
app.use("/pictures", require("./routes/pictures.routes"));
// end ADMINJS

app.listen(port, () => console.log(`Serv is running at ${port}`));
