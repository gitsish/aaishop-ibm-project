// src/components/HeaderSearch.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
export default function HeaderSearch({ init = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlQ = params.get("q") || "";

  // local input for typing — kept in sync with URL
  const [q, setQ] = useState(init || urlQ);
// inside HeaderSearch.jsx, after const [q, setQ] = useState(init || urlQ);

const debounceRef = useRef(null);

useEffect(() => {
  if (debounceRef.current) clearTimeout(debounceRef.current);
  debounceRef.current = setTimeout(() => {
    const newParams = new URLSearchParams(location.search);
    if (q && q.trim() !== "") newParams.set("q", q.trim());
    else newParams.delete("q");
    navigate({ pathname: "/products", search: newParams.toString() });
  }, 300);
  return () => clearTimeout(debounceRef.current);
}, [q]);

  // whenever URL changes externally, reflect it in the input
  useEffect(() => {
    setQ(urlQ);
  }, [urlQ]);

  const submit = (e) => {
    e?.preventDefault?.();
    const newParams = new URLSearchParams(location.search);
    if (q && q.trim() !== "") newParams.set("q", q.trim());
    else newParams.delete("q");
    // keep category param if present
    navigate({ pathname: "/products", search: newParams.toString() });
  };

  return (
    <form onSubmit={submit} className="flex items-center w-full max-w-xl">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for products, brands and more"
        className="w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Search"
      />
      <button type="submit" className="ml-2 px-3 py-2 rounded bg-primary text-white text-sm">Search</button>
    </form>
  );
}
