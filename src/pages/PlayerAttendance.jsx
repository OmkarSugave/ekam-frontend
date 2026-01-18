// import { useEffect, useState } from "react";
// import api from "../api/api";

// export default function PlayerAttendance() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const res = await api.get("/players/attendance");
//       setLogs(res.data);
//     })();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-4">
//       <h1 className="text-2xl font-bold">My Attendance</h1>

//       <div className="bg-white p-4 rounded shadow space-y-2">
//         {logs.map((l) => (
//           <div key={l._id} className="border-b pb-2">
//             <p className="font-semibold">
//               {new Date(l.date).toDateString()}
//             </p>
//             <p>Status: {l.status}</p>
//             <p className="text-sm text-gray-600">{l.notes}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import api from "../api/api";

// export default function PlayerAttendance() {
//   const [attendance, setAttendance] = useState([]);

//   useEffect(() => {
//     const load = async () => {
//       const res = await api.get("/players/dashboard");
//       setAttendance(res.data.attendance || []);
//     };
//     load();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-4">
//       <h1 className="text-2xl font-bold">My Attendance</h1>

//       <div className="bg-white rounded shadow p-4 space-y-2">
//         {attendance.length === 0 && (
//           <p className="text-gray-500">No attendance records</p>
//         )}

//         {attendance.map((a, i) => (
//           <div key={i} className="border-b pb-2">
//             <p className="font-semibold">
//               {new Date(a.date).toLocaleDateString()}
//             </p>
//             <p
//               className={`font-medium ${
//                 a.status === "PRESENT"
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {a.status}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../api/api";

export default function PlayerAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/players/my-attendance");
        setAttendance(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load attendance");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="p-6">Loading attendance…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Attendance</h1>

      <div className="bg-white rounded shadow p-4 space-y-2">
        {attendance.length === 0 && (
          <p className="text-gray-500">No attendance marked yet</p>
        )}

        {attendance.map((a, i) => (
          <div key={i} className="border-b pb-2">
            <p className="font-semibold">
              {new Date(a.date).toLocaleDateString()}
            </p>
            <p
              className={`font-medium ${
                a.status === "PRESENT"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {a.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
