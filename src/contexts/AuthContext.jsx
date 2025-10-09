// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const KEY = "aai_auth_users";
const AUTH_KEY = "aai_current_user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (users.find((u) => u.email === email)) {
      throw new Error("Email already registered");
    }
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem(KEY, JSON.stringify(users));
    localStorage.setItem(AUTH_KEY, JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }));
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return newUser;
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem(KEY) || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const publicUser = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem(AUTH_KEY, JSON.stringify(publicUser));
    setUser(publicUser);
    return publicUser;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
