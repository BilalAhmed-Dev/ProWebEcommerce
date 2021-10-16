const Order = require("../models/order");
const AppError = require("../utils/errorHandler");
const catchAsync = require("../utils/catchAsync");
const { updateStock } = require("../utils/helperFunctions");

// Create new order => /api/v1/order/new

exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order || order.user.id !== req.user.id) {
    return next(
      new AppError(
        "This order does not belong to the currently logged in user or the order does not exist.",
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});
// Get loggedin user orders => /api/v1/orders/me
exports.myOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  if (orders.length < 1) {
    return next(new AppError("You have not placed any orders yet", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders => /api/v1/order/admin/allorders
exports.allOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders || orders.length < 1) {
    return next(new AppError("There is no orders", 404));
  }

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
// Update/ Process order - Admin => /api/v1/order/admin/:id
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("there is no order with this id", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new AppError("You have already delivered this order", 404));
  }
  // order.orderItems.forEach(async (item) => {
  //   await updateStock(item.product, item.quantity);
  // });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Delete order => /api/v1/order/admin/:id
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError("Order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
  });
});
