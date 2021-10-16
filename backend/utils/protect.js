const jwt = require("jsonwebtoken");
const User = require("../models/user");
const catchAsync = require("./catchAsync");
const AppError = require("./errorHandler");

/// Checks if user is autenticated or not

exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return next(new AppError("Login first to access this resource.", 401));
  }
  req.user = await User.findById(decoded.id);
  next();
});

exports.authorizedRoles = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
