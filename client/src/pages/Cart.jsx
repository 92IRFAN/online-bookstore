import { FaMinus, FaPlus, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/login");
    } else {
      navigate("/place-order");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="px-4 md:px-15 py-6 md:py-10 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-bilbao-700 mb-4">
            Your basket is empty
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            You have no items in your shopping basket...
          </p>
          <button onClick={() => navigate('/collection')} className="px-8 py-3 bg-bilbao-700 hover:bg-bilbao-800 text-white font-semibold rounded-lg transition-colors duration-300">
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-16 py-6 md:py-10 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-semibold text-bilbao-700 mb-6">
        Your Basket
      </h2>

      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:grid grid-cols-12 gap-4 font-semibold text-gray-500 border-b border-black/10 pb-2 mb-4">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-right">Subtotal</div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 md:space-y-0">
        {cartItems.map((item) => (
          <div key={item._id}>
            {/* Mobile Layout */}
            <div className="md:hidden bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex gap-3">
                <img
                  src={item.cover.url}
                  alt={item.title}
                  className="w-16 h-20 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-xs text-red-500 underline"
                    >
                      Remove?
                    </button>
                  </div>
                </div>
              </div>

              {/* Quantity Controls - Mobile */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-600">Quantity:</span>
                <div className="flex items-center">
                  <button
                    className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md ${
                      item.quantity <= 1
                        ? "cursor-not-allowed"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => dispatch(decreaseQty(item._id))}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus
                      className={`text-xs ${
                        item.quantity <= 1 ? "text-gray-400" : "text-gray-600"
                      }`}
                    />
                  </button>
                  <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(increaseQty(item._id))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-white hover:bg-gray-50"
                  >
                    <FaPlus className="text-xs text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-12 gap-4 items-center border-b border-black/10 py-4">
              {/* Product Info */}
              <div className="flex col-span-6 gap-4">
                <img
                  src={item.cover.url}
                  alt={item.title}
                  className="w-20 h-28 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-sm text-red-500 mt-4 underline cursor-pointer"
                  >
                    Remove?
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-right text-gray-700 font-medium">
                ${item.price.toFixed(2)}
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex items-center justify-center text-black/70">
                <button
                  className={`p-3 border border-black/10 rounded-s-md ${
                    item.quantity <= 1
                      ? "cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => dispatch(decreaseQty(item._id))}
                  disabled={item.quantity <= 1}
                >
                  <FaMinus
                    className={`text-xs ${
                      item.quantity <= 1 ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                </button>
                <span className="p-3 py-1.5 border-t border-b border-black/10 text-black min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increaseQty(item._id))}
                  className="p-3 border border-black/10 rounded-e-md hover:bg-gray-50"
                >
                  <FaPlus className="text-xs" />
                </button>
              </div>

              {/* Subtotal */}
              <div className="col-span-2 text-right font-semibold text-gray-700">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8">
        {/* Mobile Summary */}
        <div className="md:hidden bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-800 pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full mt-4 px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-sm font-semibold rounded flex items-center justify-center gap-2 transition-colors duration-300">
            <FaLock /> Continue to Checkout
          </button>
        </div>

        {/* Desktop Summary */}
        <div className="hidden md:flex flex-col items-end">
          <div className="w-full sm:w-1/2 md:w-1/3 space-y-1 text-right">
            <p className="text-sm text-gray-700">
              Subtotal{" "}
              <span className="ml-2 font-semibold">${subtotal.toFixed(2)}</span>
            </p>
            <p className="text-lg font-bold text-green-800">
              Total <span className="ml-2">${subtotal.toFixed(2)}</span>
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-sm font-semibold rounded flex items-center gap-2 transition-colors duration-300 cursor-pointer"
          >
            <FaLock /> Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
