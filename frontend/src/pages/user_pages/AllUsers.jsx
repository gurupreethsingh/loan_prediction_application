// src/pages/superadmin_pages/AllUsers.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/config";

const API_ROOT =
  globalBackendRoute ||
  import.meta?.env?.VITE_BACKEND_URL ||
  "http://localhost:5000";
const API = `${API_ROOT}/api`;

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [countsByRole, setCountsByRole] = useState({});
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");

  // fetch users + counts
  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        setLoading(true);
        const [uRes, cRes] = await Promise.all([
          fetch(`${API}/all-users`),
          fetch(`${API}/getUserCountsByRole`),
        ]);
        const [uJson, cJson] = await Promise.all([uRes.json(), cRes.json()]);
        if (!uRes.ok) throw new Error(uJson?.message || "Failed to load users");
        if (!cRes.ok)
          throw new Error(cJson?.message || "Failed to load counts");
        if (!isActive) return;
        setUsers(Array.isArray(uJson) ? uJson : []);
        setCountsByRole(cJson || {});
      } catch (e) {
        setMsg({ type: "error", text: e.message || "Failed to load data." });
      } finally {
        if (isActive) setLoading(false);
      }
    })();
    return () => {
      isActive = false;
    };
  }, []);

  // roles for dropdown (dynamic from counts)
  const roleOptions = useMemo(() => {
    const keys = Object.keys(countsByRole || {}).filter(
      (k) => k !== "totalUsers"
    );
    // Fallback: also read unique roles from users if counts endpoint is empty
    const fromUsers = Array.from(
      new Set(users.map((u) => u.role).filter(Boolean))
    );
    const merged = Array.from(new Set([...keys, ...fromUsers])).sort();
    return merged;
  }, [countsByRole, users]);

  // client-side filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchesRole =
        role === "all"
          ? true
          : (u.role || "").toLowerCase() === role.toLowerCase();

      if (!q) return matchesRole;

      const hay = [
        u.name,
        u.email,
        u.phone,
        u.role,
        u?.address?.street,
        u?.address?.city,
        u?.address?.state,
        u?.address?.postalCode,
        u?.address?.country,
        u.companyName,
        u.companyEmail,
        u.companyAddress,
        u.gstNumber,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesRole && hay.includes(q);
    });
  }, [users, query, role]);

  const total = users.length;
  const visible = filtered.length;

  const handleDelete = async (e, id, userRole) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;

    try {
      const res = await fetch(`${API}/delete-user/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Delete failed.");

      // remove from UI
      setUsers((prev) => prev.filter((u) => u._id !== id));
      // update counts locally if we have them
      setCountsByRole((prev) => {
        const next = { ...prev };
        if (typeof next.totalUsers === "number")
          next.totalUsers = Math.max(0, next.totalUsers - 1);
        if (userRole && typeof next[userRole] === "number") {
          next[userRole] = Math.max(0, next[userRole] - 1);
        }
        return next;
      });

      setMsg({
        type: "success",
        text: data?.message || "User deleted successfully.",
      });
      // auto-clear success after a moment
      setTimeout(() => setMsg({ type: "", text: "" }), 1200);
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Something went wrong." });
    }
  };

  const prettyRole = (r) =>
    (r || "user").replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

  const avatarUrl = (u) => {
    if (!u?.avatar) return "";
    return u.avatar.startsWith("http") ? u.avatar : `${API_ROOT}/${u.avatar}`;
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
      {/* top toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          All Users
        </h1>

        {/* Center: Search */}
        <div className="flex-1 md:max-w-xl md:mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, phone, role, address…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 pl-10 text-gray-900 placeholder-gray-400"
            />
            {/* search icon */}
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="7" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Right: Count + Role Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm md:text-base text-gray-700">
            Showing <span className="font-semibold">{visible}</span> of{" "}
            <span className="font-semibold">{total}</span>
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-3 py-2 text-sm text-gray-900 bg-white"
            aria-label="Filter by role"
          >
            <option value="all">All roles</option>
            {roleOptions.map((r) => (
              <option key={r} value={r}>
                {prettyRole(r)}{" "}
                {typeof countsByRole[r] === "number"
                  ? ` (${countsByRole[r]})`
                  : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* alert */}
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

      {/* loading state */}
      {loading ? (
        <div className="mt-10 text-center text-gray-600">Loading users…</div>
      ) : (
        <>
          {/* empty state */}
          {filtered.length === 0 ? (
            <div className="mt-10 text-center text-gray-600">
              No users found.
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((u) => {
                const url = avatarUrl(u);
                const initials =
                  (u?.name || "U")
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "U";

                return (
                  <Link
                    key={u._id}
                    to={`/single-user/${u._id}`}
                    className="relative block rounded-xl border border-gray-200 bg-white p-4 hover:shadow transition"
                  >
                    {/* delete button (stops link) */}
                    <button
                      title="Delete user"
                      onClick={(e) => handleDelete(e, u._id, u.role)}
                      className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-50"
                    >
                      <svg
                        className="h-4 w-4 text-red-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 6h18"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8 6V5a2 2 0 012-2h4a2 2 0 012 2v1"
                          strokeWidth="2"
                        />
                        <path
                          d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"
                          strokeWidth="2"
                        />
                        <path
                          d="M10 11v6M14 11v6"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>

                    {/* avatar + name */}
                    <div className="flex items-center gap-3">
                      {url ? (
                        <img
                          src={url}
                          alt={`${u.name || "User"} avatar`}
                          className="h-12 w-12 rounded-full object-cover border"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      ) : (
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white text-sm">
                          {initials}
                        </span>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900 truncate max-w-[180px]">
                          {u.name || "Unnamed"}
                        </div>
                        <div className="text-xs mt-1">
                          <span className="inline-block rounded-full bg-gray-100 text-gray-800 px-2 py-0.5">
                            {prettyRole(u.role)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* meta */}
                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      {u.email ? (
                        <div className="truncate">{u.email}</div>
                      ) : null}
                      {u.phone ? (
                        <div className="truncate">{u.phone}</div>
                      ) : null}
                      {(u?.address?.city || u?.address?.state) && (
                        <div className="truncate">
                          {[u.address?.city, u.address?.state]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllUsers;
