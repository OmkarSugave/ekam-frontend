import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function StaffDashboard() {
  const { logout } = useAuth();

  return (
    <div className="p-6 space-y-5">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Coach Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <Link to="/coach/schedule" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Manage Schedule</h2>
        </Link>

        <Link to="/coach/attendance" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Attendance</h2>
        </Link>

        <Link to="/coach/assessments" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Assessments</h2>
        </Link>

        <Link to="/coach/analytics" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Analytics</h2>
        </Link>

        <Link to="/account/settings" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Account Settings</h2>
        </Link>
      </div>
    </div>
  );
}
