// // src/pages/contact_pages/ReplyMessage.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FiMail,
//   FiPhone,
//   FiUser,
//   FiClock,
//   FiCornerDownLeft,
// } from "react-icons/fi";
// import globalBackendRoute from "../../config/config";

// const ReplyMessage = () => {
//   const { id } = useParams();
//   const API =
//     globalBackendRoute ||
//     import.meta?.env?.VITE_BACKEND_URL ||
//     "http://localhost:5000";

//   const [msg, setMsg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   // reply form
//   const [replying, setReplying] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [alert, setAlert] = useState({ type: "", text: "" });

//   const fullName = useMemo(() => {
//     if (!msg) return "";
//     return [msg.firstName, msg.lastName].filter(Boolean).join(" ");
//   }, [msg]);

//   // Fetch the message
//   useEffect(() => {
//     let active = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${API}/api/reply-message/${id}`);
//         const json = await res.json();
//         if (!res.ok) throw new Error(json?.error || "Failed to fetch message.");
//         if (active) setMsg(json);
//       } catch (e) {
//         if (active) setErr(e.message || "Something went wrong.");
//       } finally {
//         if (active) setLoading(false);
//       }
//     })();
//     return () => {
//       active = false;
//     };
//   }, [API, id]);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setAlert({ type: "", text: "" });

//     if (!form.name.trim() || !form.message.trim()) {
//       setAlert({
//         type: "error",
//         text: "Your name and reply message are required.",
//       });
//       return;
//     }

//     try {
//       setReplying(true);
//       const res = await fetch(`${API}/api/give-message-reply/${id}/reply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form), // { name, email (optional), message }
//       });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.error || "Failed to send reply.");

//       // Optimistically append new reply to UI
//       setMsg((prev) =>
//         prev
//           ? { ...prev, replies: [...(prev.replies || []), json.newReply] }
//           : prev
//       );

//       setAlert({
//         type: "success",
//         text: "Reply sent and email notification triggered.",
//       });
//       setForm({ name: "", email: "", message: "" });
//     } catch (e) {
//       setAlert({ type: "error", text: e.message || "Failed to send reply." });
//     } finally {
//       setReplying(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
//         <div className="max-w-4xl mx-auto bg-white p-6 md:p-8">
//           <div className="h-6 w-48 bg-gray-200 mb-6" />
//           <div className="h-20 w-full bg-gray-200 mb-4" />
//           <div className="h-40 w-full bg-gray-200" />
//         </div>
//       </div>
//     );
//   }

//   if (err) {
//     return (
//       <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
//         <div className="max-w-4xl mx-auto bg-white p-6 md:p-8">
//           <div className="rounded-lg px-4 py-3 text-sm bg-red-50 text-red-800 border border-red-200">
//             {err}
//           </div>
//           <div className="mt-4">
//             <Link to="/all-messages" className="text-gray-900 underline">
//               ← Back to All Messages
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!msg) return null;

//   const createdAtLabel = msg.createdAt
//     ? new Date(msg.createdAt).toLocaleString()
//     : "—";

//   return (
//     <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
//       <div className="max-w-4xl mx-auto bg-white p-6 md:p-8">
//         {/* Header */}
//         <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//             Reply to Message
//           </h1>
//           <Link to="/all-messages" className="text-sm text-gray-900 underline">
//             ← Back to All Messages
//           </Link>
//         </div>

//         {/* Sender details */}
//         <div className="mt-6 rounded-lg border p-4">
//           <h2 className="font-semibold text-gray-900 mb-3">Sender</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//             <div className="flex items-center gap-2 text-gray-700">
//               <FiUser className="shrink-0" />
//               <span className="truncate">
//                 <span className="font-medium">Name:</span> {fullName || "—"}
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <FiMail className="shrink-0" />
//               <span className="truncate">
//                 <span className="font-medium">Email:</span> {msg.email || "—"}
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <FiPhone className="shrink-0" />
//               <span className="truncate">
//                 <span className="font-medium">Phone:</span> {msg.phone || "—"}
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <FiClock className="shrink-0" />
//               <span className="truncate">
//                 <span className="font-medium">Received:</span> {createdAtLabel}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Original message */}
//         <div className="mt-6 rounded-lg border p-4">
//           <h2 className="font-semibold text-gray-900 mb-3">Original Message</h2>
//           <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-800 whitespace-pre-wrap">
//             {msg.message_text || "—"}
//           </div>
//         </div>

//         {/* Previous replies (if any) */}
//         {(msg.replies || []).length > 0 && (
//           <div className="mt-6 rounded-lg border p-4">
//             <h2 className="font-semibold text-gray-900 mb-3">
//               Previous Replies
//             </h2>
//             <ul className="space-y-3">
//               {msg.replies.map((r, idx) => (
//                 <li key={idx} className="rounded-lg border p-3">
//                   <div className="text-sm text-gray-700">
//                     <span className="font-medium">{r.name || "Support"}</span>
//                     {r.email ? (
//                       <span className="text-gray-500"> • {r.email}</span>
//                     ) : null}
//                     <span className="text-gray-500">
//                       {" "}
//                       •{" "}
//                       {r.timestamp
//                         ? new Date(r.timestamp).toLocaleString()
//                         : "—"}
//                     </span>
//                   </div>
//                   <div className="mt-2 text-sm text-gray-800 whitespace-pre-wrap">
//                     {r.message}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Reply form */}
//         <div className="mt-6 rounded-lg border p-4">
//           <h2 className="font-semibold text-gray-900 mb-3">Write a Reply</h2>

//           {alert.text ? (
//             <div
//               className={`mb-4 rounded-lg px-4 py-3 text-sm ${
//                 alert.type === "success"
//                   ? "bg-green-50 text-green-800 border border-green-200"
//                   : "bg-red-50 text-red-800 border border-red-200"
//               }`}
//             >
//               {alert.text}
//             </div>
//           ) : null}

//           <form className="space-y-4" onSubmit={onSubmit}>
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Your Name <span className="text-red-600">*</span>
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 value={form.name}
//                 onChange={onChange}
//                 placeholder="e.g., Ecoders Support"
//                 className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Your Email (optional)
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={onChange}
//                 placeholder="you@company.com"
//                 className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
//               />
//               <p className="mt-1 text-xs text-gray-500">
//                 If omitted, the user’s email will be used as the delivery target
//                 (they always receive the reply).
//               </p>
//             </div>

//             <div>
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-medium text-gray-800"
//               >
//                 Your Reply <span className="text-red-600">*</span>
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 required
//                 rows={5}
//                 value={form.message}
//                 onChange={onChange}
//                 placeholder="Type your reply…"
//                 className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
//               />
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 type="submit"
//                 disabled={replying}
//                 className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-white text-sm font-semibold ${
//                   replying
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-gray-900 hover:bg-gray-800"
//                 }`}
//               >
//                 <FiCornerDownLeft className="h-4 w-4" />
//                 {replying ? "Sending…" : "Send Reply"}
//               </button>

//               <Link
//                 to="/all-messages"
//                 className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-gray-900 text-sm font-semibold border hover:bg-gray-50"
//               >
//                 Cancel
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReplyMessage;

//

// src/pages/contact_pages/ReplyMessage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiClock,
  FiCornerDownLeft,
} from "react-icons/fi";
import globalBackendRoute from "../../config/config";

const ReplyMessage = () => {
  const { id } = useParams();
  const API =
    globalBackendRoute ||
    import.meta?.env?.VITE_BACKEND_URL ||
    "http://localhost:5000";

  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // reply form
  const [replying, setReplying] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [alert, setAlert] = useState({ type: "", text: "" });

  const fullName = useMemo(() => {
    if (!msg) return "";
    return [msg.firstName, msg.lastName].filter(Boolean).join(" ");
  }, [msg]);

  // Fetch the message, then mark as read in backend
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/reply-message/${id}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to fetch message.");
        if (active) {
          setMsg(json);
        }
      } catch (e) {
        if (active) setErr(e.message || "Something went wrong.");
      } finally {
        if (active) setLoading(false);
      }

      // Mark as read (server) – doesn't block UI
      try {
        await fetch(`${API}/api/messages/mark-as-read`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messageId: id }),
        });
        if (active) {
          // update local state so UI shows Read if you navigate back
          setMsg((prev) => (prev ? { ...prev, isRead: true } : prev));
        }
      } catch {
        // ignore – not critical for UX
      }
    })();
    return () => {
      active = false;
    };
  }, [API, id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", text: "" });

    if (!form.name.trim() || !form.message.trim()) {
      setAlert({
        type: "error",
        text: "Your name and reply message are required.",
      });
      return;
    }

    try {
      setReplying(true);
      const res = await fetch(`${API}/api/give-message-reply/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // { name, email (optional), message }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to send reply.");

      // Optimistically append new reply to UI
      setMsg((prev) =>
        prev
          ? { ...prev, replies: [...(prev.replies || []), json.newReply] }
          : prev
      );

      setAlert({
        type: "success",
        text: "Reply sent and email notification triggered.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (e) {
      setAlert({ type: "error", text: e.message || "Failed to send reply." });
    } finally {
      setReplying(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8">
          <div className="h-6 w-48 bg-gray-200 mb-6" />
          <div className="h-20 w-full bg-gray-200 mb-4" />
          <div className="h-40 w-full bg-gray-200" />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8">
          <div className="rounded-lg px-4 py-3 text-sm bg-red-50 text-red-800 border border-red-200">
            {err}
          </div>
          <div className="mt-4">
            <Link to="/all-messages" className="text-gray-900 underline">
              ← Back to All Messages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!msg) return null;

  const createdAtLabel = msg.createdAt
    ? new Date(msg.createdAt).toLocaleString()
    : "—";

  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Reply to Message
          </h1>
          <Link to="/all-messages" className="text-sm text-gray-900 underline">
            ← Back to All Messages
          </Link>
        </div>

        {/* Sender details */}
        <div className="mt-6 rounded-lg border p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Sender</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <FiUser className="shrink-0" />
              <span className="truncate">
                <span className="font-medium">Name:</span> {fullName || "—"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiMail className="shrink-0" />
              <span className="truncate">
                <span className="font-medium">Email:</span> {msg.email || "—"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiPhone className="shrink-0" />
              <span className="truncate">
                <span className="font-medium">Phone:</span> {msg.phone || "—"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiClock className="shrink-0" />
              <span className="truncate">
                <span className="font-medium">Received:</span> {createdAtLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Original message */}
        <div className="mt-6 rounded-lg border p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Original Message</h2>
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-800 whitespace-pre-wrap">
            {msg.message_text || "—"}
          </div>
        </div>

        {/* Previous replies (if any) */}
        {(msg.replies || []).length > 0 && (
          <div className="mt-6 rounded-lg border p-4">
            <h2 className="font-semibold text-gray-900 mb-3">
              Previous Replies
            </h2>
            <ul className="space-y-3">
              {msg.replies.map((r, idx) => (
                <li key={idx} className="rounded-lg border p-3">
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">{r.name || "Support"}</span>
                    {r.email ? (
                      <span className="text-gray-500"> • {r.email}</span>
                    ) : null}
                    <span className="text-gray-500">
                      {" "}
                      •{" "}
                      {r.timestamp
                        ? new Date(r.timestamp).toLocaleString()
                        : "—"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-800 whitespace-pre-wrap">
                    {r.message}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reply form */}
        <div className="mt-6 rounded-lg border p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Write a Reply</h2>

          {alert.text ? (
            <div
              className={`mb-4 rounded-lg px-4 py-3 text-sm ${
                alert.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {alert.text}
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800"
              >
                Your Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={onChange}
                placeholder="e.g., Ecoders Support"
                className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800"
              >
                Your Email (optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@company.com"
                className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
              />
              <p className="mt-1 text-xs text-gray-500">
                If omitted, the user’s email will be used as the delivery target
                (they always receive the reply).
              </p>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-800"
              >
                Your Reply <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={onChange}
                placeholder="Type your reply…"
                className="mt-2 w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={replying}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-white text-sm font-semibold ${
                  replying
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                <FiCornerDownLeft className="h-4 w-4" />
                {replying ? "Sending…" : "Send Reply"}
              </button>

              <Link
                to="/all-messages"
                className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-gray-900 text-sm font-semibold border hover:bg-gray-50"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReplyMessage;
