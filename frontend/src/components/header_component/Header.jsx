import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="text-xl font-bold text-gray-900">
          LOGO
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-gray-100"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d={!open ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            className="font-medium text-gray-900 hover:text-gray-700"
            to="/home"
          >
            Home
          </Link>
          <Link
            className="font-medium text-gray-900 hover:text-gray-700"
            to="/about-us"
          >
            About Us
          </Link>
          <Link
            className="font-medium text-gray-900 hover:text-gray-700"
            to="/contact-us"
          >
            Contact Us
          </Link>
        </nav>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center">
          <Link
            className="font-semibold text-gray-900 hover:text-gray-700"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-200">
          <nav className="px-4 py-3 flex flex-col gap-3">
            <Link
              className="font-medium text-gray-900"
              to="/home"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              className="font-medium text-gray-900"
              to="/about-us"
              onClick={() => setOpen(false)}
            >
              About Us
            </Link>
            <Link
              className="font-medium text-gray-900"
              to="/contact-us"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              className="font-semibold text-gray-900 pt-2 border-t"
              to="/login"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
