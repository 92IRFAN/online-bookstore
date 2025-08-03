import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handlePaymentSuccess } from "../utils/stripePayment";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    handlePaymentSuccess({
      sessionId,
      navigate,
      dispatch,
      setOrderDetails,
      setLoading,
    });
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bilbao-700 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Your order has been placed successfully.
          </p>
        </div>

        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Order Details
            </h2>
            <p className="text-sm text-gray-600">
              Order ID:{" "}
              <span className="font-mono">{orderDetails.orderId}</span>
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-bilbao-700 text-white py-2 px-4 rounded-lg hover:bg-bilbao-800 transition-colors"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
