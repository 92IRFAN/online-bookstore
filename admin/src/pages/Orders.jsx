import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders,updateOrderStatus } from "../features/customerOrders/OrdersThunk";
import { resetStatusUpdateStates } from "../features/customerOrders/OrdersSlice";
import OrdersDetailsModal from "../components/modals/OrdersDetailsModal";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { toast } from "react-toastify";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});
  const dispatch = useDispatch();
  const { orders, loading, error, statusUpdateSuccess, statusUpdateError } =
    useSelector((state) => state.customerOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Handle status update success/error notifications
  useEffect(() => {
    if (statusUpdateSuccess) {
      toast.success("Status Updated Successfully");
      dispatch(resetStatusUpdateStates());
    }
    if (statusUpdateError) {
      toast.error(statusUpdateError);
      dispatch(resetStatusUpdateStates());
    }
  }, [statusUpdateSuccess, statusUpdateError, dispatch]);

  // Initialize status updates when orders are loaded
  useEffect(() => {
    if (orders.length > 0) {
      const initialStatuses = {};
      orders.forEach((order) => {
        initialStatuses[order._id] = order.orderStatus; 
      });
      setStatusUpdates(initialStatuses);
    }
  }, [orders]);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleStatusUpdate = (orderId) => {
    const newStatus = statusUpdates[orderId];
    dispatch(
      updateOrderStatus({
        orderId,
        status: newStatus,
      })
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {loading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p className="text-gray-600">No orders found.</p>
      )}
      {!loading && !error && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Update Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-4">#{order._id.slice(-5).toUpperCase()}</td>
                  <td>
                    {order.shippingAddress?.firstName}{" "}
                    {order.shippingAddress?.lastName}
                  </td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-sm capitalize ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <select
                        value={statusUpdates[order._id] || order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 text-sm min-w-[100px]"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => handleStatusUpdate(order._id)}
                        disabled={
                          statusUpdates[order._id] === order.orderStatus
                        }
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          statusUpdates[order._id] === order.orderStatus
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-bilbao-700 text-white hover:bg-bilbao-900"
                        }`}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-300 cursor-pointer"
                    >
                      {/* View */}
                      <MdOutlineRemoveRedEye  className="inline-block mr-1 text-base"/> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Render modal if order is selected */}
      {selectedOrder && (
        <OrdersDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;
