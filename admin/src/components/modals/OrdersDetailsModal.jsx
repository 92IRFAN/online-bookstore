
const OrdersDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const {
    _id,
    orderDate,
    orderStatus,
    totalAmount,
    paymentMethod,
    shippingAddress,
    items,
  } = order;

  const formattedDate = new Date(orderDate).toLocaleDateString();

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

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Order Details #{_id}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Order & Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-medium mb-4">Order Information</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Order Date:</dt>
                  <dd>{formattedDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Status:</dt>
                  <dd>
                    <span
                      className={`px-2 py-1 rounded-full text-sm capitalize ${getStatusColor(
                        orderStatus
                      )}`}
                    >
                      {orderStatus}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Total Amount:</dt>
                  <dd className="font-medium">${totalAmount.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Payment Method:</dt>
                  <dd>{paymentMethod.toUpperCase()}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h4 className="font-medium mb-4">Customer Information</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Name:</dt>
                  <dd>
                    {shippingAddress.firstName} {shippingAddress.lastName}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Email:</dt>
                  <dd>{shippingAddress.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Phone:</dt>
                  <dd>{shippingAddress.mobile}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Items Ordered */}
          <div className="mb-8">
            <h4 className="font-medium mb-4">Items Ordered</h4>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3">Book Title</th>
                    <th className="text-left px-4 py-3">Qty</th>
                    <th className="text-left px-4 py-3">Price</th>
                    <th className="text-left px-4 py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id} className="border-t border-gray-300">
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td
                      colSpan="3"
                      className="text-right px-4 py-3 font-medium"
                    >
                      Total
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      ${totalAmount.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Shipping */}
          <div className="mb-8">
            <h4 className="font-medium mb-4">Shipping Address</h4>
            <div className="border border-gray-300 rounded-lg p-4 text-sm text-gray-700">
              {shippingAddress.street}, {shippingAddress.city},{" "}
              {shippingAddress.state}, {shippingAddress.zipCode},{" "}
              {shippingAddress.country}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button
              onClick={handlePrintInvoice}
              className="px-4 py-2 bg-bilbao-700 text-white rounded-lg hover:bg-bilbao-900 transition-colors duration-200"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetailsModal;
