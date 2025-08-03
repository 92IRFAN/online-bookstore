import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, fetchAllUsers } from "../../features/users/usersThunk"
import { toast } from "react-toastify";

const EditCustomerModal = ({ customer, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: customer.name,
    email: customer.email,
    isAdmin: customer.isAdmin,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      updateUser({ userId: customer._id, updatedData: formData })
    );

    if (updateUser.fulfilled.match(result)) {
      toast.success("Customer updated successfully!");
      dispatch(fetchAllUsers());
      onClose();
    } else {
      toast.error(result.payload || "Update failed.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              disabled
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              id="isAdmin"
            />
            <label htmlFor="isAdmin" className="text-sm">Is Admin</label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-bilbao-700 hover:bg-bilbao-900 transition-colors duration-300 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;
