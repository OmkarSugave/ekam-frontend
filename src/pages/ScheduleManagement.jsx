import { useEffect, useState } from "react";
import api from "../api/api";

export default function ScheduleManagement() {
  const [players, setPlayers] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const [playerId, setPlayerId] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [goal, setGoal] = useState("");

  const [editId, setEditId] = useState(null);

  const loadPlayers = async () => {
    const res = await api.get("/staff/players");
    setPlayers(res.data);
  };

  const loadSchedule = async () => {
    if (!playerId) return;
    const res = await api.get(`/staff/schedule/${playerId}`);
    setSchedule(res.data);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    loadSchedule();
  }, [playerId]);

  const submit = async (e) => {
    e.preventDefault();

    if (!editId) {
      await api.post("/staff/schedule", { playerId, day, time, goal });
    } else {
      await api.put(`/staff/schedule/${editId}`, { day, time, goal });
    }

    setDay(""); setTime(""); setGoal("");
    setEditId(null);
    loadSchedule();
  };

  const edit = (s) => {
    setEditId(s._id);
    setDay(s.day);
    setTime(s.time);
    setGoal(s.goal);
  };

  const del = async (id) => {
    if (confirm("Delete schedule entry?")) {
      await api.delete(`/staff/schedule/${id}`);
      loadSchedule();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-5">
      <h1 className="text-2xl font-bold">Schedule Management</h1>

      <select
        className="border p-2 w-full rounded"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
      >
        <option value="">Select Player</option>
        {players.map((p) => (
          <option key={p._id} value={p._id}>
            {p.user?.name}
          </option>
        ))}
      </select>

      {playerId && (
        <>
          <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={submit}>
            <h2 className="font-semibold text-lg">Add Schedule</h2>

            <select className="border p-2 w-full rounded" value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="">Day</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>

            <input className="border p-2 w-full rounded"
              placeholder="Time (e.g., 5 PM)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <input className="border p-2 w-full rounded"
              placeholder="Training Goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              {editId ? "Update" : "Add"}
            </button>
          </form>

          <div className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="font-semibold text-lg">Current Schedule</h2>

            {schedule.map((s) => (
              <div key={s._id} className="border-b pb-2 flex justify-between">
                <div>
                  <p className="font-semibold">{s.day}</p>
                  <p className="text-sm">{s.time}</p>
                  <p className="text-sm text-gray-600">{s.goal}</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => edit(s)} className="bg-green-600 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button onClick={() => del(s._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
