import { useEffect, useState } from "react";
import {
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { logoutUser } from "../features/userAuth/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems.length;
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(token);
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/login";
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeSearch = () => setIsSearchOpen(false);

  const navLinks = [
    "Fiction",
    "Non-Fiction",
    "Children",
    "Fantasy",
    "Thriller",
  ];

  return (
    <nav className="bg-white">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl p-1">
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="font-heading text-2xl font-bold absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0"
          >
            Book <span className="text-bilbao-700">Store</span>
          </Link>

          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden md:block w-1/2">
            <SearchBar />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={toggleSearch}
              className="md:hidden -mr-2.5 hover:text-bilbao-700 transition-colors"
            >
              <FiSearch className="text-xl" />
            </button>

            {/* User Account */}
            {auth ? (
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="hidden md:flex flex-col items-center cursor-pointer p-1 hover:text-bilbao-700 transition-colors"
                >
                  <FiUser className="text-xl" />
                  <span className="text-xs mt-1">Account</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border"
                >
                  <li>
                    <Link to="/profile" className="hover:bg-bilbao-50">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="hover:bg-bilbao-50">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:bg-bilbao-50"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex flex-col items-center cursor-pointer p-1 hover:text-bilbao-700 transition-colors"
              >
                <FiUser className="text-xl" />
                <span className="text-xs mt-1">Account</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex flex-col items-center cursor-pointer p-1 hover:text-bilbao-700 transition-colors"
            >
              <FiHeart className="text-xl" />
              {auth && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 md:-right-0 bg-red-700 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {wishlist.length > 99 ? "99+" : wishlist.length}
                </span>
              )}
              <span className="hidden md:block text-xs mt-1">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex flex-col items-center relative cursor-pointer p-1 hover:text-bilbao-700 transition-colors"
            >
              <FiShoppingBag className="text-xl" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartQuantity > 99 ? "99+" : cartQuantity}
                </span>
              )}
              <span className="hidden md:block text-xs mt-1">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <SearchBar isMobile={true} onSearchComplete={closeSearch} />
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50">
          <div className="w-4/5 max-w-xs bg-white shadow-xl h-full">
            <div className="flex justify-between items-center p-6 border-b border-black/10">
              <h2 className="text-xl font-bold text-bilbao-700">Menu</h2>
              <button onClick={toggleMenu} className="text-2xl p-1">
                <FiX />
              </button>
            </div>

            <div className="p-6">
              {/* Navigation Links */}
              <div className="space-y-4 mb-8">
                {navLinks.map((label) => (
                  <Link
                    key={label}
                    to={`/collection?category=${encodeURIComponent(
                      label.toLowerCase()
                    )}`}
                    onClick={toggleMenu}
                    className="block font-medium text-gray-700 hover:text-bilbao-700 transition-colors py-2"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Account Section for Mobile */}
              <div className="border-t border-black/10 pt-6">
                {auth ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700 mb-4">
                      <FiUser className="text-xl" />
                      <span className="font-medium">My Account</span>
                    </div>
                    <Link
                      to="/profile"
                      onClick={toggleMenu}
                      className="block pl-8 py-2 text-gray-600 hover:text-bilbao-700 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={toggleMenu}
                      className="block pl-8 py-2 text-gray-600 hover:text-bilbao-700 transition-colors"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="block pl-8 py-2 text-gray-600 hover:text-bilbao-700 transition-colors w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="flex items-center space-x-3 text-gray-700 hover:text-bilbao-700 transition-colors"
                  >
                    <FiUser className="text-xl" />
                    <span className="font-medium">My Account</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation Links */}
      <div className="hidden md:block border-y border-black/5">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-center space-x-8">
            {navLinks.map((label) => (
              <Link
                key={label}
                to={`/collection?category=${encodeURIComponent(
                  label.toLowerCase()
                )}`}
                className="font-medium text-gray-700 hover:text-bilbao-700 border-b-2 border-transparent hover:border-bilbao-700 transition-all duration-200 pb-1"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
