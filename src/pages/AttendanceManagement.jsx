import { useEffect, useState } from "react";
import api from "../api/api";

export default function AttendanceManagement() {
  const [players, setPlayers] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [playerId, setPlayerId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [notes, setNotes] = useState("");

  const [editId, setEditId] = useState(null);

  const loadPlayers = async () => {
    const res = await api.get("/staff/players");
    setPlayers(res.data);
  };

  const loadAttendance = async () => {
    const res = await api.get("/staff/attendance");
    setAttendance(res.data);
  };

  useEffect(() => {
    loadPlayers();
    loadAttendance();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!editId) {
      await api.post("/staff/attendance", { playerId, date, status, notes });
    } else {
      await api.put(`/staff/attendance/${editId}`, { status, notes });
    }

    setPlayerId(""); setDate(""); setStatus("Present"); setNotes("");
    setEditId(null);
    loadAttendance();
  };

  const edit = (a) => {
    setEditId(a._id);
    setPlayerId(a.player._id);
    setDate(a.date.substring(0, 10));
    setStatus(a.status);
    setNotes(a.notes || "");
  };

  const del = async (id) => {
    if (confirm("Delete record?")) {
      await api.delete(`/staff/attendance/${id}`);
      loadAttendance();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-5">
      <h1 className="text-2xl font-bold">Attendance Management</h1>

      <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow">
        <select className="border p-2 w-full" value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}>
          <option value="">Select Player</option>
          {players.map((p) => (
            <option key={p._id} value={p._id}>{p.user.name}</option>
          ))}
        </select>

        <input type="date" className="border p-2 w-full"
          value={date} onChange={(e) => setDate(e.target.value)} />

        <select className="border p-2 w-full" value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option>Present</option>
          <option>Absent</option>
          <option>Late</option>
        </select>

        <input className="border p-2 w-full" placeholder="Notes"
          value={notes} onChange={(e) => setNotes(e.target.value)} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update Attendance" : "Mark Attendance"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow space-y-3">
        {attendance.map((a) => (
          <div key={a._id} className="border-b pb-2 flex justify-between">
            <div>
              <p className="font-semibold">
                {a.player?.user?.name} — {new Date(a.date).toDateString()}
              </p>
              <p className="text-sm">Status: {a.status}</p>
              <p className="text-sm text-gray-600">{a.notes}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => edit(a)} className="bg-green-600 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => del(a._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
