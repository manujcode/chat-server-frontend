import React, { useState } from "react";

const NavBar = ({handleLogout,mail}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-gray-300">
            My chat App with Server
          </a>
        </div>

        {/* Desktop Navigation Links */}
        

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <div className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
            User -  {mail}
          </div>
          <button onClick={()=>handleLogout()} className="px-4 py-2 bg-red-600 hover:bg-blue-700 rounded">
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
     
    </nav>
  );
};

export default NavBar;
