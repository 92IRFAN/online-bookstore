const express = require("express");
const { protect, adminAuth } = require("../middleware/auth");
const {
  placeOrder,
  getUserOrders,
  getOrders,
  updateOrderStatus,
  createStripeSession,
  handleStripeSuccess,
} = require("../controllers/orderController");

const router = express.Router();

// Admin Routes
router.get("/", protect, adminAuth, getOrders);
router.patch("/:id/status", protect, adminAuth, updateOrderStatus);

// Client Routes
router.post("/place-order", protect, placeOrder);
router.get("/my-orders", protect, getUserOrders);

// Create Stripe checkout session
router.post("/create-stripe-session", protect, createStripeSession);

// Handle successful Stripe payment
router.post("/stripe-success", protect, handleStripeSuccess);

module.exports = router;
