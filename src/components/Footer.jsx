import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Branding */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-white">Task Manager</h2>
          <p className="mt-2 text-sm">Organize your tasks efficiently.</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <nav className="mt-2 flex flex-col space-y-2">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/add" className="hover:text-primary">Add Task</Link>
            <Link to="/login" className="hover:text-primary">Login</Link>
            <Link to="/register" className="hover:text-primary">Register</Link>
          </nav>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="mt-3 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Task Manager. All Rights Reserved.
      </div>
    </footer>
  );
}
