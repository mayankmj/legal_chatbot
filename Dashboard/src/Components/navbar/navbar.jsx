import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import logoo from "../Login/Assets/logo.jpg";
import { auth } from "../Login/firebase";

const Navbar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest(".avatar")) {
      setIsDropdownOpen(false);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      window.open("/", "_self");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="w-full bg-sky-950">
      <div className="container mx-auto flex justify-between items-center py-2 px-1">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logoo} alt="NyaySetu Logo" className="w-36 h-auto" />
          </Link>
        </div>

        {/* Avatar/Notification */}
        {location.pathname !== '/Chat' && (
          <div className="relative">
            <div
              className="cursor-pointer flex items-center space-x-3"
              onClick={toggleDropdown}
              onBlur={closeDropdown}
            >
              <img
                src={user?.photoURL}
                alt="Avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
