import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3">Address</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact-us" className="hover:underline">
                  Nihal, #142, Bangalore
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3">Social</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3">
              Licence &amp; Agreement
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
