// src/pages/user_pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import globalBackendRoute from "../../config/config";
import { AuthContext } from "../../components/auth_components/AuthManager";

// Role → Dashboard path
const ROLE_ROUTE = {
  superadmin: "/superadmin-dashboard",
  admin: "/admin-dashboard",
  user: "/user-dashboard",
  student: "/user-dashboard",
  instructor: "/user-dashboard",
  accountant: "/user-dashboard",
  alumni_relations: "/user-dashboard",
  business_analyst: "/user-dashboard",
  content_creator: "/user-dashboard",
  course_coordinator: "/user-dashboard",
  customer: "/user-dashboard",
  client: "/user-dashboard",
  customer_support: "/user-dashboard",
  data_scientist: "/user-dashboard",
  department_head: "/user-dashboard",
  developer: "/user-dashboard",
  event_coordinator: "/user-dashboard",
  employee: "/user-dashboard",
  hr_manager: "/user-dashboard",
  intern: "/user-dashboard",
  legal_advisor: "/user-dashboard",
  maintenance_staff: "/user-dashboard",
  marketing_manager: "/user-dashboard",
  operations_manager: "/user-dashboard",
  product_owner: "/user-dashboard",
  project_manager: "/user-dashboard",
  qa_lead: "/user-dashboard",
  recruiter: "/user-dashboard",
  registrar: "/user-dashboard",
  researcher: "/user-dashboard",
  sales_executive: "/user-dashboard",
  support_engineer: "/user-dashboard",
  tech_lead: "/user-dashboard",
  test_engineer: "/user-dashboard",
  ux_ui_designer: "/user-dashboard",
  vendor: "/user-dashboard",
  outlet: "/user-dashboard",
  delivery_person: "/user-dashboard",
  default: "/user-dashboard",
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const API = globalBackendRoute; // e.g., http://localhost:5000
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!form.email.trim() || !form.password.trim()) {
      setMessage({ type: "error", text: "Email and password are required." });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed.");

      // Save token for your AuthManager (it will decode & set user)
      localStorage.setItem("token", data.token);
      // optional: also store user object from API for convenience
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      login(data.token); // tells context we’re logged in

      // Decide where to go:
      const role = data?.user?.role || "default";
      const to = ROLE_ROUTE[role] || ROLE_ROUTE.default;

      // If they came here due to a redirect, prefer that
      const stateTo = location.state?.from || to;
      navigate(stateTo, { replace: true });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
      <div className="max-w-md mx-auto bg-white p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          Login
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Enter your email and password to continue
        </p>

        {message.text ? (
          <div
            className={`mt-4 rounded-lg px-4 py-3 text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={onChange}
              placeholder="Your password"
              className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-white text-sm font-semibold shadow-sm ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-gray-900 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        By logging in, you agree to our Terms & Privacy Policy.
      </p>
    </div>
  );
};

export default Login;
