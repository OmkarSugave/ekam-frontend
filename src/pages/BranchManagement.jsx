import { useEffect, useState } from "react";
import api from "../api/api";

export default function BranchManagement() {
  const [branches, setBranches] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await api.get("/admin/branches");
    setBranches(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!editId) {
      await api.post("/admin/branches", { name, address });
    } else {
      await api.put(`/admin/branches/${editId}`, { name, address });
    }

    setName("");
    setAddress("");
    setEditId(null);
    load();
  };

  const edit = (b) => {
    setEditId(b._id);
    setName(b.name);
    setAddress(b.address);
  };

  const del = async (id) => {
    if (confirm("Delete branch?")) {
      await api.delete(`/admin/branches/${id}`);
      load();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Branch Management</h1>

      <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow">
        <input
          className="border p-2 w-full rounded"
          placeholder="Branch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Branch Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button className="bg-blue-600 text-white py-2 px-4 rounded">
          {editId ? "Update Branch" : "Add Branch"}
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow space-y-2">
        {branches.map((b) => (
          <div
            key={b._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold">{b.name}</p>
              <p className="text-sm text-gray-600">{b.address}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => edit(b)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => del(b._id)}
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
