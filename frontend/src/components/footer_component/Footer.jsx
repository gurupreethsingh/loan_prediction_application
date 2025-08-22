import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="footer bg-gray-600 p-5 shadow">
        <div className="footer_layout flex justify-evenly items-center flex-wrap">
          <div className="address text-center">
            <h3 className="address_heading font-bold  text-gray-100">
              Address
            </h3>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link text-gray-100" href="/contact-us">
                  Nihal, #142, Bangalore
                </a>
              </li>
            </ul>
          </div>
          <div className="address text-center">
            <h3 className="quicklinks_heading font-bold  text-gray-100">
              Quick Links
            </h3>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link text-gray-100" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-gray-100" href="/about-us">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-gray-100" href="/contact-us">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="social_section text-center">
            <h3 className="social_heading font-bold text-gray-100">Social</h3>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link text-gray-100"
                  href="https://www.facebook.com"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-gray-100"
                  href="https://www.twitter.com"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-gray-100"
                  href="https://www.linkedin.com"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="license_section text-center">
            <h3 className="_heading font-bold  text-gray-100">
              Licence & Agreement
            </h3>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link text-gray-100" href="/privacy-policy">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
