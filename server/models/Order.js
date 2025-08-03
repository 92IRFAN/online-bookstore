const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    mobile: String,
    email: String,
  },
  paymentMethod: {
    type: String,
    default: "cod",
    enum: ["cod", "stripe", "razorpay"],
  },
  paymentStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "failed"],
  },
  orderStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
  },
  stripeSessionId: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
