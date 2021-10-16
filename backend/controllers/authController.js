const User = require("../models/user");
const AppError = require("../utils/errorHandler");
const catchAsync = require("../utils/catchAsync");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Register a user => /api/v1/register

exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: "../data/images/default_avatar.jpg",
  });

  sendToken(req, user, 200, res);
});

/// Login user

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter email & password", 400));
  }

  // Finding user in database

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid Email or Password", 401));
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new AppError("Invalid Email or Password", 401));
  }
  user.password = undefined;
  sendToken(req, user, 200, res);
});

/// Forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("User not found", 401));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset passsword url
  /// Below code is for testing purposes remove when delpoying
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  // const resetUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIt Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError(err.message, 500));
  }
});

/// reset password  => /api/v1/password/reset/:token
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Password reset token is invalid or has expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError("Password does not match", 400));
  }

  // setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(req, user, 200, res);
});

/// Get currently logged in user details => /api/v1/me

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update / Change password => /api/v1/password/update

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldpassword);
  if (!isMatched) {
    return next(new AppError("Old password is incorrect", 400));
  }
  user.password = req.body.password;
  await user.save();

  sendToken(req, user, 200, res);
});

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsync(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // Update avatar: TODO

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout user
exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out" });
});

/// Admin Routes

// Get all users => /api/v1/admin/users

exports.allUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get user details  /api/v1/admin/user/:id
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError(`User not found with id ${req.params.id}`, 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile => /api/v1/admin/user/:id

exports.updateUser = catchAsync(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  // Update avatar: TODO

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete user /api/v1/admin/user/:id
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(
      new AppError(`User not found with this id ${req.params.id}`, 400)
    );
  }

  // Remove avatar from cloudinary: TODO

  res.status(200).json({
    success: true,
  });
});
