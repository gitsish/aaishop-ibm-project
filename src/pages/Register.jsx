// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login({ email, password });
      nav("/");
    } catch (e) {
      setErr(e.message || "Login failed");
    }
  };

  return (
    <div className="container-custom py-20">
      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full input" />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full input" />
          {err && <div className="text-destructive">{err}</div>}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
