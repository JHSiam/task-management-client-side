import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaTasks, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../authentication/AuthProvider";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow-lg p-4 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Add Task Button */}
        <Link to="/" className="btn btn-outline flex items-center gap-2">
          <FaTasks /> Today's Task
        </Link>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu & Mobile Dropdown */}
        <div className={`lg:flex items-center gap-6 ${isOpen ? "block" : "hidden"} absolute lg:static top-16 left-0 w-full lg:w-auto bg-base-100 lg:bg-transparent shadow-lg lg:shadow-none p-4 lg:p-0`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Today's Task Button */}
            <Link to="/add" className="btn btn-primary flex items-center gap-2">
              <FaPlus /> Add Task
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* User Profile Picture */}
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-primary"
                  />
                )}
                {/* User Name */}
                <span className="font-medium">{user.displayName}</span>
                {/* Logout Button */}
                <button onClick={logout} className="btn btn-error">Logout</button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-4">
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-accent">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
