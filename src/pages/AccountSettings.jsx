import { useState } from "react";
import api from "../api/api";

export default function AccountSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateProfile = async () => {
    await api.put("/account/update-profile", { name, email });
    alert("Profile updated");
  };

  const changePassword = async () => {
    await api.put("/account/change-password", {
      currentPassword,
      newPassword,
    });
    alert("Password changed");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Account Settings</h1>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold">Update Profile</h2>

        <input className="border p-2 w-full rounded"
          placeholder="New Name" value={name}
          onChange={(e) => setName(e.target.value)} />

        <input className="border p-2 w-full rounded"
          placeholder="New Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <button
          onClick={updateProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Profile
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold">Change Password</h2>

        <input type="password" className="border p-2 w-full rounded"
          placeholder="Current Password" value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)} />

        <input type="password" className="border p-2 w-full rounded"
          placeholder="New Password" value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} />

        <button
          onClick={changePassword}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
