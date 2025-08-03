import {
  FiHome,
  FiBookOpen,
  FiShoppingCart,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../features/adminAuth/adminAuthSlice"

const menuItems = [
  { icon: <FiHome />, label: "Dashboard", path: "/" },
  { icon: <FiBookOpen />, label: "Books", path: "/books" },
  { icon: <FiShoppingCart />, label: "Orders", path: "/orders" },
  { icon: <FiUsers />, label: "Customers", path: "/customers" },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    window.location.href = "/login";
  };

  return (
    <aside className="bg-white w-64 border-r border-gray-200 p-4 fixed h-full flex flex-col justify-between">
      {/* Top Logo and Navigation */}
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Book<span className="text-bilbao-700">Store</span>
          </h2>
          <p className="text-gray-500 text-sm">Admin Dashboard</p>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg ${
                      isActive
                        ? "text-gray-700 bg-green-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="w-5 h-5 mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="flex gap-2 items-center justify-center w-full p-2 text-sm text-gray-600 rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
        >
          <FiLogOut className="w-5 h-5 " />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
