import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { toggleLoginSidebar } from "../utils/toggleSlice";
import { googleLogout } from "@react-oauth/google";

const HeaderUserSection = ({ user, setUser, toggleTheme }) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  return (
    <>
      {user ? (
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 cursor-pointer transition">
            <FaUserCircle size={22} />
            <span>{user}</span>
          </div>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 transition-all">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={toggleTheme}
                >
                  Toggle Dark Mode
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 cursor-pointer transition"
          onClick={() => dispatch(toggleLoginSidebar())}
        >
          <FaUserCircle size={22} />
          <span>Sign In</span>
        </div>
      )}
    </>
  );
};

export default HeaderUserSection;
