// src/pages/superadmin_pages/SuperAdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/config";

// Feather icons only (all of these exist in react-icons/fi)
import {
  FiHome,
  FiSearch,
  FiUsers,
  FiUser,
  FiUserPlus,
  FiUserCheck,
  FiShield,
  FiHeadphones,
  FiBriefcase,
  FiInbox,
  FiMessageCircle,
  FiSettings,
} from "react-icons/fi";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const API_ROOT =
    globalBackendRoute ||
    import.meta?.env?.VITE_BACKEND_URL ||
    "http://localhost:5000";

  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Fetch dynamic role counts (and totalUsers) from your controller
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_ROOT}/api/getUserCountsByRole`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Failed to fetch counts");
        if (active) setCounts(json || {});
      } catch (e) {
        if (active) setErr(e.message || "Something went wrong");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [API_ROOT]);

  const totalUsers = counts?.totalUsers ?? 0;

  const roleCount = (role) => counts?.[role] ?? 0;

  // Cards on the main dashboard
  const cards = useMemo(
    () => [
      {
        key: "total",
        title: "All Users",
        count: totalUsers,
        to: "/all-users",
        icon: <FiUsers className="h-6 w-6" />,
      },
      {
        key: "admin",
        title: "Admins",
        count: roleCount("admin"),
        to: "/all-users?role=admin",
        icon: <FiShield className="h-6 w-6" />,
      },
      {
        key: "superadmin",
        title: "Superadmins",
        count: roleCount("superadmin"),
        to: "/all-users?role=superadmin",
        icon: <FiShield className="h-6 w-6" />,
      },
      {
        key: "user",
        title: "Users",
        count: roleCount("user"),
        to: "/all-users?role=user",
        icon: <FiUser className="h-6 w-6" />,
      },
      {
        key: "customer",
        title: "Customers",
        count: roleCount("customer"),
        to: "/all-users?role=customer",
        icon: <FiUserPlus className="h-6 w-6" />,
      },
      {
        key: "client",
        title: "Clients",
        count: roleCount("client"),
        to: "/all-users?role=client",
        icon: <FiUserCheck className="h-6 w-6" />,
      },
      {
        key: "customer_support",
        title: "Customer Support",
        count: roleCount("customer_support"),
        to: "/all-users?role=customer_support",
        icon: <FiHeadphones className="h-6 w-6" />,
      },
      {
        key: "accountant",
        title: "Accountants",
        count: roleCount("accountant"),
        to: "/all-users?role=accountant",
        icon: <FiBriefcase className="h-6 w-6" />,
      },
    ],
    [totalUsers, counts]
  );

  const onSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/all-users?search=${encodeURIComponent(q)}` : "/all-users");
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-6">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
          Superadmin Dashboard
        </h1>

        {/* Search (center) */}
        <form
          onSubmit={onSearch}
          className="flex-1 w-full max-w-2xl mx-auto md:mx-0"
        >
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="search"
              placeholder="Search users by name, email, phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-400"
            />
          </div>
        </form>

        {/* Total count (right) */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-lg">
          <FiUsers className="h-5 w-5 text-gray-700" />
          <span className="text-sm text-gray-700">
            <span className="font-semibold">{totalUsers}</span> total users
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-white border rounded-lg p-4">
          <nav className="space-y-1">
            <Link
              to="/superadmin-dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiHome className="h-5 w-5" />
              <span>Dashboard Home</span>
            </Link>
            <Link
              to="/all-users"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiUsers className="h-5 w-5" />
              <span>All Users</span>
            </Link>
            <Link
              to="/all-messages"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiInbox className="h-5 w-5" />
              <span>Inbox / Messages</span>
            </Link>
            <Link
              to="/all-replies"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiMessageCircle className="h-5 w-5" />
              <span>Replies</span>
            </Link>

            <Link
              to="/trash"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiMessageCircle className="h-5 w-5" />
              <span>Trash</span>
            </Link>
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiSettings className="h-5 w-5" />
              <span>Admin Tools</span>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <section>
          {/* Error / Loading */}
          {err ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {err}
            </div>
          ) : null}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-24 rounded-lg border bg-white p-4">
                  <div className="h-5 w-28 bg-gray-200 rounded mb-3" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((c) => (
                <Link
                  key={c.key}
                  to={c.to}
                  className="group rounded-lg border bg-white p-4 hover:shadow transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{c.title}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {c.count}
                        </p>
                      </div>
                    </div>
                    {/* simple arrow cue */}
                    <svg
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
