import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/config";

const Register = () => {
  const navigate = useNavigate();
  const API = globalBackendRoute;

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const { name, email, password } = form;
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage({ type: "error", text: "All fields are required." });
      return false;
    }
    // Very basic email check (server still validates)
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return false;
    }
    // Basic password guard (server still hashes/validates)
    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validate()) return;

    try {
      setSubmitting(true);
      const res = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show server message if present (e.g., "User already exists")
        throw new Error(data?.message || "Registration failed.");
      }

      setMessage({
        type: "success",
        text: data?.message || "User registered successfully.",
      });

      // Optional redirect to login after short delay
      setTimeout(() => navigate("/login"), 900);
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
          Create an Account
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Register with your name, email, and password
        </p>

        {/* alerts */}
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
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={onChange}
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={onChange}
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 pr-12 text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600 hover:text-gray-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Minimum 6 chars, one small, one capital and one special.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-white text-sm font-semibold shadow-sm
            ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Link to login */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-gray-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* small note */}
      <p className="text-xs text-gray-500 text-center mt-4">
        By registering, you agree to our Terms & Privacy Policy.
      </p>
    </div>
  );
};

export default Register;
