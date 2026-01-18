import { useEffect, useState } from "react";
import api from "../api/api";

export default function ParentFees() {
  const [player, setPlayer] = useState(undefined); // ⚠️ undefined = loading
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadPlayer = async () => {
    try {
      const res = await api.get("/account/my-child");
      setPlayer(res.data); // success
    } catch (err) {
      if (err.response?.status === 404) {
        setPlayer(null); // no player linked
      } else {
        console.error(err);
        setPlayer(null);
      }
    }
  };

  useEffect(() => {
    loadPlayer();
  }, []);

  const submitFees = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("receipt", file);

    setLoading(true);
    await api.post("/account/fees/submit", formData);
    setLoading(false);
    loadPlayer();
  };

  // 🔄 LOADING STATE
  if (player === undefined) {
    return <p className="p-6">Loading fees...</p>;
  }

  // ❌ NO PLAYER LINKED
  if (player === null) {
    return (
      <p className="p-6 text-red-600">
        No player is linked to this parent. Please contact admin.
      </p>
    );
  }

  // ✅ NORMAL UI
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Fees</h1>

      <p>
        Status:{" "}
        <span className="font-semibold">{player.fees.status}</span>
      </p>

      {player.fees.status === "UNPAID" && (
        <form onSubmit={submitFees} className="space-y-3">
          <input
            type="file"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Upload Payment Proof"}
          </button>
        </form>
      )}

      {player.fees.status === "SUBMITTED" && (
        <p className="text-yellow-600">
          Payment submitted. Waiting for admin verification.
        </p>
      )}

      {player.fees.status === "PAID" && (
        <p className="text-green-600">
          Fees paid and verified ✔
        </p>
      )}
    </div>
  );
}
