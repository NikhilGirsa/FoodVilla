import { FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import HeaderUserSection from "./HandleUserSection";

import logo from "../../assets/foodvilla.png";
import { toggleLoginSidebar } from "../utils/toggleSlice";
import { useState } from "react";

const Header = ({ theme, setTheme }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const isLoginSidebarOpen = useSelector(
    (state) => state.toggle.isLoginSidebarOpen
  );

  const [user, setUser] = useState(null);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded?.name || decoded?.given_name);
    dispatch(toggleLoginSidebar());
  };

  const toggleDarkMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <>
      {/* Header */}
      <div
        className={`${
          theme === "dark" ? "bg-orange-600" : ""
        } flex items-center justify-between p-4 bg-amber-200 shadow-md transition-colors duration-300`}
      >
        <div className="flex items-center">
          <Link to="/">
            <img className="w-32" src={logo} alt="Food Villa Logo" />
          </Link>
        </div>

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
                toggleTheme={toggleDarkMode}
              />
            </li>

            <li>
              <button
                onClick={toggleDarkMode}
                className="px-3 py-1 rounded bg-gray-200 cursor-pointer dark:bg-gray-700 text-black dark:text-white"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
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
    </>
  );
};

export default Header;
