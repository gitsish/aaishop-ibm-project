// src/pages/Products.jsx
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products.mjs";
import CategorySidebar from "@/components/CategorySidebar";

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const q = (params.get("q") || "").trim().toLowerCase();
  const category = params.get("category") || "";

  // Filter logic
  const filtered = useMemo(() => {
    return (products || []).filter((p) => {
      if (category && category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return (
        (p.name || "").toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.tags || []).some((t) => String(t).toLowerCase().includes(q))
      );
    });
  }, [q, category]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <CategorySidebar />

        {/* Products grid */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
            {category && category !== "All"
              ? `${category} (${filtered.length})`
              : `All Products (${filtered.length})`}
          </h2>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-24">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
