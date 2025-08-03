import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../features/customerOrders/OrdersThunk";
import { Link } from "react-router-dom"

const RecentOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.customerOrders
  );

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <Link to="/orders" className="px-4 py-2 bg-bilbao-700 text-white rounded-lg hover:bg-bilbao-900 transition duration-200 cursor-pointer">
          View All
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                [...orders]
                  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                  .slice(0, 5)
                  .map((order) => (
                    <tr className="border-b" key={order._id}>
                      <td className="py-4">#{order._id.slice(-5).toUpperCase()}</td>
                      <td>
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            order.orderStatus === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.orderStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.orderStatus.charAt(0).toUpperCase() +
                            order.orderStatus.slice(1)}
                        </span>
                      </td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
