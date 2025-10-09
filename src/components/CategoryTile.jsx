// src/components/CategoryTile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * CategoryTile
 * - imageSrc: string path to image (public/ or imported)
 * - title: visible title text
 * - subtitle: optional
 * - categoryId: category id to navigate to (e.g. "women-sarees", "men-shirts", "accessories-shoes" OR "Sarees")
 * - cta: string for button label (default "Shop Now")
 * - className: optional extra classes
 */
export default function CategoryTile({
  imageSrc,
  title,
  subtitle,
  categoryId,
  cta = "Shop Now",
  className = "",
  prefetch,
}) {
  const navigate = useNavigate();

  function go() {
    // keep category param simple (use categoryId as provided)
    const search = categoryId && categoryId !== "All" ? `?category=${encodeURIComponent(categoryId)}` : "";
    navigate(`/products${search}`);
    if (typeof prefetch === "function") prefetch(categoryId);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      }}
      className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30 ${className}`}
      aria-label={`Open category ${title}`}
    >
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative p-8 flex flex-col justify-end h-[360px]">
        <div className="text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-sm">{title}</h3>
          {subtitle && <p className="text-sm md:text-base opacity-90 mb-4">{subtitle}</p>}
          <button
            onClick={(e) => {
              e.stopPropagation();
              go();
            }}
            className="inline-block bg-white/90 text-black px-4 py-2 rounded-md font-medium shadow"
            aria-label={`${cta} ${title}`}
          >
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
}
