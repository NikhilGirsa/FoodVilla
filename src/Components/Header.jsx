import { Link, useNavigate } from "react-router";
import { FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState, useRef } from "react";
import HeaderUserSection from "./HandleUserSection";

import logo from "../../assets/foodvilla.png";
import { toggleLoginSidebar } from "../utils/toggleSlice";
import { IMG_CDN_URL } from "../utils/constants";

const Header = ({
  theme,
  setTheme,
  searchValue,
  setSearchValue,
  searchResults,
  setSearchResults,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const isLoginSidebarOpen = useSelector(
    (state) => state.toggle.isLoginSidebarOpen
  );

  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded?.name || decoded?.given_name);
    dispatch(toggleLoginSidebar());
  };

  const toggleDarkMode = () => {
    const newMode = isDarkMode ? "light" : "dark";
    setTheme(newMode);
    setIsDarkMode(!isDarkMode);
  };

  const handleSearchSelect = (restaurant) => {
    setSearchValue(""); // Clear input
    setSearchResults([]); // Hide dropdown
    navigate(`/restaurant/menu/${restaurant.info.id}`);
  };

  return (
    <div className="relative z-50">
      {/* Header Top Section */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-amber-200 dark:bg-orange-400 shadow-md transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img className="w-32" src={logo} alt="Food Villa Logo" />
          </Link>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-md mx-4">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={() => setTimeout(() => setSearchResults([]), 150)}
            ref={searchRef}
          />

          {searchResults.length > 0 && (
            <div className="absolute w-full mt-1 max-h-72 overflow-y-auto bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 z-50">
              {searchResults.map((restaurant) => (
                <div
                  key={restaurant?.info?.id}
                  onClick={() => handleSearchSelect(restaurant)}
                  className="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <img
                    src={IMG_CDN_URL + restaurant?.info?.cloudinaryImageId}
                    alt={restaurant?.info?.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {restaurant?.info?.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/contact"
                className="text-black dark:text-white hover:text-orange-500"
              >
                <FaPhoneAlt size={18} />
              </Link>
            </li>

            <li className="relative">
              <Link
                to="/cart"
                className="text-black dark:text-white hover:text-orange-500"
              >
                <FaShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <HeaderUserSection
                user={user}
                setUser={setUser}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                toggleTheme={toggleDarkMode}
              />
            </li>
          </ul>
        </nav>
      </div>

      {/* Login Sidebar */}
      {isLoginSidebarOpen && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex justify-end">
          <div
            className="w-full sm:w-[350px] bg-white dark:bg-gray-900 shadow-lg h-full p-6 flex flex-col justify-center relative animate-slide-in text-black dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => dispatch(toggleLoginSidebar())}
              className="absolute top-4 right-4 text-2xl text-gray-700 dark:text-white hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <p className="text-sm mb-6">
              or{" "}
              <span className="text-orange-500 font-medium">
                create an account
              </span>
            </p>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log("❌ Login Failed")}
            />
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-4">
              By clicking on Login, I accept the{" "}
              <span className="underline">Terms & Conditions</span> &{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
