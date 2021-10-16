const express = require("express");
const router = express.Router();

const {
  newOrder,
  myOrders,
  getSingleOrder,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizedRoles } = require("../utils/protect");
router.use("/order", isAuthenticatedUser);
router.route("/order/new").post(newOrder);
router.route("/order/me").get(myOrders);
router.route("/order/admin/allorders").get(authorizedRoles("admin"), allOrders);
router.route("/order/:id").get(getSingleOrder);
router
  .route("/order/admin/:id")
  .put(authorizedRoles("admin"), updateOrder)
  .delete(authorizedRoles("admin"), deleteOrder);

module.exports = router;
