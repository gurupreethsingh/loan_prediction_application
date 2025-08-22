// src/pages/user_pages/UpdateProfile.jsx
import React, { useEffect, useMemo, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/config";
import { AuthContext } from "../../components/auth_components/AuthManager";

const UpdateProfile = () => {
  const { user: authUser } = useContext(AuthContext);
  const { id: routeId } = useParams();
  const navigate = useNavigate();

  const API = globalBackendRoute;
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: { line1: "", city: "", state: "", zip: "" },
    companyName: "",
    companyEmail: "",
    gstNumber: "",
    promotionalConsent: false,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState("");

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

  // Prefill existing data
  useEffect(() => {
    let active = true;
    (async () => {
      if (!userId) {
        setMessage({ type: "error", text: "No user id found." });
        return;
      }
      try {
        const res = await fetch(`${API}/api/getUserById/${userId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Failed to fetch user");

        if (!active) return;

        setForm({
          name: json?.name || "",
          email: json?.email || "",
          phone: json?.phone || "",
          address: {
            line1: json?.address?.line1 || json?.address?.street || "",
            city: json?.address?.city || "",
            state: json?.address?.state || "",
            zip: json?.address?.zip || "",
          },
          companyName: json?.companyName || "",
          companyEmail: json?.companyEmail || "",
          gstNumber: json?.gstNumber || "",
          promotionalConsent: Boolean(json?.promotionalConsent),
        });
        setCurrentAvatar(json?.avatar ? `${API}/${json.avatar}` : "");
      } catch (err) {
        setMessage({ type: "error", text: err.message || "Failed to load." });
      }
    })();
    return () => {
      active = false;
    };
  }, [API, userId]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["line1", "city", "state", "zip"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else if (name === "promotionalConsent") {
      setForm((prev) => ({ ...prev, promotionalConsent: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      setSubmitting(true);

      const fd = new FormData();
      // fields server accepts
      fd.append("name", form.name);
      fd.append("email", form.email);
      if (form.phone) fd.append("phone", form.phone);
      fd.append("address", JSON.stringify(form.address)); // controller expects JSON string
      if (form.companyName) fd.append("companyName", form.companyName);
      if (form.companyEmail) fd.append("companyEmail", form.companyEmail);
      if (form.gstNumber) fd.append("gstNumber", form.gstNumber);
      fd.append("promotionalConsent", String(form.promotionalConsent));
      if (avatarFile) fd.append("avatar", avatarFile); // multer field name is "avatar"

      const res = await fetch(`${API}/api/update-profile/${userId}`, {
        method: "PUT",
        body: fd,
        // NOTE: DO NOT set Content-Type for FormData; browser sets with boundary.
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Update failed.");

      setMessage({ type: "success", text: "Profile updated successfully." });

      // Optional: refresh localStorage user name (UI header may read from token; will update on next login)
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...localUser, name: data?.name || form.name })
      );

      // Go back to profile after a short pause
      setTimeout(() => navigate(`/profile/${userId}`), 700);
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
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Update Profile
        </h1>
        <p className="text-gray-600 mt-1">
          Edit your information and upload an avatar.
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

        <form className="mt-6 space-y-6" onSubmit={onSubmit}>
          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Avatar
            </label>
            <div className="mt-2 flex items-center gap-4">
              {currentAvatar ? (
                <img
                  src={currentAvatar}
                  alt="avatar"
                  className="h-16 w-16 rounded-full object-cover border"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
              placeholder="Your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-800"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
              placeholder="Phone number"
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-800">
                Address Line
              </label>
              <input
                name="line1"
                type="text"
                value={form.address.line1}
                onChange={onChange}
                className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
                placeholder="Street / Line 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                City
              </label>
              <input
                name="city"
                type="text"
                value={form.address.city}
                onChange={onChange}
                className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                State
              </label>
              <input
                name="state"
                type="text"
                value={form.address.state}
                onChange={onChange}
                className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                ZIP
              </label>
              <input
                name="zip"
                type="text"
                value={form.address.zip}
                onChange={onChange}
                className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
                placeholder="ZIP"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Company Name
            </label>
            <input
              name="companyName"
              type="text"
              value={form.companyName}
              onChange={onChange}
              className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
              placeholder="Company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Company Email
            </label>
            <input
              name="companyEmail"
              type="email"
              value={form.companyEmail}
              onChange={onChange}
              className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
              placeholder="company@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">
              GST Number
            </label>
            <input
              name="gstNumber"
              type="text"
              value={form.gstNumber}
              onChange={onChange}
              className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
              placeholder="GST number"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="promotionalConsent"
              name="promotionalConsent"
              type="checkbox"
              checked={form.promotionalConsent}
              onChange={onChange}
              className="h-4 w-4 text-gray-900 border-gray-300"
            />
            <label
              htmlFor="promotionalConsent"
              className="text-sm text-gray-800"
            >
              I agree to receive promotions
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-white text-sm font-semibold ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
            <Link
              to={`/profile/${userId}`}
              className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-gray-900 text-sm font-semibold border hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
