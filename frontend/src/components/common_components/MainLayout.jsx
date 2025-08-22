// src/components/common_components/MainLayout.jsx
import React, { useEffect } from "react";
import Header from "../header_component/Header";
import Footer from "../footer_component/Footer";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../auth_components/AuthManager";

import Homepage from "../../pages/common_pages/Homepage";
import PageNotFound from "../../pages/common_pages/PageNotFound";
import ContactUs from "../../pages/common_pages/ContactUs";
import AboutUs from "../../pages/common_pages/AboutUs";
import Register from "../../pages/user_pages/Register";
import Login from "../../pages/user_pages/Login";
import SuperAdminDashboard from "../../pages/superadmin_pages/SuperAdminDashboard";
import UserDashboard from "../../pages/user_pages/UserDashboard";
import Profile from "../../pages/user_pages/Profile";
import UpdateProfile from "../../pages/user_pages/UpdateProfile";
import AllUsers from "../../pages/user_pages/AllUsers";
import SingleUser from "../../pages/user_pages/SingleUser";
import ForgotPassword from "../../pages/user_pages/ForgotPassword";
import ResetPassword from "../../pages/user_pages/ResetPassword";

import RoleLanding from "../common_components/RoleLanding";

// Small wrapper to set document title for each route
const PageTitle = ({ title, children }) => {
  useEffect(() => {
    document.title = `Ecoders - ${title}` || "Ecoders - App";
  }, [title]);

  return children;
};

const MainLayout = () => {
  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <main className="flex-grow py-6">
        <Routes>
          <Route
            path="/"
            element={
              <PageTitle title="Home">
                <Homepage />
              </PageTitle>
            }
          />
          <Route
            path="/home"
            element={
              <PageTitle title="Home">
                <Homepage />
              </PageTitle>
            }
          />
          <Route
            path="/homepage"
            element={
              <PageTitle title="Home">
                <Homepage />
              </PageTitle>
            }
          />

          {/* Public pages */}
          <Route
            path="/contact-us"
            element={
              <PageTitle title="Contact Us">
                <ContactUs />
              </PageTitle>
            }
          />
          <Route
            path="/about-us"
            element={
              <PrivateRoute>
                <PageTitle title="About Us">
                  <AboutUs />
                </PageTitle>
              </PrivateRoute>
            }
          />

          {/* Auth */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <PageTitle title="Login">
                  <Login />
                </PageTitle>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <PageTitle title="Register">
                  <Register />
                </PageTitle>
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PageTitle title="Forgot Password">
                <ForgotPassword />
              </PageTitle>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PageTitle title="Reset Password">
                <ResetPassword />
              </PageTitle>
            }
          />

          {/* “Smart” dashboard route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <RoleLanding />
              </PrivateRoute>
            }
          />

          {/* Specific dashboards */}
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute
                allowedRoles={["user", "customer", "client", "superadmin"]}
              >
                <PageTitle title="User Dashboard">
                  <UserDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          <Route
            path="/superadmin-dashboard"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="SuperAdmin Dashboard">
                  <SuperAdminDashboard />
                </PageTitle>
              </PrivateRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <PageTitle title="Profile">
                  <Profile />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-profile/:id"
            element={
              <PrivateRoute>
                <PageTitle title="Update Profile">
                  <UpdateProfile />
                </PageTitle>
              </PrivateRoute>
            }
          />

          {/* Admin-only management routes */}
          <Route
            path="/all-users"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="All Users">
                  <AllUsers />
                </PageTitle>
              </PrivateRoute>
            }
          />
          <Route
            path="/single-user/:id"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <PageTitle title="Single User">
                  <SingleUser />
                </PageTitle>
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route
            path="/page-not-found"
            element={
              <PageTitle title="404 Not Found">
                <PageNotFound />
              </PageTitle>
            }
          />
          <Route
            path="/*"
            element={
              <PageTitle title="404 Not Found">
                <PageNotFound />
              </PageTitle>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
