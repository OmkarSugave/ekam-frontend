import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function PlayerDashboard() {
  const { logout } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.get("/players/dashboard");
      setData(res.data);
    })();
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Player Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-5 rounded shadow space-y-2">
        <h2 className="font-bold text-xl">{data.user.name}</h2>
        <p>Branch: {data.branch?.name}</p>
        <p>Batch: {data.batch?.name}</p>
        <p>Coach: {data.assignedCoach?.user?.name}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <Link to="/players/schedule" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">My Schedule</h2>
        </Link>

        <Link to="/players/assessments" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">My Assessments</h2>
        </Link>

        <Link to="/players/attendance" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">My Attendance</h2>
        </Link>

        <Link to="/players/notifications" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Notifications</h2>
        </Link>

        <Link to="/report/player/${data._id}" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Progress Report</h2>
        </Link>

        <Link to="/account/settings" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Account Settings</h2>
        </Link>
      </div>
    </div>
  );
}
