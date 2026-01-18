import { useEffect, useState } from "react";
import api from "../api/api";

export default function TournamentManagement() {
  const [tournaments, setTournaments] = useState([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [eligibility, setEligibility] = useState("");

  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await api.get("/admin/tournaments");
    setTournaments(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!editId) {
      await api.post("/admin/tournaments", {
        title, date, venue, eligibility
      });
    } else {
      await api.put(`/admin/tournaments/${editId}`, {
        title, date, venue, eligibility
      });
    }

    setTitle(""); setDate(""); setVenue(""); setEligibility("");
    setEditId(null);
    load();
  };

  const edit = (t) => {
    setEditId(t._id);
    setTitle(t.title);
    setDate(t.date?.substring(0, 10));
    setVenue(t.venue);
    setEligibility(t.eligibility);
  };

  const del = async (id) => {
    if (confirm("Delete tournament?")) {
      await api.delete(`/admin/tournaments/${id}`);
      load();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tournament Management</h1>

      <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={submit}>
        <input className="border p-2 w-full" placeholder="Title"
          value={title} onChange={(e) => setTitle(e.target.value)} />

        <input type="date" className="border p-2 w-full"
          value={date} onChange={(e) => setDate(e.target.value)} />

        <input className="border p-2 w-full" placeholder="Venue"
          value={venue} onChange={(e) => setVenue(e.target.value)} />

        <input className="border p-2 w-full" placeholder="Eligibility"
          value={eligibility} onChange={(e) => setEligibility(e.target.value)} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update Tournament" : "Add Tournament"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow space-y-2">
        {tournaments.map((t) => (
          <div key={t._id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-sm">{new Date(t.date).toDateString()}</p>
              <p className="text-sm text-gray-600">{t.venue}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => edit(t)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => del(t._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
