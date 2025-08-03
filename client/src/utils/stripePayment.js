import { loadStripe } from "@stripe/stripe-js";
import api from "../services/api";
import { getAuthHeaders } from "./getAuthHeaders";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const createStripeCheckoutSession = async (orderData) => {
  try {
    const { data } = await api.post(
      "/orders/create-stripe-session",
      orderData,
      {
        headers: getAuthHeaders(),
      }
    );

    // Initialize Stripe
    const stripe = await stripePromise;

    // Redirect to Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Payment failed. Please try again.";
    throw new Error(errorMessage);
  }
};

export const handlePaymentSuccess = async ({
  sessionId,
  navigate,
  dispatch,
  setOrderDetails,
  setLoading,
}) => {
  if (!sessionId) {
    toast.error("Invalid payment session");
    navigate("/");
    return;
  }

  try {
    const { data } = await api.post(
      "/orders/stripe-success",
      { sessionId },
      {
        headers: getAuthHeaders(),
      }
    );

    setOrderDetails(data);
    dispatch(clearCart());
    toast.success("Payment successful! Order placed successfully.");
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Payment verification failed";
    toast.error(msg);
    navigate("/");
  } finally {
    setLoading(false);
  }
};
