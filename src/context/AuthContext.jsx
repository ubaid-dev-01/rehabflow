import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("rehabflow_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    if (email && password) {
      const u = { email, name: "Dr. Sarah Mitchell", role: "Lead Therapist", avatar: null };
      setUser(u);
      localStorage.setItem("rehabflow_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rehabflow_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
