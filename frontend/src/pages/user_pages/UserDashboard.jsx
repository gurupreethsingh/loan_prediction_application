// src/pages/user_pages/UserDashboard.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/config";
import { AuthContext } from "../../components/auth_components/AuthManager";

import {
  FiHome,
  FiSearch,
  FiUser,
  FiClipboard,
  FiPercent, // ← replace FiCalculator with FiPercent
  FiCreditCard,
  FiDollarSign,
  FiPieChart,
  FiFileText,
  FiTrendingUp,
  FiMail,
  FiHelpCircle,
  FiSettings,
} from "react-icons/fi";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user: authUser } = useContext(AuthContext);
  const API_ROOT =
    globalBackendRoute ||
    import.meta?.env?.VITE_BACKEND_URL ||
    "http://localhost:5000";

  const me = useMemo(() => {
    if (authUser) return authUser;
    try {
      const local = JSON.parse(localStorage.getItem("user") || "{}");
      return local || null;
    } catch {
      return null;
    }
  }, [authUser]);

  const displayName = me?.name || "User";
  const userEmail = me?.email || "";

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [myMsgCounts, setMyMsgCounts] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
  });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_ROOT}/api/all-messages`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load messages.");

        const mine = Array.isArray(json)
          ? json.filter((m) =>
              userEmail
                ? (m.email || "").toLowerCase() === userEmail.toLowerCase()
                : false
            )
          : [];

        const total = mine.length;
        const unread = mine.filter((m) => !m.isRead).length;
        const read = total - unread;
        const replied = mine.filter((m) => (m.replies?.length || 0) > 0).length;

        if (active) setMyMsgCounts({ total, unread, read, replied });
      } catch (e) {
        if (active) setErr(e.message || "Something went wrong.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [API_ROOT, userEmail]);

  const cards = useMemo(
    () => [
      {
        key: "apply-loan",
        title: "Apply Loan",
        count: "Start",
        to: "/apply-loan",
        icon: <FiClipboard className="h-6 w-6" />,
      },
      {
        key: "emi-calc",
        title: "EMI Calculator",
        count: "Open",
        to: "/emi-calculator",
        icon: <FiPercent className="h-6 w-6" />, // ← valid Feather icon
      },
      {
        key: "my-apps",
        title: "My Applications",
        count: "View",
        to: "/my-applications",
        icon: <FiFileText className="h-6 w-6" />,
      },
      {
        key: "payments",
        title: "Payments",
        count: "Go",
        to: "/payments",
        icon: <FiDollarSign className="h-6 w-6" />,
      },
      {
        key: "statements",
        title: "Statements",
        count: "View",
        to: "/statements",
        icon: <FiFileText className="h-6 w-6" />,
      },
      {
        key: "credit-cards",
        title: "Credit Cards",
        count: "Explore",
        to: "/credit-cards",
        icon: <FiCreditCard className="h-6 w-6" />,
      },
      {
        key: "insurance",
        title: "Insurance",
        count: "Explore",
        to: "/insurance",
        icon: <FiPieChart className="h-6 w-6" />,
      },
      {
        key: "investments",
        title: "Investments",
        count: "Explore",
        to: "/investments",
        icon: <FiTrendingUp className="h-6 w-6" />,
      },
      {
        key: "messages",
        title: "My Messages",
        count: myMsgCounts.total,
        to: "/all-messages",
        icon: <FiMail className="h-6 w-6" />,
      },
      {
        key: "support",
        title: "Help & Support",
        count: "Ask",
        to: "/contact-us",
        icon: <FiHelpCircle className="h-6 w-6" />,
      },
    ],
    [myMsgCounts]
  );

  const onSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/user-dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-6">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
          User Dashboard
        </h1>

        <form
          onSubmit={onSearch}
          className="flex-1 w-full max-w-2xl mx-auto md:mx-0"
        >
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="search"
              placeholder="Search services (loans, EMI, cards, insurance, …)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-400"
            />
          </div>
        </form>

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-lg">
          <FiUser className="h-5 w-5 text-gray-700" />
          <span className="text-sm text-gray-700">
            Welcome, <span className="font-semibold">{displayName}</span>
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6">
        <aside className="bg-white border rounded-lg p-4">
          <nav className="space-y-1">
            <Link
              to="/user-dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiHome className="h-5 w-5" />
              <span>Dashboard Home</span>
            </Link>

            <div className="mt-3 mb-1 text-xs font-semibold text-gray-500 px-3">
              Finance
            </div>
            <Link
              to="/apply-loan"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiClipboard className="h-5 w-5" />
              <span>Apply Loan</span>
            </Link>
            <Link
              to="/emi-calculator"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiPercent className="h-5 w-5" />
              <span>EMI Calculator</span>
            </Link>
            <Link
              to="/credit-cards"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiCreditCard className="h-5 w-5" />
              <span>Credit Cards</span>
            </Link>
            <Link
              to="/insurance"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiPieChart className="h-5 w-5" />
              <span>Insurance</span>
            </Link>
            <Link
              to="/investments"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiTrendingUp className="h-5 w-5" />
              <span>Investments</span>
            </Link>

            <div className="mt-3 mb-1 text-xs font-semibold text-gray-500 px-3">
              My Stuff
            </div>
            <Link
              to="/my-applications"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiFileText className="h-5 w-5" />
              <span>My Applications</span>
            </Link>
            <Link
              to="/payments"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiDollarSign className="h-5 w-5" />
              <span>Payments</span>
            </Link>
            <Link
              to="/statements"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiFileText className="h-5 w-5" />
              <span>Statements</span>
            </Link>
            <Link
              to="/all-messages"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiMail className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            <Link
              to="/contact-us"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiHelpCircle className="h-5 w-5" />
              <span>Help & Support</span>
            </Link>

            <div className="mt-3 mb-1 text-xs font-semibold text-gray-500 px-3">
              Account
            </div>
            <Link
              to={`/profile/${me?.id || me?._id || ""}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiUser className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              <FiSettings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        <section>
          {err ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 mb-4">
              {err}
            </div>
          ) : null}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="rounded-lg border p-4">
              <div className="text-xs text-gray-500">My Messages</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">
                {loading ? "…" : myMsgCounts.total}
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-xs text-gray-500">Unread</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">
                {loading ? "…" : myMsgCounts.unread}
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-xs text-gray-500">Read</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">
                {loading ? "…" : myMsgCounts.read}
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-xs text-gray-500">Replied Threads</div>
              <div className="mt-1 text-2xl font-bold text-gray-900">
                {loading ? "…" : myMsgCounts.replied}
              </div>
            </div>
          </div>

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

          <p className="mt-6 text-xs text-gray-500">
            Tip: Use the search bar above to quickly find services, tools, and
            pages across your account.
          </p>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
