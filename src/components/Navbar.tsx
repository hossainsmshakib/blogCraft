import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaPlusCircle, FaBars, FaPen } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const NavLink: React.FC<{
    to: string;
    icon: React.ReactNode;
    text: string;
  }> = ({ to, icon, text }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center py-2 px-3 transition-colors duration-200 ${
          isActive
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }`}
      >
        {icon}
        <span className="ml-2 font-medium">{text}</span>
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 flex items-center"
          >
            <FaPen className="mr-2 text-gray-800" />
            BlogCraft
          </Link>
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" icon={<FaHome size={18} />} text="Home" />
            <NavLink
              to="/create"
              icon={<FaPlusCircle size={18} />}
              text="New Post"
            />
          </div>
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars size={24} />
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-100">
            <NavLink to="/" icon={<FaHome size={18} />} text="Home" />
            <NavLink
              to="/create"
              icon={<FaPlusCircle size={18} />}
              text="New Post"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
    