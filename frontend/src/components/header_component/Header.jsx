// src/components/header_components/Header.jsx
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth_components/AuthManager";

const ROLE_ROUTE = {
  superadmin: "/superadmin-dashboard",
  user: "/user-dashboard",
  customer: "/customer-dashboard",
  client: "/client-dashboard",
  default: "/user-dashboard",
};

const getDashboardPath = (role) => ROLE_ROUTE[role] || ROLE_ROUTE.default;

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useContext(AuthContext); // 👈 use context

  const [open, setOpen] = useState(false); // mobile menu
  const [menuOpen, setMenuOpen] = useState(false); // user dropdown
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    // clear storage just in case (AuthManager.logout handles token too)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    logout(); // 👈 update context (this triggers PrivateRoute redirect logic)
    navigate("/login"); // optional immediate navigation
  };

  const userName = user?.name || "User";
  const initials =
    (userName &&
      userName
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()) ||
    "U";

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
          {!isLoggedIn ? (
            <Link
              className="font-semibold text-gray-900 hover:text-gray-700"
              to="/login"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white text-sm">
                  {initials}
                </span>
                <span className="font-semibold text-gray-900 max-w-[140px] truncate">
                  {userName}
                </span>
                <svg
                  className={`h-4 w-4 text-gray-700 ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                </svg>
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-20"
                  role="menu"
                >
                  <Link
                    to={`/profile/${user?.id || user?._id || ""}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <button
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(getDashboardPath(user?.role));
                    }}
                    role="menuitem"
                  >
                    Dashboard
                  </button>
                  <div className="my-1 border-t border-gray-200" />
                  <button
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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

            {!isLoggedIn ? (
              <Link
                className="font-semibold text-gray-900 pt-2 border-t"
                to="/login"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            ) : (
              <>
                <div className="pt-2 border-t text-sm text-gray-600">
                  Signed in as{" "}
                  <span className="font-semibold text-gray-900">
                    {userName}
                  </span>
                </div>
                <Link
                  to={`/profile/${user?.id || user?._id || ""}`}
                  className="text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="text-left text-gray-900"
                  onClick={() => {
                    setOpen(false);
                    navigate(getDashboardPath(user?.role));
                  }}
                >
                  Dashboard
                </button>
                <button
                  className="text-left text-red-600"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
