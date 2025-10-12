import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Try importing your cart store hook — keep your existing path
// If your useCart is exported from "@/hooks/useCart" (zustand), this will work.
// The calls below are guarded in case setUserId/clearCart are missing.
import { useCart } from "@/hooks/useCart";

const KEY = "aai_auth_users";
const AUTH_KEY = "aai_current_user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  // Attempt to get cart actions (may be undefined if your store doesn't expose them)
  let setCartUserId = null;
  let clearCart = null;
  try {
    // useCart is a zustand hook; calling it here inside a component is allowed
    setCartUserId = useCart((s) => s.setUserId);
    clearCart = useCart((s) => s.clearCart);
  } catch (err) {
    // no-op if useCart is not available / path differs
    setCartUserId = null;
    clearCart = null;
  }

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed);
        // tell cart to rehydrate for this user (if API available)
        if (typeof setCartUserId === "function") {
          setCartUserId(parsed?.id ?? null);
        }
      } catch {
        setUser(null);
      }
    } else {
      // ensure cart is using guest key if no user
      if (typeof setCartUserId === "function") setCartUserId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (users.find((u) => u.email === email)) {
      throw new Error("Email already registered");
    }
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem(KEY, JSON.stringify(users));
    const publicUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(AUTH_KEY, JSON.stringify(publicUser));
    setUser(publicUser);

    // tell cart store to use this user's key (if available)
    if (typeof setCartUserId === "function") {
      setCartUserId(publicUser.id);
    }

    // navigate home
    nav("/", { replace: true });
    return publicUser;
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem(KEY) || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const publicUser = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem(AUTH_KEY, JSON.stringify(publicUser));
    setUser(publicUser);

    // tell cart store to use this user's key (if available)
    if (typeof setCartUserId === "function") {
      setCartUserId(publicUser.id);
    }

    // navigate home
    nav("/", { replace: true });
    return publicUser;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);

    // clear cart in-memory (if available) and switch to guest key
    if (typeof clearCart === "function") {
      try {
        clearCart();
      } catch {}
    }
    if (typeof setCartUserId === "function") {
      try {
        setCartUserId(null);
      } catch {}
    }

    nav("/login", { replace: true });
  };

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
