// src/components/CategorySidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Full category list
export const categories = [
  "All",
  "T-Shirts",
  "Jeans",
  "Dresses",
  "Jackets",
  "Footwear",
  "Blazers",
  "Hoodies",
  "Shirts",
  "Shorts",
  "Coats",
  "Bags",
  "Sarees",
  "Lehengas",
  "Kurta Sets",
  "Anarkali",
  "Watches",
  "Women Shirts",
  "Women Jeans",
  "Dupattas",
  "Beauty",
  "Electronics",
];

export default function CategorySidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const current = params.get("category") || "";

  function setCategory(cat) {
    const newParams = new URLSearchParams(location.search);
    if (cat && cat !== "All") newParams.set("category", cat);
    else newParams.delete("category");
    navigate({ pathname: "/products", search: newParams.toString() });
  }

  return (
    <aside className="w-64 hidden lg:block">
      <div className="sticky top-20 max-h-[80vh] overflow-y-auto pr-2">
        <h4 className="text-sm font-semibold mb-2 px-3">Categories</h4>
        <div className="bg-white border rounded-md p-2 space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-md transition text-sm ${
                current === cat || (cat === "All" && !current)
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
