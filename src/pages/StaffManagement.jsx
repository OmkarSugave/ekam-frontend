import { useEffect, useState } from "react";
import api from "../api/api";

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [branches, setBranches] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branchId, setBranchId] = useState("");

  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res1 = await api.get("/admin/staff");
    const res2 = await api.get("/admin/branches");
    setStaff(res1.data);
    setBranches(res2.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!editId) {
      await api.post("/admin/staff", {
        name,
        email,
        password,
        branchId,
      });
    } else {
      await api.put(`/admin/staff/${editId}`, {
        name,
        email,
        branchId,
      });
    }

    setName("");
    setEmail("");
    setPassword("");
    setBranchId("");
    setEditId(null);
    load();
  };

  const edit = (st) => {
    setEditId(st._id);
    setName(st.user.name);
    setEmail(st.user.email);
    setBranchId(st.branch?._id);
  };

  const del = async (id) => {
    if (confirm("Delete staff?")) {
      await api.delete(`/admin/staff/${id}`);
      load();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Staff (Coach) Management</h1>

      <form className="bg-white p-4 shadow rounded space-y-3" onSubmit={submit}>
        <input
          className="border p-2 w-full rounded"
          placeholder="Staff Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Staff Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!editId && (
          <input
            type="password"
            className="border p-2 w-full rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

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
          {editId ? "Update Staff" : "Add Staff"}
        </button>
      </form>

      <div className="bg-white p-4 shadow rounded space-y-2">
        {staff.map((st) => (
          <div
            key={st._id}
            className="flex justify-between border-b pb-2 items-center"
          >
            <div>
              <p className="font-semibold">{st.user?.name}</p>
              <p className="text-sm text-gray-600">{st.user?.email}</p>
              <p className="text-sm">Branch: {st.branch?.name}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => edit(st)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => del(st._id)}
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
