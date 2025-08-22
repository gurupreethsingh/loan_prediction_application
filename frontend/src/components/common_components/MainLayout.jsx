// src/layouts/main_layout/MainLayout.jsx
import React, { useEffect } from "react";

import Header from "../header_component/Header";
import Footer from "../footer_component/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../../pages/user_pages/Login";
import Homepage from "../../pages/common_pages/Homepage";
import Register from "../../pages/user_pages/Register";
import ForgotPassword from "../../pages/user_pages/ForgotPassword";
import ResetPassword from "../../pages/user_pages/ResetPassword";
import UserDashboard from "../../pages/user_pages/UserDashboard";
import SuperAdminDashboard from "../../pages/superadmin_pages/SuperAdminDashboard";
import AboutUs from "../../pages/common_pages/AboutUs";
import ContactUs from "../../pages/common_pages/ContactUs";
import PageNotFound from "../../pages/common_pages/PageNotFound";
import PrivacyPolicy from "../../pages/common_pages/PrivacyPolicy";

// Small wrapper to set document title for each route
const Page = ({ title, children }) => {
  useEffect(() => {
    document.title = `Ecoders - ${title}` || "Ecoders - App";
  }, [title]);

  return children;
};

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Router>
        <Header />
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <Page title="Homepage">
                <Homepage title="Homepage" />
              </Page>
            }
          />
          <Route
            path="/home"
            element={
              <Page title="Homepage">
                <Homepage title="Homepage" />
              </Page>
            }
          />
          <Route
            path="/homepage"
            element={
              <Page title="Homepage">
                <Homepage title="Homepage" />
              </Page>
            }
          />

          {/* Static pages */}
          <Route
            path="/about-us"
            element={
              <Page title="About Us">
                <AboutUs title="About Us" />
              </Page>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Page title="Contact Us">
                <ContactUs title="Contact Us" />
              </Page>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Page title="Privacy Policy">
                <PrivacyPolicy title="Privacy Policy" />
              </Page>
            }
          />

          {/* Auth */}
          <Route
            path="/login"
            element={
              <Page title="Login">
                <Login title="Login" />
              </Page>
            }
          />
          <Route
            path="/register"
            element={
              <Page title="Register">
                <Register title="Register" />
              </Page>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Page title="Forgot Password">
                <ForgotPassword title="Forgot Password" />
              </Page>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Page title="Reset Password">
                <ResetPassword title="Reset Password" />
              </Page>
            }
          />

          {/* Dashboards */}
          <Route
            path="/user-dashboard"
            element={
              <Page title="User Dashboard">
                <UserDashboard title="User Dashboard" />
              </Page>
            }
          />
          <Route
            path="/super-admin-dashboard"
            element={
              <Page title="Super Admin Dashboard">
                <SuperAdminDashboard title="Super Admin Dashboard" />
              </Page>
            }
          />

          {/* 404 */}
          <Route
            path="/page-not-found"
            element={
              <Page title="Page Not Found">
                <PageNotFound title="Page Not Found" />
              </Page>
            }
          />
          <Route
            path="/*"
            element={
              <Page title="Page Not Found">
                <PageNotFound title="Page Not Found" />
              </Page>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default MainLayout;
