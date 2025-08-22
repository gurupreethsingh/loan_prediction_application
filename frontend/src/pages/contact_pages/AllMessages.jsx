// // src/pages/contact_pages/AllMessages.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiTrash2 } from "react-icons/fi";
// import globalBackendRoute from "../../config/config";

// const AllMessages = () => {
//   const API =
//     globalBackendRoute ||
//     import.meta?.env?.VITE_BACKEND_URL ||
//     "http://localhost:5000";

//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");
//   const [q, setQ] = useState("");

//   // pagination
//   const [pageSize, setPageSize] = useState(10); // default 10
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     let active = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${API}/api/all-messages`);
//         const json = await res.json();
//         if (!res.ok)
//           throw new Error(json?.error || "Failed to fetch messages.");
//         if (active) setMessages(Array.isArray(json) ? json : []);
//       } catch (e) {
//         if (active) setErr(e.message || "Something went wrong.");
//       } finally {
//         if (active) setLoading(false);
//       }
//     })();
//     return () => {
//       active = false;
//     };
//   }, [API]);

//   // Hide items that are already in trash
//   const activeMessages = useMemo(
//     () => messages.filter((m) => !m.isTrashed),
//     [messages]
//   );

//   // search
//   const searched = useMemo(() => {
//     if (!q.trim()) return activeMessages;
//     const needle = q.toLowerCase();
//     return activeMessages.filter((m) => {
//       const parts = [
//         m.firstName,
//         m.lastName,
//         m.email,
//         m.phone,
//         m.message_text,
//         m.isRead ? "read" : "unread",
//         new Date(
//           m.createdAt || m.timestamp || m.updatedAt || ""
//         ).toLocaleString(),
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();
//       return parts.includes(needle);
//     });
//   }, [activeMessages, q]);

//   // counts
//   const total = activeMessages.length;
//   const readCount = activeMessages.filter((m) => m.isRead).length;
//   const repliedCount = activeMessages.filter(
//     (m) => (m.replies?.length || 0) > 0
//   ).length;
//   const notRepliedCount = total - repliedCount;

//   // pagination slice
//   const totalPages = Math.max(
//     1,
//     Math.ceil(searched.length / Math.max(1, pageSize))
//   );
//   const currentPage = Math.min(page, totalPages);
//   const startIdx = (currentPage - 1) * pageSize;
//   const pageRows = searched.slice(startIdx, startIdx + pageSize);

//   // adjust page when search/pageSize changes
//   useEffect(() => {
//     setPage(1);
//   }, [q, pageSize]);

//   const openMessage = (id) => navigate(`/reply-message/${id}`);

//   const moveToTrash = async (id) => {
//     const ok = window.confirm("Move this message to Trash?");
//     if (!ok) return;
//     try {
//       const res = await fetch(`${API}/api/messages/${id}/trash`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.error || "Failed to move to trash.");

//       // Update local state
//       setMessages((prev) =>
//         prev.map((m) =>
//           m._id === id
//             ? { ...m, isTrashed: true, trashedAt: new Date().toISOString() }
//             : m
//         )
//       );
//     } catch (e) {
//       alert(e.message || "Failed to move message to trash.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
//         <div className="max-w-5xl mx-auto bg-white p-6 md:p-8">
//           <div className="h-6 w-40 bg-gray-200 mb-6" />
//           <div className="h-10 w-full bg-gray-200 mb-4" />
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//             <div className="h-16 bg-gray-200 rounded" />
//             <div className="h-16 bg-gray-200 rounded" />
//             <div className="h-16 bg-gray-200 rounded" />
//             <div className="h-16 bg-gray-200 rounded" />
//           </div>
//           <div className="h-10 w-full bg-gray-200 mb-2" />
//           <div className="h-10 w-full bg-gray-200 mb-2" />
//           <div className="h-10 w-full bg-gray-200" />
//         </div>
//       </div>
//     );
//   }

//   if (err) {
//     return (
//       <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
//         <div className="max-w-5xl mx-auto bg-white p-6 md:p-8">
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
//         {/* Header bar */}
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//             All messages
//           </h1>

//           {/* Search */}
//           <div className="w-full md:max-w-xl">
//             <label className="sr-only" htmlFor="search">
//               Search messages
//             </label>
//             <input
//               id="search"
//               type="text"
//               placeholder="Search by name, email, phone, message, status..."
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               className="w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
//             />
//             <p className="mt-1 text-xs text-gray-500">
//               Showing {pageRows.length} of {searched.length} (Filtered) •{" "}
//               {total} total active
//             </p>
//           </div>

//           {/* Counts */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 w-full md:w-auto">
//             <div className="rounded-lg border p-3">
//               <div className="text-xs text-gray-500">Total</div>
//               <div className="text-lg font-semibold text-gray-900">{total}</div>
//             </div>
//             <div className="rounded-lg border p-3">
//               <div className="text-xs text-gray-500">Read</div>
//               <div className="text-lg font-semibold text-gray-900">
//                 {readCount}
//               </div>
//             </div>
//             <div className="rounded-lg border p-3">
//               <div className="text-xs text-gray-500">Replied</div>
//               <div className="text-lg font-semibold text-gray-900">
//                 {repliedCount}
//               </div>
//             </div>
//             <div className="rounded-lg border p-3">
//               <div className="text-xs text-gray-500">Not Replied</div>
//               <div className="text-lg font-semibold text-gray-900">
//                 {notRepliedCount}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Page size control */}
//         <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div className="text-sm text-gray-600">
//             Page size:
//             <select
//               className="ml-2 border border-gray-300 rounded px-2 py-1"
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//             >
//               {[10, 20, 40, 50].map((n) => (
//                 <option key={n} value={n}>
//                   {n}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="number"
//               min={1}
//               className="ml-3 w-24 border border-gray-300 rounded px-2 py-1"
//               value={pageSize}
//               onChange={(e) => {
//                 const v = Number(e.target.value) || 1;
//                 setPageSize(v < 1 ? 1 : v);
//               }}
//             />
//           </div>
//           <div className="text-xs text-gray-500">
//             Page {currentPage} of {totalPages}
//           </div>
//         </div>

//         {/* List */}
//         <div className="mt-3 overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-600 border-b">
//                 <th className="py-3 pr-4">Name</th>
//                 <th className="py-3 pr-4">Email</th>
//                 <th className="py-3 pr-4 hidden md:table-cell">Phone</th>
//                 <th className="py-3 pr-4">Message</th>
//                 <th className="py-3 pr-4 text-center hidden sm:table-cell">
//                   Replies
//                 </th>
//                 <th className="py-3 pr-4 hidden lg:table-cell">Date</th>
//                 <th className="py-3 pr-0 text-center">Status</th>
//                 <th className="py-3 pl-2 pr-0 text-right">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {pageRows.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="py-6 text-center text-gray-500">
//                     No messages found.
//                   </td>
//                 </tr>
//               ) : (
//                 pageRows.map((m) => {
//                   const fullName = [m.firstName, m.lastName]
//                     .filter(Boolean)
//                     .join(" ");
//                   const preview =
//                     (m.message_text || "").length > 80
//                       ? `${m.message_text.slice(0, 80)}…`
//                       : m.message_text || "—";
//                   const repliesCount = m.replies?.length || 0;
//                   const dateLabel = m.createdAt
//                     ? new Date(m.createdAt).toLocaleString()
//                     : m.updatedAt
//                     ? new Date(m.updatedAt).toLocaleString()
//                     : "—";

//                   return (
//                     <tr
//                       key={m._id}
//                       className="border-b hover:bg-gray-50 cursor-pointer"
//                       onClick={() => openMessage(m._id)}
//                     >
//                       <td className="py-3 pr-4">
//                         <div className="font-medium text-gray-900">
//                           {fullName || "—"}
//                         </div>
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
//                       <td className="py-3 pr-4 text-center hidden sm:table-cell">
//                         <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs text-gray-700">
//                           {repliesCount}
//                         </span>
//                       </td>
//                       <td className="py-3 pr-4 hidden lg:table-cell text-gray-700">
//                         {dateLabel}
//                       </td>
//                       <td className="py-3 pr-0 text-center">
//                         {m.isRead ? (
//                           <span className="inline-flex rounded-full bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 text-xs">
//                             Read
//                           </span>
//                         ) : (
//                           <span className="inline-flex rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 text-xs">
//                             Unread
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-3 pl-2 pr-0 text-right">
//                         <button
//                           className="inline-flex items-center justify-center p-2 rounded hover:bg-red-50 text-red-600"
//                           title="Move to Trash"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             moveToTrash(m._id);
//                           }}
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

//         {/* Pagination controls */}
//         <div className="mt-4 flex flex-wrap items-center gap-2">
//           <button
//             className="px-3 py-1.5 border rounded disabled:opacity-50"
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//             <button
//               key={p}
//               onClick={() => setPage(p)}
//               className={`px-3 py-1.5 border rounded ${
//                 p === currentPage
//                   ? "bg-gray-100 font-semibold"
//                   : "hover:bg-gray-50"
//               }`}
//             >
//               {p}
//             </button>
//           ))}

//           <button
//             className="px-3 py-1.5 border rounded disabled:opacity-50"
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>

//         <p className="mt-4 text-xs text-gray-500">
//           Click any row to view & reply to the message. Deleting moves it to
//           Trash (auto-deletes after 30 days).
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AllMessages;

// mark as read

//

// src/pages/contact_pages/AllMessages.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import globalBackendRoute from "../../config/config";

const AllMessages = () => {
  const API =
    globalBackendRoute ||
    import.meta?.env?.VITE_BACKEND_URL ||
    "http://localhost:5000";

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");

  // pagination
  const [pageSize, setPageSize] = useState(10); // default 10
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/all-messages`);
        const json = await res.json();
        if (!res.ok)
          throw new Error(json?.error || "Failed to fetch messages.");
        if (active) setMessages(Array.isArray(json) ? json : []);
      } catch (e) {
        if (active) setErr(e.message || "Something went wrong.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [API]);

  // Hide items that are already in trash
  const activeMessages = useMemo(
    () => messages.filter((m) => !m.isTrashed),
    [messages]
  );

  // search
  const searched = useMemo(() => {
    if (!q.trim()) return activeMessages;
    const needle = q.toLowerCase();
    return activeMessages.filter((m) => {
      const parts = [
        m.firstName,
        m.lastName,
        m.email,
        m.phone,
        m.message_text,
        m.isRead ? "read" : "unread",
        new Date(
          m.createdAt || m.timestamp || m.updatedAt || ""
        ).toLocaleString(),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return parts.includes(needle);
    });
  }, [activeMessages, q]);

  // counts
  const total = activeMessages.length;
  const readCount = activeMessages.filter((m) => m.isRead).length;
  const repliedCount = activeMessages.filter(
    (m) => (m.replies?.length || 0) > 0
  ).length;
  const notRepliedCount = total - repliedCount;

  // pagination slice
  const totalPages = Math.max(
    1,
    Math.ceil(searched.length / Math.max(1, pageSize))
  );
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageRows = searched.slice(startIdx, startIdx + pageSize);

  // adjust page when search/pageSize changes
  useEffect(() => {
    setPage(1);
  }, [q, pageSize]);

  // NEW: mark as read before navigating (optimistic UI)
  const openMessage = async (id) => {
    try {
      // fire-and-forget, don't block navigation if it fails
      fetch(`${API}/api/messages/mark-as-read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: id }),
      }).catch(() => {});
      // optimistic update
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: true } : m))
      );
    } finally {
      navigate(`/reply-message/${id}`);
    }
  };

  const moveToTrash = async (id) => {
    const ok = window.confirm("Move this message to Trash?");
    if (!ok) return;
    try {
      const res = await fetch(`${API}/api/messages/${id}/trash`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to move to trash.");

      // Update local state
      setMessages((prev) =>
        prev.map((m) =>
          m._id === id
            ? { ...m, isTrashed: true, trashedAt: new Date().toISOString() }
            : m
        )
      );
    } catch (e) {
      alert(e.message || "Failed to move message to trash.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8">
          <div className="h-6 w-40 bg-gray-200 mb-6" />
          <div className="h-10 w-full bg-gray-200 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
            <div className="h-16 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-full bg-gray-200 mb-2" />
          <div className="h-10 w-full bg-gray-200 mb-2" />
          <div className="h-10 w-full bg-gray-200" />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="max-w-7xl mx-auto w-full px-5 md:px-8 py-8">
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8">
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
        {/* Header bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            All messages
          </h1>

          {/* Search */}
          <div className="w-full md:max-w-xl">
            <label className="sr-only" htmlFor="search">
              Search messages
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, email, phone, message, status..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-lg border border-gray-300 focus:border-gray-400 focus:ring-0 px-4 py-2.5 text-gray-900 placeholder-gray-400"
            />
            <p className="mt-1 text-xs text-gray-500">
              Showing {pageRows.length} of {searched.length} (Filtered) •{" "}
              {total} total active
            </p>
          </div>

          {/* Counts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 w-full md:w-auto">
            <div className="rounded-lg border p-3">
              <div className="text-xs text-gray-500">Total</div>
              <div className="text-lg font-semibold text-gray-900">{total}</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-xs text-gray-500">Read</div>
              <div className="text-lg font-semibold text-gray-900">
                {readCount}
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-xs text-gray-500">Replied</div>
              <div className="text-lg font-semibold text-gray-900">
                {repliedCount}
              </div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-xs text-gray-500">Not Replied</div>
              <div className="text-lg font-semibold text-gray-900">
                {notRepliedCount}
              </div>
            </div>
          </div>
        </div>

        {/* Page size control */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600">
            Page size:
            <select
              className="ml-2 border border-gray-300 rounded px-2 py-1"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 40, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              className="ml-3 w-24 border border-gray-300 rounded px-2 py-1"
              value={pageSize}
              onChange={(e) => {
                const v = Number(e.target.value) || 1;
                setPageSize(v < 1 ? 1 : v);
              }}
            />
          </div>
          <div className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* List */}
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4 hidden md:table-cell">Phone</th>
                <th className="py-3 pr-4">Message</th>
                <th className="py-3 pr-4 text-center hidden sm:table-cell">
                  Replies
                </th>
                <th className="py-3 pr-4 hidden lg:table-cell">Date</th>
                <th className="py-3 pr-0 text-center">Status</th>
                <th className="py-3 pl-2 pr-0 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    No messages found.
                  </td>
                </tr>
              ) : (
                pageRows.map((m) => {
                  const fullName = [m.firstName, m.lastName]
                    .filter(Boolean)
                    .join(" ");
                  const preview =
                    (m.message_text || "").length > 80
                      ? `${m.message_text.slice(0, 80)}…`
                      : m.message_text || "—";
                  const repliesCount = m.replies?.length || 0;
                  const dateLabel = m.createdAt
                    ? new Date(m.createdAt).toLocaleString()
                    : m.updatedAt
                    ? new Date(m.updatedAt).toLocaleString()
                    : "—";

                  return (
                    <tr
                      key={m._id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => openMessage(m._id)}
                    >
                      <td className="py-3 pr-4">
                        <div className="font-medium text-gray-900">
                          {fullName || "—"}
                        </div>
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
                      <td className="py-3 pr-4 text-center hidden sm:table-cell">
                        <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs text-gray-700">
                          {repliesCount}
                        </span>
                      </td>
                      <td className="py-3 pr-4 hidden lg:table-cell text-gray-700">
                        {dateLabel}
                      </td>
                      <td className="py-3 pr-0 text-center">
                        {m.isRead ? (
                          <span className="inline-flex rounded-full bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 text-xs">
                            Read
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 text-xs">
                            Unread
                          </span>
                        )}
                      </td>
                      <td className="py-3 pl-2 pr-0 text-right">
                        <button
                          className="inline-flex items-center justify-center p-2 rounded hover:bg-red-50 text-red-600"
                          title="Move to Trash"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveToTrash(m._id);
                          }}
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            className="px-3 py-1.5 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 border rounded ${
                p === currentPage
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            className="px-3 py-1.5 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Click any row to view & reply to the message. Deleting moves it to
          Trash (auto-deletes after 30 days).
        </p>
      </div>
    </div>
  );
};

export default AllMessages;
