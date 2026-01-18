import { useEffect, useState } from "react";
import api from "../api/api";

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetType, setTargetType] = useState("all");

  const [branchId, setBranchId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [playerId, setPlayerId] = useState("");

  const [branches, setBranches] = useState([]);
  const [batches, setBatches] = useState([]);
  const [players, setPlayers] = useState([]);

  const load = async () => {
    const noti = await api.get("/admin/notifications");
    const br = await api.get("/admin/branches");
    const bt = await api.get("/admin/batches");
    const pl = await api.get("/admin/players");

    setNotifications(noti.data);
    setBranches(br.data);
    setBatches(bt.data);
    setPlayers(pl.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/admin/notifications", {
      title,
      message,
      targetType,
      branch: branchId || null,
      batch: batchId || null,
      player: playerId || null,
    });

    setTitle(""); setMessage(""); 
    setTargetType("all");
    setBranchId(""); setBatchId(""); setPlayerId("");

    load();
  };

  const del = async (id) => {
    if (confirm("Delete notification?")) {
      await api.delete(`/admin/notifications/${id}`)
      load();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Notification Management</h1>

      <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={submit}>
        <input className="border p-2 w-full" placeholder="Title"
          value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea className="border p-2 w-full" placeholder="Message"
          value={message} onChange={(e) => setMessage(e.target.value)} />

        <select className="border p-2 w-full"
          value={targetType} onChange={(e) => setTargetType(e.target.value)}>
          <option value="all">All Users</option>
          <option value="branch">Branch</option>
          <option value="batch">Batch</option>
          <option value="player">Player</option>
        </select>

        {targetType === "branch" && (
          <select className="border p-2 w-full"
            value={branchId} onChange={(e) => setBranchId(e.target.value)}>
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        )}

        {targetType === "batch" && (
          <select className="border p-2 w-full"
            value={batchId} onChange={(e) => setBatchId(e.target.value)}>
            <option value="">Select Batch</option>
            {batches.map((bt) => (
              <option key={bt._id} value={bt._id}>{bt.name}</option>
            ))}
          </select>
        )}

        {targetType === "player" && (
          <select className="border p-2 w-full"
            value={playerId} onChange={(e) => setPlayerId(e.target.value)}>
            <option value="">Select Player</option>
            {players.map((p) => (
              <option key={p._id} value={p._id}>{p.user?.name}</option>
            ))}
          </select>
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Notification
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow space-y-3">
        {notifications.map((n) => (
          <div key={n._id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-semibold">{n.title}</p>
              <p className="text-sm text-gray-600">{n.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(n.date).toLocaleString()}
              </p>
              <p className="text-xs text-blue-600">Target: {n.targetType}</p>
            </div>

            <button
              onClick={() => del(n._id)}
              className="bg-red-600 text-white px-
               3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
