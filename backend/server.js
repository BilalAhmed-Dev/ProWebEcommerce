const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Uncaught exception (undefined variable....)
process.on("uncaughtException", (err) => {
  console.log(`ERROR:${err.message}`);
  console.log("Shutting down server...uncaught execption");
  process.exit(1);
});
// console.log(a);  // uncaught exception

/// Setting up config file
dotenv.config({ path: "backend/config/config.env" });
// connecting to Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// unHandled Promise rejections (its when async await fails)
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log(`Shutting down server due to Unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
