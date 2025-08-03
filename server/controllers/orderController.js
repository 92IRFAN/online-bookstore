const Order = require("../models/Order");
const User = require("../models/User");
const Book = require("../models/Book");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Place order via COD
const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await Order.create({
      userId: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    // Update book stock
    for (const item of items) {
      await Book.findByIdAndUpdate(item.bookId, {
        $inc: { stock: -item.quantity },
      });
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Place order via SRIPE

// Create Stripe Checkout Session
const createStripeSession = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;
    const userId = req.user.id;

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create line items for Stripe
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const book = await Book.findById(item.bookId);
        if (!book) {
          throw new Error(`Book not found: ${item.title}`);
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: [item.image],
              metadata: {
                bookId: item.bookId,
              },
            },
            unit_amount: Math.round(item.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      })
    );

    // Add shipping fee as a separate line item
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping Fee",
        },
        unit_amount: 1000, // $10 in cents
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: user.email,
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/place-order`,
      metadata: {
        userId: userId,
        orderData: JSON.stringify({
          shippingAddress,
          items,
          totalAmount,
        }),
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Handle successful payment
const handleStripeSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const orderData = JSON.parse(session.metadata.orderData);

      // Create order in database
      const order = await Order.create({
        userId: session.metadata.userId,
        items: orderData.items,
        shippingAddress: orderData.shippingAddress,
        totalAmount: orderData.totalAmount,
        paymentMethod: "stripe",
        paymentStatus: "paid",
        stripeSessionId: sessionId,
      });

      // Update book stock
      for (const item of orderData.items) {
        await Book.findByIdAndUpdate(item.bookId, {
          $inc: { stock: -item.quantity },
        });
      }

      res.json({
        success: true,
        message: "Payment successful and order created",
        orderId: order._id,
      });
    } else {
      res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Stripe success handling error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Admin Controllers

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  placeOrder,
  createStripeSession,
  handleStripeSuccess,
  getUserOrders,
  getOrders,
  updateOrderStatus,
};
