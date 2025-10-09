// src/components/ProductCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReview } from "@/contexts/ReviewContext";
import { useAuth } from "@/contexts/AuthContext";

const placeholder = "https://via.placeholder.com/400x500?text=No+Image";

const ProductCard = ({ product }) => {
  const review = useReview();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleHeartClick = (e) => {
    // Prevent Link navigation
    e.preventDefault();
    e.stopPropagation();

    if (!auth?.user) {
      // If not logged in, send user to login
      navigate("/login");
      return;
    }

    // Open review modal for this product (if context present)
    review?.open?.(product.id);
  };

  return (
    <Link to={`/products/${product.id}`} tabIndex={0} aria-label={`View ${product.name}`}>
      <Card className="group product-card overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images?.[0] || placeholder}
            alt={product.name || "Product image"}
            className="h-full w-full object-cover product-image transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = placeholder;
            }}
          />

          {/* Badge */}
          {product.badge && (
            <Badge
              className={`absolute top-3 left-3 ${
                product.badge === "sale"
                  ? "badge-sale"
                  : product.badge === "new"
                  ? "badge-new"
                  : "badge-trending"
              }`}
            >
              {String(product.badge).toUpperCase()}
            </Badge>
          )}

          {/* Heart / Review Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Add a review"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleHeartClick}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Brand */}
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-warning text-warning" />
              <span className="text-xs font-medium">{product.rating ?? "0.0"}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({(product.reviews ?? 0).toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">₹{product.price ?? "0"}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
                {product.discount != null && (
                  <span className="text-xs font-semibold text-success">
                    ({product.discount}% OFF)
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
