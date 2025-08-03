
const CustomerDetailsModal = ({ customer, onClose }) => {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Customer Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-medium mb-1">Name</h4>
            <p className="text-gray-700">{customer.name}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Email</h4>
            <p className="text-gray-700">{customer.email}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Role</h4>
            <p className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              customer.isAdmin ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            }`}>
              {customer.isAdmin ? "Admin" : "User"}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Address</h4>
            <p className="text-gray-700">
              {customer.address?.street || "-"}<br />
              {customer.address?.city || ""} {customer.address?.zip || ""}<br />
              {customer.address?.state || ""}, {customer.address?.country || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
