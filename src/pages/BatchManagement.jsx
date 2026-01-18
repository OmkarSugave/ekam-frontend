import { useEffect, useState } from "react";
import api from "../api/api";

export default function BatchManagement() {
  const [batches, setBatches] = useState([]);
  const [branches, setBranches] = useState([]);

  const [name, setName] = useState("");
  const [levelIndex, setLevelIndex] = useState("");
  const [branchId, setBranchId] = useState("");

  const [editId, setEditId] = useState(null);

  const load = async () => {
    const b1 = await api.get("/admin/batches");
    const b2 = await api.get("/admin/branches");

    setBatches(b1.data);
    setBranches(b2.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!editId) {
      await api.post("/admin/batches", { name, levelIndex, branchId });
    } else {
      await api.put(`/admin/batches/${editId}`, {
        name,
        levelIndex,
        branch: branchId,
      });
    }

    setName("");
    setLevelIndex("");
    setBranchId("");
    setEditId(null);
    load();
  };

  const edit = (bt) => {
    setEditId(bt._id);
    setName(bt.name);
    setLevelIndex(bt.levelIndex);
    setBranchId(bt.branch?._id);
  };

  const del = async (id) => {
    if (confirm("Delete batch?")) {
      await api.delete(`/admin/batches/${id}`);
      load();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Batch Management</h1>

      <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={submit}>
        <input
          className="border p-2 w-full rounded"
          placeholder="Batch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Level Index"
          value={levelIndex}
          onChange={(e) => setLevelIndex(e.target.value)}
        />

        <select
          className="border p-2 w-full rounded"
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
        >
          <option value="">Select Branch</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update Batch" : "Add Batch"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow space-y-2">
        {batches.map((bt) => (
          <div
            key={bt._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold">{bt.name}</p>
              <p className="text-sm">Level: {bt.levelIndex}</p>
              <p className="text-sm text-gray-600">
                Branch: {bt.branch?.name}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => edit(bt)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => del(bt._id)}
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
