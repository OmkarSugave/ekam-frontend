// // import { useEffect, useState } from "react";
// // import api from "../api/api";

// // export default function PlayerNotifications() {
// //   const [notifications, setNotifications] = useState([]);

// //   useEffect(() => {
// //     (async () => {
// //       const res = await api.get("/players/notifications");
// //       setNotifications(res.data);
// //     })();
// //   }, []);

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 space-y-4">
// //       <h1 className="text-2xl font-bold">Notifications</h1>

// //       <div className="bg-white p-4 rounded shadow space-y-3">
// //         {notifications.map((n) => (
// //           <div key={n._id} className="border-b pb-2">
// //             <p className="font-semibold">{n.title}</p>
// //             <p className="text-sm">{n.message}</p>
// //             <p className="text-xs text-gray-500">
// //               {new Date(n.date).toLocaleString()}
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import api from "../api/api";

// export default function PlayerNotifications() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const load = async () => {
//       const res = await api.get("/players/notifications");
//       setNotifications(res.data);
//     };
//     load();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Notifications</h1>

//       <div className="bg-white p-4 rounded shadow space-y-3">
//         {notifications.length === 0 && (
//           <p className="text-gray-500">No notifications</p>
//         )}

//         {notifications.map((n) => (
//           <div key={n._id} className="border-b pb-2">
//             <p className="font-semibold">{n.title}</p>
//             <p className="text-sm">{n.message}</p>
//             <p className="text-xs text-gray-500">
//               {new Date(n.date).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../api/api";

export default function PlayerNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/players/notifications");
      setNotifications(res.data);
    };
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Notifications</h1>

      <div className="bg-white p-4 rounded shadow space-y-3">
        {notifications.length === 0 && (
          <p className="text-gray-500">No notifications</p>
        )}

        {notifications.map((n) => (
          <div key={n._id} className="border-b pb-2">
            <p className="font-semibold">{n.title}</p>
            <p className="text-sm">{n.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(n.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
