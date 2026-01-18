import { useEffect, useState } from "react";
import api from "../api/api";

export default function PlayerManagement() {
  const [players, setPlayers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [batches, setBatches] = useState([]);
  const [staff, setStaff] = useState([]);

  // Player fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [branchId, setBranchId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [coachId, setCoachId] = useState("");

  // Parent fields
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPassword, setParentPassword] = useState("");

  const [editId, setEditId] = useState(null);

  const load = async () => {
    const p = await api.get("/admin/players");
    const b1 = await api.get("/admin/branches");
    const b2 = await api.get("/admin/batches");
    const st = await api.get("/admin/staff");

    setPlayers(p.data);
    setBranches(b1.data);
    setBatches(b2.data);
    setStaff(st.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!editId) {
      // ADD PLAYER
      await api.post("/admin/players", {
        name,
        email,
        password,
        parentName,
        parentEmail,
        parentPassword,
        contact,
        dob,
        branchId,
        batchId,
        coachId,
      });
    } else {
      // UPDATE PLAYER
      await api.put(`/admin/players/${editId}`, {
        name,
        email,
        contact,
        dob,
        branchId,
        batchId,
        coachId,
      });
    }

    setName("");
    setEmail("");
    setPassword("");
    setContact("");
    setDob("");
    setBranchId("");
    setBatchId("");
    setCoachId("");
    setParentEmail("");
    setParentName("");
    setParentPassword("");

    setEditId(null);
    load();
  };

  const edit = (p) => {
    setEditId(p._id);
    setName(p.user?.name);
    setEmail(p.user?.email);
    setContact(p.contact);
    setDob(p.dob?.substring(0, 10));
    setBranchId(p.branch?._id);
    setBatchId(p.batch?._id);
    setCoachId(p.assignedCoach?._id);
  };

  const del = async (id) => {
    if (confirm("Delete player?")) {
      await api.delete(`/admin/players/${id}`);
      load();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Player Management</h1>

      <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={submit}>
        <h2 className="text-lg font-bold">Player Details</h2>

        <input className="border p-2 w-full" placeholder="Player Name"
          value={name} onChange={(e) => setName(e.target.value)} />

        <input className="border p-2 w-full" placeholder="Player Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        {!editId && (
          <input className="border p-2 w-full" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        )}

        <input className="border p-2 w-full" placeholder="Contact Number"
          value={contact} onChange={(e) => setContact(e.target.value)} />

        <input type="date" className="border p-2 w-full" value={dob}
          onChange={(e) => setDob(e.target.value)} />

        <select className="border p-2 w-full" value={branchId}
          onChange={(e) => setBranchId(e.target.value)}>
          <option value="">Select Branch</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>

        <select className="border p-2 w-full" value={batchId}
          onChange={(e) => setBatchId(e.target.value)}>
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>

        <select className="border p-2 w-full" value={coachId}
          onChange={(e) => setCoachId(e.target.value)}>
          <option value="">Assign Coach</option>
          {staff.map((st) => (
            <option key={st._id} value={st._id}>
              {st.user?.name}
            </option>
          ))}
        </select>

        {!editId && (
          <>
            <h2 className="text-lg font-bold pt-4">Parent Details</h2>

            <input className="border p-2 w-full" placeholder="Parent Name"
              value={parentName} onChange={(e) => setParentName(e.target.value)} />

            <input className="border p-2 w-full" placeholder="Parent Email"
              value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} />

            <input className="border p-2 w-full" placeholder="Parent Password"
              value={parentPassword} onChange={(e) => setParentPassword(e.target.value)} />
          </>
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update Player" : "Add Player"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow space-y-2">
        {players.map((p) => (
          <div key={p._id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-semibold">{p.user?.name}</p>
              <p className="text-sm text-gray-600">{p.user?.email}</p>
              <p className="text-sm">Batch: {p.batch?.name}</p>
              <p className="text-sm">Coach: {p.assignedCoach?.user?.name}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => edit(p)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => del(p._id)}
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
