import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Initialize auth ONCE
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (storedToken && role && userId) {
      setToken(storedToken);
      setUser({ role, userId });
    }

    setLoading(false);
  }, []);

const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });

  const { token, role, userId } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("userId", userId);

  setToken(token);
  setUser({ role, userId });

  return role;
};

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
