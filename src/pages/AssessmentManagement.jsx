import { useEffect, useState } from "react";
import api from "../api/api";

export default function AssessmentManagement() {
  const [players, setPlayers] = useState([]);
  const [assessments, setAssessments] = useState([]);

  const [selectedPlayer, setSelectedPlayer] = useState("");

  const [notes, setNotes] = useState("");
  const [skills, setSkills] = useState([]);
  const [editId, setEditId] = useState(null);

  const loadPlayers = async () => {
    const res = await api.get("/staff/players");
    setPlayers(res.data);
  };

  const loadAssessments = async () => {
    if (!selectedPlayer) return;
    const res = await api.get(`/staff/assessments/${selectedPlayer}`);
    setAssessments(res.data);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    loadAssessments();
  }, [selectedPlayer]);

  const startNew = () => {
    setEditId(null);
    setNotes("");

    const base = Array.from({ length: 10 }).map((_, i) => ({
      skillName: `Skill ${i + 1}`,
      level: 1,
      comments: ""
    }));

    setSkills(base);
  };

  const edit = (a) => {
    setEditId(a._id);
    setNotes(a.notes);
    setSkills(a.skillProgress);
  };

  const updateSkill = (i, key, value) => {
    const updated = [...skills];
    updated[i][key] = value;
    setSkills(updated);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!editId) {
      await api.post("/staff/assessment", {
        playerId: selectedPlayer,
        notes,
        skillProgress: skills,
      });
    } else {
      await api.put(`/staff/assessment/${editId}`, {
        notes,
        skillProgress: skills,
      });
    }

    setEditId(null);
    setNotes("");
    loadAssessments();
  };

  const del = async (id) => {
    if (confirm("Delete assessment?")) {
      await api.delete(`/staff/assessment/${id}`);
      loadAssessments();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-5">
      <h1 className="text-2xl font-bold">Assessment Management</h1>

      {/* PLAYER SELECT */}
      <select className="border p-2 w-full rounded"
        value={selectedPlayer}
        onChange={(e) => setSelectedPlayer(e.target.value)}>
        <option value="">Select Player</option>
        {players.map((p) => (
          <option key={p._id} value={p._id}>
            {p.user?.name}
          </option>
        ))}
      </select>

      {/* FORM */}
      {selectedPlayer && (
        <>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={startNew}
          >
            Add New Assessment
          </button>

          {skills.length > 0 && (
            <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={submit}>
              <textarea
                className="border p-2 w-full rounded"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <div className="grid md:grid-cols-2 gap-4">
                {skills.map((s, i) => (
                  <div key={i} className="border p-3 rounded">
                    <p>{s.skillName}</p>

                    <select className="border p-2 w-full mt-2 rounded"
                      value={s.level}
                      onChange={(e) => updateSkill(i, "level", e.target.value)}
                    >
                      {[1,2,3,4,5].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>

                    <input
                      className="border p-2 w-full mt-2 rounded"
                      placeholder="Comment"
                      value={s.comments}
                      onChange={(e) => updateSkill(i, "comments", e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                {editId ? "Update Assessment" : "Save Assessment"}
              </button>
            </form>
          )}

          {/* DISPLAY LIST */}
          <div className="bg-white p-4 rounded shadow space-y-3">
            <h2 className="text-lg font-semibold">Assessments</h2>

            {assessments.map((a) => (
              <div key={a._id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-semibold">
                    {new Date(a.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">{a.notes}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => edit(a)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(a._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
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
