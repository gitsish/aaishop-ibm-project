import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group product-card overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover product-image"
            loading="lazy"
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
              {product.badge.toUpperCase()}
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to wishlist logic
            }}
            aria-label="Add to wishlist"
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
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-xs font-semibold text-success">
                  ({product.discount}% OFF)
                </span>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};
