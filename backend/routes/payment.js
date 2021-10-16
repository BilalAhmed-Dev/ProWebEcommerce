const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../utils/protect");
router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/payment/process").get(isAuthenticatedUser, sendStripeApi);

module.exports = router;
