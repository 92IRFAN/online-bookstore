import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../features/order/orderThunk";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useDispatch();
  const { userOrders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="px-7 md:px-14.5 py-10 min-h-screen">
      <h2 className="text-2xl font-bold text-bilbao-700 mb-8">My Orders</h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
        </div>
      ) : userOrders?.length > 0 ? (
        <div className="space-y-8">
          {userOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg shadow p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-bilbao-700">
                    Order ID: <span className="text-black">{order._id}</span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on:{" "}
                    {new Date(order.orderDate).toLocaleString("en-GB")}
                  </p>
                </div>
                <div className="text-sm mt-2 sm:mt-0">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="capitalize">{order.orderStatus}</span> |{" "}
                  <span className="font-semibold">Payment:</span>{" "}
                  {order.paymentStatus}
                </div>
              </div>

              {/* Items */}
              <div className="space-y-4 border-t border-black/20 pt-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded border"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ${item.price}
                        </p>
                      </div>
                    </div>
                    <div className="text-right font-semibold text-bilbao-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-4 pt-4 border-t border-black/20 flex flex-col sm:flex-row sm:justify-between">
                <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                  <p>
                    <span className="font-semibold">Shipping To:</span>{" "}
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName},{" "}
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                    , {order.shippingAddress.state},{" "}
                    {order.shippingAddress.zipCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {order.shippingAddress.mobile}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {order.shippingAddress.email}
                  </p>
                </div>
                <div className="text-lg font-bold text-bilbao-700">
                  Total: ${order.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
