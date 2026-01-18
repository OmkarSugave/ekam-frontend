import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div className="p-6 space-y-5">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <Link to="/admin/branches" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Branch Management</h2>
        </Link>

        <Link to="/admin/batches" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Batch Management</h2>
        </Link>

        <Link to="/admin/staff" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Staff Management</h2>
        </Link>

        <Link to="/admin/players" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Player Management</h2>
        </Link>

        <Link to="/admin/tournaments" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Tournaments</h2>
        </Link>

        <Link to="/admin/fees" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Fees Management</h2>
        </Link>

        <Link to="/admin/notifications" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Notifications</h2>
        </Link>

        <Link to="/admin/analytics" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        </Link>

        <Link to="/account/settings" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Account Settings</h2>
        </Link>
      </div>
    </div>
  );
}
