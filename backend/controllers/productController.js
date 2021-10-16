const Product = require("../models/product");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/errorHandler");

exports.newProduct = catchAsync(async (req, res, next) => {
  //// Implement image upload

  req.body.user = req.user.id;
  // Check data first..below code is risky
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// get all products
exports.AllProducts = catchAsync(async (req, res, next) => {
  // return next(new AppError("My Error", 400));
  // Limiting items displayed per PAGE
  const resPerPage = 4;
  const productCount = await Product.countDocuments();
  const categoires = Product.schema.path("category").enumValues;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone(); // Simply add clone like this.
  res.status(200).json({
    success: true,
    // count: products.length,
    resPerPage,
    productCount,
    filteredProductsCount,
    products,
    categoires,
  });
});
// get all products for admins
exports.AllAdminProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  //prettier-ignore
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("There is no product with this ID", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// update product based on id
exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      error: true,
      message: "There is no product with this id",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product based on its id
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      error: true,
      message: "There is no product with this id",
    });
  }
  res.status(200).json({
    success: true,
  });
});

/// Create/ update review
exports.createProductReview = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (userReview) => userReview.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

/// Get review of specific product

exports.getAllProductReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

/// Delete review of specific product

exports.deleteReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
  });
});
