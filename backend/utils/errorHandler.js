class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor); // test this when we add methods here the stack trace of this and everything that comes after it will not be shown to user giving less info for potential attacker
  }
}

module.exports = AppError;
