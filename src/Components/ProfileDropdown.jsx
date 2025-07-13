import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const ProfileDropdown = ({ user, onLogout, onToggleTheme }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <div
        className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-orange-500 dark:text-white"
        onMouseEnter={() => setOpen(true)}
      >
        <FaUserCircle size={20} />
        <span>{user?.name?.split(" ")[0] || "Profile"}</span>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-lg py-2 z-50 text-sm text-gray-700 dark:text-gray-200">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {}}
          >
            Profile
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onToggleTheme}
          >
            Toggle Dark Mode
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
