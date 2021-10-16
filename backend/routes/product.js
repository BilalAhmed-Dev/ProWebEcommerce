const express = require("express");
const router = express.Router();

const {
  AllProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getAllProductReviews,
  deleteReview,
  AllAdminProducts,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizedRoles } = require("../utils/protect");

router.route("/products").get(AllProducts);
router.route("/products/review").put(isAuthenticatedUser, createProductReview);
router.route("/products/:id").get(getProduct);
router.use("/products/admin", isAuthenticatedUser);
router.use("/products/admin", authorizedRoles("admin"));
router
  .route("/products/admin/reviews")
  .get(getAllProductReviews)
  .delete(deleteReview);
router.route("/products/admin/allProducts").get(AllAdminProducts);
router.route("/products/admin/:id").put(updateProduct).delete(deleteProduct);
router.route("/products/admin/new").post(newProduct);

module.exports = router;
