import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthModal({ open: externalOpen, onClose: externalClose, defaultMode = "login" }) {
  const { register, login } = useAuth();
  const [open, setOpen] = useState(Boolean(externalOpen));
  const [mode, setMode] = useState(defaultMode);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // sync controlled prop
  useEffect(() => setOpen(Boolean(externalOpen)), [externalOpen]);

  // Listen to global event so other components (eg ReviewModal) can open this modal
  useEffect(() => {
    const handler = (e) => {
      if (e?.detail?.mode) setMode(e.detail.mode);
      setOpen(true);
    };
    window.addEventListener("open-auth", handler);
    return () => window.removeEventListener("open-auth", handler);
  }, []);

  const close = () => {
    setOpen(false);
    externalClose?.();
  };

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        await register(form);
        alert("✅ Registration successful — logged in.");
        close();
      } else {
        await login(form);
        alert("✅ Login successful.");
        close();
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={close}></div>
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 z-10">
        <button onClick={close} className="absolute top-3 right-3"><X /></button>
        <h2 className="text-xl font-semibold mb-4 text-center">{mode === "login" ? "Login" : "Register"}</h2>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode("login")} className={`flex-1 py-2 rounded ${mode === "login" ? "bg-slate-100" : ""}`}>Login</button>
          <button onClick={() => setMode("register")} className={`flex-1 py-2 rounded ${mode === "register" ? "bg-slate-100" : ""}`}>Register</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <div>
              <label className="text-sm">Name</label>
              <input required type="text" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border rounded px-3 py-2 mt-1" placeholder="Your name" />
            </div>
          )}

          <div>
            <label className="text-sm">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} className="w-full border rounded px-3 py-2 mt-1" placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input required type="password" value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} className="w-full border rounded px-3 py-2 mt-1" placeholder="Password" />
          </div>

          <button disabled={loading} type="submit" className="w-full py-2 rounded bg-slate-800 text-white">
            {loading ? "Processing..." : (mode === "login" ? "Login" : "Create account")}
          </button>
        </form>

        <p className="mt-3 text-center text-sm text-slate-600">
          {mode === "login" ? (
            <>New here? <button onClick={() => setMode("register")} className="underline text-blue-600">Register now</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode("login")} className="underline text-blue-600">Login</button></>
          )}
        </p>
      </div>
    </div>
  );
}
