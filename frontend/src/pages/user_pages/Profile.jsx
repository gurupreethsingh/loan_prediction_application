// src/pages/user_pages/Profile.jsx
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/config";
import { AuthContext } from "../../components/auth_components/AuthManager";

const Profile = () => {
  const { user: authUser } = useContext(AuthContext);
  const { id: routeId } = useParams();
  const navigate = useNavigate();

  const API = globalBackendRoute; // e.g., http://localhost:5000
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgOk, setImgOk] = useState(true);
  const [error, setError] = useState("");

  // Get a user id to use: route param -> auth context -> localStorage
  const userId = useMemo(() => {
    if (routeId) return routeId;
    if (authUser?.id || authUser?._id) return authUser.id || authUser._id;
    try {
      const local = JSON.parse(localStorage.getItem("user") || "{}");
      return local.id || local._id || "";
    } catch {
      return "";
    }
  }, [routeId, authUser]);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!userId) {
        setError("No user id found.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API}/api/getUserById/${userId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Failed to fetch user");
        if (active) {
          setData(json);
          setImgOk(Boolean(json?.avatar));
        }
      } catch (err) {
        if (active) setError(err.message || "Something went wrong");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [API, userId]);

  // Build full avatar URL (server should static serve /uploads)
  const avatarUrl = data?.avatar
    ? `${API}/${data.avatar.replace(/^\/+/, "")}`
    : "";

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        <div className="max-w-3xl mx-auto bg-white p-6 md:p-8">
          <div className="h-6 w-40 bg-gray-200 mb-4" />
          <div className="h-40 w-40 bg-gray-200 rounded-full mb-6" />
          <div className="h-4 w-64 bg-gray-200 mb-2" />
          <div className="h-4 w-56 bg-gray-200 mb-2" />
          <div className="h-4 w-48 bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        <div className="max-w-3xl mx-auto bg-white p-6 md:p-8">
          <p className="text-red-600">{error}</p>
          <div className="mt-4">
            <Link to="/dashboard" className="text-gray-900 underline">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          My Profile
        </h1>
        <p className="text-gray-600 mt-1">
          View your account information and update your details.
        </p>

        {/* Avatar + Basic */}
        <div className="mt-6 flex items-center gap-6">
          {/* Avatar with safe fallback */}
          {imgOk && avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="h-24 w-24 rounded-full object-cover border"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-semibold">
              {(data?.name || "U")
                .split(" ")
                .map((s) => s[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {data?.name}
            </h2>
            <p className="text-gray-700">{data?.email}</p>
            {data?.role ? (
              <p className="text-gray-500 text-sm mt-1">Role: {data.role}</p>
            ) : null}
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Email:</span> {data?.email || "—"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Phone:</span> {data?.phone || "—"}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-sm text-gray-700">
              {data?.address?.line1 || data?.address?.street || "—"}
            </p>
            <p className="text-sm text-gray-700">
              {[data?.address?.city, data?.address?.state, data?.address?.zip]
                .filter(Boolean)
                .join(", ") || "—"}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Name:</span>{" "}
              {data?.companyName || "—"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Email:</span>{" "}
              {data?.companyEmail || "—"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">GST:</span> {data?.gstNumber || "—"}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Preferences</h3>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Promotions:</span>{" "}
              {data?.promotionalConsent ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => navigate(`/update-profile/${userId}`)}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-white text-sm font-semibold bg-gray-900 hover:bg-gray-800"
          >
            Update Profile
          </button>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-gray-900 text-sm font-semibold border hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
