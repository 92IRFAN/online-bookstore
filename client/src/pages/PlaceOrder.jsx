import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaymentOption from "../components/PaymentOption";
import stripe_logo from "../assets/stripe_logo.png";
import razorpay_logo from "../assets/razorpay_logo.png";
import { placeOrder } from "../features/order/orderThunk";
import { resetOrderState } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { createStripeCheckoutSession } from "../utils/stripePayment";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [method, setMethod] = useState("cod");
  const [processing, setProcessing] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const { loading, success, error } = useSelector((state) => state.order);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please log in to continue");
      navigate("/login");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const orderData = {
      shippingAddress: data,
      items: cartItems.map((item) => ({
        bookId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.cover.url,
      })),
      paymentMethod: method,
      totalAmount: (subtotal + 10).toFixed(2),
    };

    if (method === "stripe") {
      try {
        setProcessing(true);
        await createStripeCheckoutSession(orderData);
      } catch (error) {
        toast.error(error.message);
        setProcessing(false);
      }
    } else {
      dispatch(placeOrder(orderData));
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      dispatch(resetOrderState());
      navigate("/orders");
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-4 px-7 md:px-16 py-5 sm:flex-row sm:py-14 min-h-[80vh]"
    >
      {/* Left Side - Shipping Info */}
      <div className="flex flex-col w-full gap-4 sm:max-w-[480px]">
        <h1 className="my-3 font-sans text-bilbao-700 text-xl sm:text-2xl">
          DELIVERY INFORMATION
        </h1>

        <div className="flex gap-3">
          <input
            {...register("firstName", { required: "First Name is required" })}
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-bilbao-700 transition-all duration-200"
          />
          <input
            {...register("lastName", { required: "Last Name is required" })}
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-bilbao-700 transition-all duration-200"
          />
        </div>
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="Email Address"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-bilbao-700 transition-all duration-200"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("street", { required: "Street is required" })}
          placeholder="Street"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-bilbao-700 transition-all duration-200"
        />
        {errors.street && (
          <p className="text-red-500">{errors.street.message}</p>
        )}

        <div className="flex gap-3">
          <input
            {...register("city", { required: "City is required" })}
            placeholder="City"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-bilbao-700 transition-all duration-200"
          />
          <input
            {...register("state", { required: "State is required" })}
            placeholder="State"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-bilbao-700 transition-all duration-200"
          />
        </div>
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

        <div className="flex gap-3">
          <input
            type="number"
            {...register("zipCode", { required: "Zip Code is required" })}
            placeholder="Zip Code"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-bilbao-700 transition-all duration-200"
          />
          <input
            {...register("country", { required: "Country is required" })}
            placeholder="Country"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-bilbao-700 transition-all duration-200"
          />
        </div>
        {errors.zipCode && (
          <p className="text-red-500">{errors.zipCode.message}</p>
        )}
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}

        <input
          type="number"
          {...register("mobile", { required: "Mobile number is required" })}
          placeholder="Mobile"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-bilbao-700 transition-all duration-200"
        />
        {errors.mobile && (
          <p className="text-red-500">{errors.mobile.message}</p>
        )}
      </div>

      {/* Right Side - Cart + Payment */}
      <div className="mt-8">
        <div className="min-w-80">
          <h1 className="text-xl md:text-2xl text-bilbao-700 font-sans mb-4">
            CART TOTAL
          </h1>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <p className="text-lg font-medium">Sub Total</p>
              <p className="text-lg font-medium">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-medium">Shipping Fee</p>
              <p className="text-lg font-medium">$10</p>
            </div>
            <div className="flex justify-between">
              <p className="text-2xl font-semibold">Total Amount</p>
              <p className="text-2xl font-semibold">
                ${(subtotal + 10).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-12">
          <h1 className="mb-3 font-sans text-bilbao-700">PAYMENT METHOD</h1>
          <div className="flex flex-col gap-3 lg:flex-row pr-32">
            <PaymentOption
              method={method}
              setMethod={setMethod}
              value="stripe"
              logo={stripe_logo}
            />
            {/* <PaymentOption
              method={method}
              setMethod={setMethod}
              value="razorpay"
              logo={razorpay_logo}
            /> */}
            <PaymentOption
              method={method}
              setMethod={setMethod}
              value="cod"
              label="CASH ON DELIVERY"
            />
          </div>
          <div className="w-full mt-8 text-end">
            <button
              type="submit"
              disabled={loading || processing}
              className="px-16 py-3 text-sm text-white rounded bg-bilbao-700 hover:bg-bilbao-900 transition disabled:opacity-50"
            >
              {processing
                ? "Processing..."
                : loading
                ? "Placing Order..."
                : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;