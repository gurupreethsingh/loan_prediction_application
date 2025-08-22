// // src/pages/contact_pages/AllReplies.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiTrash2, FiSearch, FiArrowUp, FiArrowDown } from "react-icons/fi";
// import globalBackendRoute from "../../config/config";

// const AllReplies = () => {
//   const API =
//     globalBackendRoute ||
//     import.meta?.env?.VITE_BACKEND_URL ||
//     "http://localhost:5000";

//   const navigate = useNavigate();

//   // Data
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   // UI state
//   const [q, setQ] = useState("");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortDir, setSortDir] = useState("desc"); // 'asc' | 'desc'
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [customPageSize, setCustomPageSize] = useState("");

//   // Fetch messages
//   useEffect(() => {
//     let active = true;
//     (async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(`${API}/api/all-messages`);
//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(`GET /all-messages ${res.status}: ${text}`);
//         }
//         const json = await res.json();
//         if (active) setMessages(Array.isArray(json) ? json : []);
//       } catch (e) {
//         if (active) setErr(e.message || "Failed to fetch messages.");
//       } finally {
//         if (active) setLoading(false);
//       }
//     })();

//     return () => {
//       active = false;
//     };
//   }, [API]);

//   // Derived counts (local)
//   const counts = useMemo(() => {
//     const total = messages.length;
//     const unread = messages.filter((m) => !m.isRead).length;
//     const read = total - unread;
//     const replied = messages.filter(
//       (m) => Array.isArray(m.replies) && m.replies.length > 0
//     ).length;
//     const notReplied = total - replied;
//     return { total, read, unread, replied, notReplied };
//   }, [messages]);

//   // Filter + Sort
//   const filteredSorted = useMemo(() => {
//     const needle = q.trim().toLowerCase();
//     let arr = !needle
//       ? messages
//       : messages.filter((m) => {
//           const replyBlob = (m.replies || [])
//             .map((r) => `${r.name} ${r.email} ${r.message}`)
//             .join(" ");
//           const blob = [
//             m.firstName,
//             m.lastName,
//             m.email,
//             m.phone,
//             m.message_text,
//             m.isRead ? "read" : "unread",
//             replyBlob,
//             new Date(m.createdAt || "").toLocaleString(),
//           ]
//             .filter(Boolean)
//             .join(" ")
//             .toLowerCase();
//           return blob.includes(needle);
//         });

//     const dir = sortDir === "asc" ? 1 : -1;
//     arr = [...arr].sort((a, b) => {
//       if (sortBy === "createdAt") {
//         const da = new Date(a.createdAt || 0).getTime();
//         const db = new Date(b.createdAt || 0).getTime();
//         return (da - db) * dir;
//       }
//       if (sortBy === "name") {
//         const na = `${a.firstName || ""} ${a.lastName || ""}`
//           .trim()
//           .toLowerCase();
//         const nb = `${b.firstName || ""} ${b.lastName || ""}`
//           .trim()
//           .toLowerCase();
//         if (na < nb) return -1 * dir;
//         if (na > nb) return 1 * dir;
//         return 0;
//       }
//       if (sortBy === "email") {
//         const ea = (a.email || "").toLowerCase();
//         const eb = (b.email || "").toLowerCase();
//         if (ea < eb) return -1 * dir;
//         if (ea > eb) return 1 * dir;
//         return 0;
//       }
//       if (sortBy === "repliesCount") {
//         const ra = (a.replies || []).length;
//         const rb = (b.replies || []).length;
//         return (ra - rb) * dir;
//       }
//       return 0;
//     });

//     return arr;
//   }, [messages, q, sortBy, sortDir]);

//   // Pagination
//   const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
//   const currentPage = Math.min(page, totalPages);
//   const startIdx = (currentPage - 1) * pageSize;
//   const pageSlice = filteredSorted.slice(startIdx, startIdx + pageSize);

//   useEffect(() => {
//     // reset to first page when filters/sort/pageSize change
//     setPage(1);
//   }, [q, sortBy, sortDir, pageSize]);

//   const applyCustomPageSize = () => {
//     const n = parseInt(customPageSize, 10);
//     if (!Number.isFinite(n) || n <= 0) {
//       alert("Enter a valid positive number for page size.");
//       return;
//     }
//     setPageSize(n);
//   };

//   // Delete permanently
//   const deletePermanent = async (id) => {
//     const ok = window.confirm(
//       "Permanently delete this message? This cannot be undone."
//     );
//     if (!ok) return;
//     try {
//       const res = await fetch(`${API}/api/messages/${id}/permanent`, {
//         method: "DELETE",
//       });
//       const text = await res.text();
//       if (!res.ok) throw new Error(`DELETE permanent ${res.status}: ${text}`);
//       setMessages((prev) => prev.filter((m) => m._id !== id));
//       alert("Message deleted permanently.");
//     } catch (e) {
//       alert(e.message || "Failed to delete permanently.");
//     }
//   };

//   // UI helpers
//   const SortIcon = () =>
//     sortDir === "asc" ? (
//       <FiArrowUp className="inline-block ml-1" />
//     ) : (
//       <FiArrowDown className="inline-block ml-1" />
//     );

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
//         <div className="max-w-6xl mx-auto bg-white p-6 md:p-8">
//           <div className="h-6 w-40 bg-gray-200 mb-6" />
//           <div className="h-10 w-full bg-gray-200 mb-4" />
//           <div className="h-10 w-full bg-gray-200 mb-2" />
//           <div className="h-10 w-full bg-gray-200" />
//         </div>
//       </div>
//     );
//   }

//   if (err) {
//     return (
//       <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
//         <div className="max-w-6xl mx-auto bg-white p-6 md:p-8">
//           <div className="rounded-lg px-4 py-3 text-sm bg-red-50 text-red-800 border border-red-200">
//             {err}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
//       <div className="max-w-6xl mx-auto bg-white p-6 md:p-8">
//         {/* Header row */}
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//             All Replies
//           </h1>

//           <div className="w-full md:max-w-xl">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search by name, email, phone, message, or reply…"
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Counts */}
//         <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
//           <div className="rounded-lg border p-3">
//             <div className="text-xs text-gray-500">Total</div>
//             <div className="text-xl font-semibold text-gray-900">
//               {counts.total}
//             </div>
//           </div>
//           <div className="rounded-lg border p-3">
//             <div className="text-xs text-gray-500">Read</div>
//             <div className="text-xl font-semibold text-gray-900">
//               {counts.read}
//             </div>
//           </div>
//           <div className="rounded-lg border p-3">
//             <div className="text-xs text-gray-500">Unread</div>
//             <div className="text-xl font-semibold text-gray-900">
//               {counts.unread}
//             </div>
//           </div>
//           <div className="rounded-lg border p-3">
//             <div className="text-xs text-gray-500">Replied</div>
//             <div className="text-xl font-semibold text-gray-900">
//               {counts.replied}
//             </div>
//           </div>
//           <div className="rounded-lg border p-3">
//             <div className="text-xs text-gray-500">Not Replied</div>
//             <div className="text-xl font-semibold text-gray-900">
//               {counts.notReplied}
//             </div>
//           </div>
//         </div>

//         {/* Sort + page size */}
//         <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-700">Sort by:</span>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="rounded border border-gray-300 px-3 py-2 text-sm"
//             >
//               <option value="createdAt">Date</option>
//               <option value="name">Name</option>
//               <option value="email">Email</option>
//               <option value="repliesCount">Replies Count</option>
//             </select>
//             <button
//               onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
//               className="inline-flex items-center rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
//               title="Toggle sort direction"
//             >
//               Direction <SortIcon />
//             </button>
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-700">Per page:</span>
//             <select
//               value={String(pageSize)}
//               onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
//               className="rounded border border-gray-300 px-3 py-2 text-sm"
//             >
//               {[10, 20, 40, 50].map((n) => (
//                 <option key={n} value={n}>
//                   {n}
//                 </option>
//               ))}
//             </select>

//             <span className="text-sm text-gray-500">or custom</span>
//             <input
//               type="number"
//               value={customPageSize}
//               onChange={(e) => setCustomPageSize(e.target.value)}
//               placeholder="e.g. 25"
//               className="w-24 rounded border border-gray-300 px-3 py-2 text-sm"
//             />
//             <button
//               onClick={applyCustomPageSize}
//               className="rounded px-3 py-2 text-sm border border-gray-300 hover:bg-gray-50"
//             >
//               Apply
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="mt-4 overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-600 border-b">
//                 <th className="py-3 pr-4">Name</th>
//                 <th className="py-3 pr-4">Email</th>
//                 <th className="py-3 pr-4 hidden md:table-cell">Phone</th>
//                 <th className="py-3 pr-4">Message</th>
//                 <th className="py-3 pr-4 text-center">Replies</th>
//                 <th className="py-3 pr-4 hidden lg:table-cell">Created</th>
//                 <th className="py-3 pl-2 pr-0 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pageSlice.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="py-6 text-center text-gray-500">
//                     No messages found.
//                   </td>
//                 </tr>
//               ) : (
//                 pageSlice.map((m) => {
//                   const name = [m.firstName, m.lastName]
//                     .filter(Boolean)
//                     .join(" ");
//                   const preview =
//                     (m.message_text || "").length > 80
//                       ? `${m.message_text.slice(0, 80)}…`
//                       : m.message_text || "—";
//                   const repliesCount = (m.replies || []).length || 0;
//                   const dateLabel = m.createdAt
//                     ? new Date(m.createdAt).toLocaleString()
//                     : "—";

//                   return (
//                     <tr key={m._id} className="border-b">
//                       <td className="py-3 pr-4">
//                         <Link
//                           to={`/reply-message/${m._id}`}
//                           className="font-medium text-gray-900 hover:underline"
//                           title="Open message & replies"
//                         >
//                           {name || "—"}
//                         </Link>
//                         <div className="text-xs text-gray-500 lg:hidden">
//                           {dateLabel}
//                         </div>
//                       </td>
//                       <td className="py-3 pr-4 text-gray-700">
//                         {m.email || "—"}
//                       </td>
//                       <td className="py-3 pr-4 text-gray-700 hidden md:table-cell">
//                         {m.phone || "—"}
//                       </td>
//                       <td className="py-3 pr-4 text-gray-700">{preview}</td>
//                       <td className="py-3 pr-4 text-center">
//                         <span
//                           className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${
//                             repliesCount > 0
//                               ? "bg-green-50 text-green-700 border border-green-200"
//                               : "bg-gray-50 text-gray-700 border border-gray-200"
//                           }`}
//                           title={`${repliesCount} repl${
//                             repliesCount === 1 ? "y" : "ies"
//                           }`}
//                         >
//                           {repliesCount}
//                         </span>
//                       </td>
//                       <td className="py-3 pr-4 text-gray-700 hidden lg:table-cell">
//                         {dateLabel}
//                       </td>
//                       <td className="py-3 pl-2 pr-0 text-right">
//                         <button
//                           className="inline-flex items-center justify-center p-2 rounded hover:bg-red-50 text-red-600"
//                           title="Delete Permanently"
//                           onClick={() => deletePermanent(m._id)}
//                         >
//                           <FiTrash2 className="h-5 w-5" />
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
//           <div className="text-sm text-gray-600">
//             Showing{" "}
//             <span className="font-medium text-gray-900">
//               {Math.min(filteredSorted.length, startIdx + 1)}
//             </span>{" "}
//             to{" "}
//             <span className="font-medium text-gray-900">
//               {Math.min(filteredSorted.length, startIdx + pageSlice.length)}
//             </span>{" "}
//             of{" "}
//             <span className="font-medium text-gray-900">
//               {filteredSorted.length}
//             </span>{" "}
//             results
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setPage(p)}
//                 className={`px-3 py-1.5 rounded border text-sm ${
//                   p === currentPage
//                     ? "bg-gray-900 text-white border-gray-900"
//                     : "border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {p}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllReplies;

//

// with reply text

//

// src/pages/contact_pages/AllReplies.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiSearch, FiArrowUp, FiArrowDown } from "react-icons/fi";
import globalBackendRoute from "../../config/config";

const AllReplies = () => {
  const API =
    globalBackendRoute ||
    import.meta?.env?.VITE_BACKEND_URL ||
    "http://localhost:5000";

  // Data
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // UI state
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc"); // 'asc' | 'desc'
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [customPageSize, setCustomPageSize] = useState("");

  // Fetch messages
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/api/all-messages`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`GET /all-messages ${res.status}: ${text}`);
        }
        const json = await res.json();
        if (active) setMessages(Array.isArray(json) ? json : []);
      } catch (e) {
        if (active) setErr(e.message || "Failed to fetch messages.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [API]);

  // Derived counts (local)
  const counts = useMemo(() => {
    const total = messages.length;
    const unread = messages.filter((m) => !m.isRead).length;
    const read = total - unread;
    const replied = messages.filter(
      (m) => Array.isArray(m.replies) && m.replies.length > 0
    ).length;
    const notReplied = total - replied;
    return { total, read, unread, replied, notReplied };
  }, [messages]);

  // Filter + Sort
  const filteredSorted = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let arr = !needle
      ? messages
      : messages.filter((m) => {
          const replyBlob = (m.replies || [])
            .map((r) => `${r.name} ${r.email} ${r.message}`)
            .join(" ");
          const blob = [
            m.firstName,
            m.lastName,
            m.email,
            m.phone,
            m.message_text,
            m.isRead ? "read" : "unread",
            replyBlob,
            new Date(m.createdAt || "").toLocaleString(),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return blob.includes(needle);
        });

    const dir = sortDir === "asc" ? 1 : -1;
    arr = [...arr].sort((a, b) => {
      if (sortBy === "createdAt") {
        const da = new Date(a.createdAt || 0).getTime();
        const db = new Date(b.createdAt || 0).getTime();
        return (da - db) * dir;
      }
      if (sortBy === "name") {
        const na = `${a.firstName || ""} ${a.lastName || ""}`
          .trim()
          .toLowerCase();
        const nb = `${b.firstName || ""} ${b.lastName || ""}`
          .trim()
          .toLowerCase();
        if (na < nb) return -1 * dir;
        if (na > nb) return 1 * dir;
        return 0;
      }
      if (sortBy === "email") {
        const ea = (a.email || "").toLowerCase();
        const eb = (b.email || "").toLowerCase();
        if (ea < eb) return -1 * dir;
        if (ea > eb) return 1 * dir;
        return 0;
      }
      if (sortBy === "repliesCount") {
        const ra = (a.replies || []).length;
        const rb = (b.replies || []).length;
        return (ra - rb) * dir;
      }
      return 0;
    });

    return arr;
  }, [messages, q, sortBy, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageSlice = filteredSorted.slice(startIdx, startIdx + pageSize);

  useEffect(() => {
    // reset to first page when filters/sort/pageSize change
    setPage(1);
  }, [q, sortBy, sortDir, pageSize]);

  const applyCustomPageSize = () => {
    const n = parseInt(customPageSize, 10);
    if (!Number.isFinite(n) || n <= 0) {
      alert("Enter a valid positive number for page size.");
      return;
    }
    setPageSize(n);
  };

  // Delete permanently
  const deletePermanent = async (id) => {
    const ok = window.confirm(
      "Permanently delete this message? This cannot be undone."
    );
    if (!ok) return;
    try {
      const res = await fetch(`${API}/api/messages/${id}/permanent`, {
        method: "DELETE",
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`DELETE permanent ${res.status}: ${text}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      alert("Message deleted permanently.");
    } catch (e) {
      alert(e.message || "Failed to delete permanently.");
    }
  };

  // UI helpers
  const SortIcon = () =>
    sortDir === "asc" ? (
      <FiArrowUp className="inline-block ml-1" />
    ) : (
      <FiArrowDown className="inline-block ml-1" />
    );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        <div className="max-w-6xl mx-auto bg-white p-6 md:p-8">
          <div className="h-6 w-40 bg-gray-200 mb-6" />
          <div className="h-10 w-full bg-gray-200 mb-4" />
          <div className="h-10 w-full bg-gray-200 mb-2" />
          <div className="h-10 w-full bg-gray-200" />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        <div className="max-w-6xl mx-auto bg-white p-6 md:p-8">
          <div className="rounded-lg px-4 py-3 text-sm bg-red-50 text-red-800 border border-red-200">
            {err}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-8">
        {/* Header row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            All Replies
          </h1>

          <div className="w-full md:max-w-xl">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, email, phone, message, or reply…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Counts */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="rounded-lg border p-3">
            <div className="text-xs text-gray-500">Total</div>
            <div className="text-xl font-semibold text-gray-900">
              {counts.total}
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs text-gray-500">Read</div>
            <div className="text-xl font-semibold text-gray-900">
              {counts.read}
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs text-gray-500">Unread</div>
            <div className="text-xl font-semibold text-gray-900">
              {counts.unread}
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs text-gray-500">Replied</div>
            <div className="text-xl font-semibold text-gray-900">
              {counts.replied}
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs text-gray-500">Not Replied</div>
            <div className="text-xl font-semibold text-gray-900">
              {counts.notReplied}
            </div>
          </div>
        </div>

        {/* Sort + page size */}
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="createdAt">Date</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="repliesCount">Replies Count</option>
            </select>
            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="inline-flex items-center rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
              title="Toggle sort direction"
            >
              Direction <SortIcon />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Per page:</span>
            <select
              value={String(pageSize)}
              onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            >
              {[10, 20, 40, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <span className="text-sm text-gray-500">or custom</span>
            <input
              type="number"
              value={customPageSize}
              onChange={(e) => setCustomPageSize(e.target.value)}
              placeholder="e.g. 25"
              className="w-24 rounded border border-gray-300 px-3 py-2 text-sm"
            />
            <button
              onClick={applyCustomPageSize}
              className="rounded px-3 py-2 text-sm border border-gray-300 hover:bg-gray-50"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4 hidden md:table-cell">Phone</th>
                <th className="py-3 pr-4">Message</th>
                <th className="py-3 pr-4 text-center">Replies</th>
                <th className="py-3 pr-4 hidden lg:table-cell">Created</th>
                <th className="py-3 pl-2 pr-0 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageSlice.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500">
                    No messages found.
                  </td>
                </tr>
              ) : (
                pageSlice.map((m) => {
                  const name = [m.firstName, m.lastName]
                    .filter(Boolean)
                    .join(" ");
                  const preview =
                    (m.message_text || "").length > 80
                      ? `${m.message_text.slice(0, 80)}…`
                      : m.message_text || "—";
                  const repliesCount = (m.replies || []).length || 0;
                  const dateLabel = m.createdAt
                    ? new Date(m.createdAt).toLocaleString()
                    : "—";

                  return (
                    <React.Fragment key={m._id}>
                      <tr className="border-b">
                        <td className="py-3 pr-4">
                          <Link
                            to={`/reply-message/${m._id}`}
                            className="font-medium text-gray-900 hover:underline"
                            title="Open message & replies"
                          >
                            {name || "—"}
                          </Link>
                          <div className="text-xs text-gray-500 lg:hidden">
                            {dateLabel}
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-gray-700">
                          {m.email || "—"}
                        </td>
                        <td className="py-3 pr-4 text-gray-700 hidden md:table-cell">
                          {m.phone || "—"}
                        </td>
                        <td className="py-3 pr-4 text-gray-700">{preview}</td>
                        <td className="py-3 pr-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                              repliesCount > 0
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-gray-50 text-gray-700 border border-gray-200"
                            }`}
                            title={`${repliesCount} repl${
                              repliesCount === 1 ? "y" : "ies"
                            }`}
                          >
                            {repliesCount}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-gray-700 hidden lg:table-cell">
                          {dateLabel}
                        </td>
                        <td className="py-3 pl-2 pr-0 text-right">
                          <button
                            className="inline-flex items-center justify-center p-2 rounded hover:bg-red-50 text-red-600"
                            title="Delete Permanently"
                            onClick={() => deletePermanent(m._id)}
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>

                      {/* Replies section under each message */}
                      <tr className="border-b">
                        <td colSpan={7} className="pb-4">
                          <div className="">
                            <div className="text-xs font-semibold text-gray-700 mb-2">
                              Replies
                            </div>

                            {m.replies && m.replies.length > 0 ? (
                              <ul className="space-y-2">
                                {m.replies.map((r, idx) => (
                                  <li
                                    key={idx}
                                    className="text-xs text-gray-700 rounded border bg-white p-2"
                                  >
                                    <div className="flex justify-between flex-wrap items-center gap-x-2 gap-y-1">
                                      <span className="font-semibold">
                                        {r.name || "Support"}
                                      </span>
                                      {r.email && (
                                        <span className="text-gray-500">
                                          • {r.email}
                                        </span>
                                      )}
                                      <span className="text-gray-500">
                                        •{" "}
                                        {r.timestamp
                                          ? new Date(
                                              r.timestamp
                                            ).toLocaleString()
                                          : "—"}
                                      </span>
                                      <div className="mt-1 whitespace-pre-wrap">
                                        {r.message || "—"}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="text-xs text-gray-500">
                                No replies yet.
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium text-gray-900">
              {filteredSorted.length === 0
                ? 0
                : Math.min(filteredSorted.length, startIdx + 1)}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-900">
              {Math.min(filteredSorted.length, startIdx + pageSlice.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900">
              {filteredSorted.length}
            </span>{" "}
            results
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 rounded border text-sm ${
                  p === currentPage
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReplies;
