import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../features/users/usersThunk";
import { RiEditBoxLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import CustomerDetailsModal from "../components/modals/CustomerDetailsModal";
import EditCustomerModal from "../components/modals/EditCustomerModal";

const Customers = () => {
  const dispatch = useDispatch();
  const { usersList, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredUsers = usersList.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const resultAction = await dispatch(deleteUser(userId));
      if (deleteUser.fulfilled.match(resultAction)) {
        toast.success("Customer deleted successfully!");
      } else {
        toast.error("Failed to delete customer.");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border border-black/30 px-4 py-2 rounded-md w-full max-w-xs focus:outline-none focus:ring"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg text-bilbao-700"></span>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full text-left">
          <thead className="text-gray-500">
            <tr>
              <th className="py-3 px-4">S.No</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4 font-medium capitalize">
                  {user.name}
                </td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.isAdmin
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td className="py-4 px-4 space-x-2">
                  <button
                    onClick={() => setEditCustomer(user)}
                    className="tooltip text-blue-600 cursor-pointer text-normal"
                    data-tip="Edit"
                  >
                    <RiEditBoxLine className="inline-block mr-1" />
                  </button>
                  <button
                    onClick={() => setSelectedCustomer(user)}
                    className="tooltip text-blue-600 cursor-pointer text-lg"
                    data-tip="View"
                  >
                    <MdOutlineRemoveRedEye className="inline-block mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="tooltip text-red-600 cursor-pointer text-lg"
                    data-tip="Delete"
                  >
                    <AiOutlineDelete className="inline-block mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
      {editCustomer && (
        <EditCustomerModal
          customer={editCustomer}
          onClose={() => setEditCustomer(null)}
        />
      )}
    </div>
  );
};

export default Customers;
