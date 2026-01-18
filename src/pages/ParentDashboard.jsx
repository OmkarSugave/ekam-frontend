import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function ParentDashboard() {
  const { logout } = useAuth();

  const [player, setPlayer] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch parent-linked player
  const fetchPlayer = async () => {
    try {
      // ⚠️ adjust endpoint if yours is different
      const res = await api.get("/account/my-child");
      setPlayer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, []);

  // 🔹 Submit fee payment proof
  const submitFees = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select payment screenshot");

    const formData = new FormData();
    formData.append("receipt", file);

    try {
      setLoading(true);
      await api.post("/account/fees/submit", formData);
      alert("Payment submitted for verification");
      setFile(null);
      fetchPlayer();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit fees");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* QUICK LINKS */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
  to="/parent/fees"
  className="bg-white p-5 rounded shadow"
>
  <h2 className="text-xl font-semibold">Fees</h2>
  <p className="text-sm text-gray-600 mt-1">
    Upload payment & check status
  </p>
</Link>

        <Link to="/players/notifications" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Notifications</h2>
        </Link>

        <Link to="/account/settings" className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold">Account Settings</h2>
        </Link>
      </div>

      {/* ================= FEES SECTION ================= */}
      {player && (
        <div className="bg-white p-5 rounded shadow max-w-lg">
          <h2 className="text-xl font-semibold mb-3">Fees Status</h2>

          <p className="mb-3">
            <span className="font-medium">Current Status:</span>{" "}
            <span
              className={`font-bold ${
                player.fees.status === "PAID"
                  ? "text-green-600"
                  : player.fees.status === "SUBMITTED"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {player.fees.status}
            </span>
          </p>

          {/* UNPAID → Upload */}
          {player.fees.status === "UNPAID" && (
            <form onSubmit={submitFees} className="space-y-3">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="border p-2 w-full"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Submitting..." : "Upload Payment Proof"}
              </button>
            </form>
          )}

          {/* SUBMITTED */}
          {player.fees.status === "SUBMITTED" && (
            <p className="text-yellow-600 font-medium">
              Payment submitted. Waiting for admin verification.
            </p>
          )}

          {/* PAID */}
          {player.fees.status === "PAID" && (
            <p className="text-green-600 font-medium">
              Fees paid and verified ✔
            </p>
          )}
        </div>
      )}
    </div>
  );
}
