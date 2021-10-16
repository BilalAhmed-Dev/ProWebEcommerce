const AppError = require("../utils/errorHandler");
//ERRORS
// 1 Duplicate fields that exist in mongoDB
// 2 CastError...Wrong ID format inserted
// 3 Opertaional error are errors that expected and handled
const handleCastErrorDB = (err) => {
  /// mongoose error cannot find ID
  const message = `Inavalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  /// mongoDB error a document with same name already exist
  const value = Object.values(err.keyValue)[0]; /// regExp get the string between quotes

  const message = `Duplicate field value: ( ${value} ). Please use another value`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid Token. Please try to log in again", 401);

const handleTokenExpiredError = () =>
  new AppError("Token Expired. Please log in again", 401);

const sendErrorDev = (err, req, res) => {
  // API
  // A
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // RENDERED WEBSITE
  // B
  console.log("ERROR", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  /// operation is trusted error that I expected and already dealt with it in a proper way
  //A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    /// non operational error/ programming uknown error
    // log error
    console.log("ERROR", err);
    // B) unknown Error
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
  //B) RENDERED WEBSITE
  // if (err.isOperational) {
  //   return res.status(err.statusCode).render("error", {
  //     title: "Something went wrong",
  //     msg: err.message,
  //   });
  // }
  // /// non operational error/ programming uknown error
  // // log error
  // console.log("ERROR", err);
  // return res.status(err.statusCode).render("error", {
  //   title: "Something went wrong",
  //   msg: "Please try again later",
  // });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    let error = Object.assign(err);

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleTokenExpiredError();

    //TokenExpiredError
    sendErrorProd(error, req, res);
  }
};
