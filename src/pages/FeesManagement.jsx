import { useEffect, useState } from "react";
import api from "../api/api";
import { FILE_BASE_URL } from "../utils/constants";
import Card from "../components/Card";

export default function FeesManagement() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/admin/fees");
      setPlayers(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load fee records");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ ADMIN VERIFY FEES
  const verifyFees = async (id) => {
    if (!window.confirm("Verify this payment?")) return;

    try {
      setLoading(true);
      await api.put(`/admin/fees/verify/${id}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADMIN RESET FEES (DELETE RECEIPT)
  const resetFees = async (id) => {
    if (!window.confirm("Reset fee status to UNPAID?")) return;

    try {
      await api.delete(`/admin/fees/receipt/${id}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Fees Management</h1>

      <Card className="space-y-4">
        
        {players.map((p) => (
          <div
            key={p._id}
            className="border-b pb-3 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{p.user?.name || "-"}</p>

              <p className="text-sm text-gray-600">
                Batch: {p.batch?.name || "-"}
              </p>

              <p className="text-sm font-medium">
                Status:{" "}
                <span
                  className={
                    p.fees?.status === "PAID"
                      ? "text-green-600"
                      : p.fees?.status === "SUBMITTED"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {p.fees?.status || "UNPAID"}
                </span>
              </p>

              {/* ✅ FIXED RECEIPT LINK */}
              {p.fees?.receiptUrl && (
              <button
  onClick={() => {
    const url = `${FILE_BASE_URL}/${p.fees.receiptUrl.replace(/^\//, "")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }}
  className="text-blue-600 underline text-sm"
>
  View Receipt
</button>


              )}
            </div>

            <div className="flex flex-col gap-2">
              {/* VERIFY */}
              {p.fees?.status === "SUBMITTED" && (
                <button
                  disabled={loading}
                  onClick={() => verifyFees(p._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Verify
                </button>
              )}

              {/* VERIFIED */}
              {p.fees?.status === "PAID" && (
                <span className="text-green-600 font-semibold">
                  Verified ✔
                </span>
              )}

              {/* RESET */}
              {p.fees?.status !== "UNPAID" && (
                <button
                  onClick={() => resetFees(p._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        ))}

        {players.length === 0 && (
          <p className="text-center text-gray-500">
            No fee records found
          </p>
        )}
      </Card>
    </div>
  );
}
