const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");
const formData = require("express-form-data");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "backend/config/config.env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse());
app.use(cookieParser());
// import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // utils/appError.js
}); /// app.all() "all" stand for all http verbs...get/post/delete/update

app.use(globalErrorHandler); // errorController.js

module.exports = app;
