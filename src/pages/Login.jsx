import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const role = await login(email, password);

      if (role === "admin") navigate("/admin/dashboard");
      if (role === "staff") navigate("/staff/dashboard");
      if (role === "player") navigate("/player/dashboard");
      if (role === "parent") navigate("/parent/dashboard");

    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-5">
          EKAM TT LOGIN
        </h1>

        <form className="space-y-4" onSubmit={submit}>
          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
