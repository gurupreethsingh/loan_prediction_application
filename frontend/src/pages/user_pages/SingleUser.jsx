// src/pages/superadmin_pages/SingleUser.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/config";

const API = globalBackendRoute; // e.g., http://localhost:5000

// ✅ Only the roles you support
const ROLES = [
  "accountant",
  "admin",
  "customer",
  "client",
  "customer_support",
  "superadmin",
  "user",
];

const prettyRole = (r) =>
  (r || "user").replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

const SingleUser = () => {
  const { id: routeId } = useParams();
  const navigate = useNavigate();

  const userId = routeId || "";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgOk, setImgOk] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  const [selectedRole, setSelectedRole] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch user details
  useEffect(() => {
    let active = true;
    (async () => {
      if (!userId) {
        setError("No user id provided.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/getUserById/${userId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Failed to fetch user");
        if (!active) return;
        setData(json);
        setSelectedRole(json?.role || "user");
        setImgOk(Boolean(json?.avatar));
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

  const avatarUrl = data?.avatar
    ? `${API}/${String(data.avatar).replace(/^\/+/, "")}`
    : "";

  const canSave = useMemo(() => {
    if (!data) return false;
    return selectedRole && selectedRole !== data.role && !saving;
  }, [data, selectedRole, saving]);

  const updateRole = async () => {
    if (!data) return;
    if (selectedRole === data.role) return;

    const ok = window.confirm(
      `Are you sure you want to change the role of "${
        data.name
      }" from "${prettyRole(data.role)}" to "${prettyRole(selectedRole)}"?`
    );
    if (!ok) return;

    try {
      setSaving(true);
      setMsg({ type: "", text: "" });

      const res = await fetch(`${API}/api/update-user-role/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed to update role");

      // Re-fetch to display the latest role value
      const r2 = await fetch(`${API}/api/getUserById/${userId}`);
      const d2 = await r2.json();
      if (r2.ok) {
        setData(d2);
      } else {
        setData((prev) => (prev ? { ...prev, role: selectedRole } : prev));
      }

      setMsg({
        type: "success",
        text: `Role updated to "${prettyRole(selectedRole)}" successfully.`,
      });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Something went wrong." });
    } finally {
      setSaving(false);
    }
  };

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
          <div className="mt-4 flex gap-3">
            <Link to="/all-users" className="text-gray-900 underline">
              Back to All Users
            </Link>
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
          User Profile
        </h1>
        <p className="text-gray-600 mt-1">
          View account information and update the user’s role.
        </p>

        {/* Alerts */}
        {msg.text ? (
          <div
            className={`mt-4 rounded-lg px-4 py-3 text-sm ${
              msg.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {msg.text}
          </div>
        ) : null}

        {/* Avatar & Basic info */}
        <div className="mt-6 flex items-center gap-6">
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
              <p className="text-gray-500 text-sm mt-1">
                Current Role: {prettyRole(data.role)}
              </p>
            ) : null}
            {data?._id ? (
              <p className="text-gray-400 text-xs mt-1">ID: {data._id}</p>
            ) : null}
          </div>
        </div>

        {/* Read-only details like Profile */}
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
              {[
                data?.address?.city,
                data?.address?.state,
                data?.address?.zip || data?.address?.postalCode,
              ]
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

        {/* Role changer */}
        <div className="mt-8 rounded-lg border p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            Update Role (Admin)
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <label htmlFor="role" className="text-sm text-gray-800">
              Select Role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-3 py-2 text-sm text-gray-900 bg-white sm:min-w-[260px]"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {prettyRole(r)}
                </option>
              ))}
            </select>

            <button
              onClick={updateRole}
              disabled={!canSave}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-white text-sm font-semibold ${
                canSave
                  ? "bg-gray-900 hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {saving ? "Updating…" : "Update Role"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            You will be asked to confirm before changing the role.
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/all-users"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-gray-900 text-sm font-semibold border hover:bg-gray-50"
          >
            Back to All Users
          </Link>
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

export default SingleUser;
