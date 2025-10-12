import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";

const placeholder = "https://via.placeholder.com/400x500?text=No+Image";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  // get whatever the hook returns
  const wishlistHook = useWishlist();
  const { toggle } = wishlistHook || {};

  // debug once to see what useWishlist returns (remove after you inspect)
  React.useEffect(() => {
    // Comment out this console.log when done inspecting
    console.log("useWishlist() returned:", wishlistHook);
  }, [wishlistHook]);

  // product id fallback
  const productId = product.id ?? product.slug;

  // Robust "is in wishlist" computation supporting:
  // - a has() function exposed by the hook
  // - wishlist being an Array of ids
  // - wishlist being an Array of objects with id
  // - wishlist being a Set
  // - wishlist being an object keyed by id
  // - fallback to false if none of above
  const wished = React.useMemo(() => {
    if (!wishlistHook) return false;

    // 1) If hook exposes a function named `has`
    if (typeof wishlistHook.has === "function") {
      try {
        return Boolean(wishlistHook.has(productId));
      } catch (err) {
        // fallthrough
      }
    }

    // 2) Common property names that might hold items
    const candidates = [
      wishlistHook.wishlist,
      wishlistHook.items,
      wishlistHook.list,
      wishlistHook.data,
      wishlistHook // sometimes hook returns array/object itself
    ];

    for (const c of candidates) {
      if (!c) continue;

      // If Set
      if (c instanceof Set) {
        return c.has(productId);
      }

      // If Map
      if (c instanceof Map) {
        return c.has(productId);
      }

      // If plain array of primitive ids
      if (Array.isArray(c) && c.length > 0 && (typeof c[0] === "string" || typeof c[0] === "number")) {
        return c.includes(productId);
      }

      // If array of objects (with id field)
      if (Array.isArray(c)) {
        return c.some(item => item && (item.id === productId || item.slug === productId));
      }

      // If plain object keyed by id
      if (typeof c === "object") {
        if (Object.prototype.hasOwnProperty.call(c, productId)) return Boolean(c[productId]);
        // maybe keyed by id strings
        const keys = Object.keys(c);
        if (keys.length > 0 && (typeof c[keys[0]] === "object")) {
          // object of objects -> check id fields
          for (const k of keys) {
            const val = c[k];
            if (val && (val.id === productId || val.slug === productId)) return true;
          }
        }
      }
    }

    return false;
  }, [wishlistHook, productId]);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!auth?.user) {
      window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode: "login" } }));
      return;
    }

    // If toggle isn't available, avoid crashing
    if (typeof toggle !== "function") {
      console.warn("Wishlist toggle is not available on hook:", wishlistHook);
      return;
    }

    toggle({
      id: productId,
      name: product.name,
      brand: product.brand,
      price: product.price,
      images: product.images,
      badge: product.badge,
    });
  };

  return (
    <Link to={`/products/${productId}`} tabIndex={0} aria-label={`View ${product.name}`}>
      <Card className="group product-card overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images?.[0] || placeholder}
            alt={product.name || "Product image"}
            className="h-full w-full object-cover product-image transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = placeholder; }}
          />

          {/* Badge */}
          {product.badge && (
            <Badge
              className={`absolute top-3 left-3 ${
                product.badge === "sale" ? "badge-sale" :
                product.badge === "new" ? "badge-new" : "badge-trending"
              }`}
            >
              {String(product.badge).toUpperCase()}
            </Badge>
          )}

          {/* Heart / Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className={`absolute top-3 right-3 transition-all ${wished ? "bg-primary text-primary-foreground" : "bg-white/90 hover:bg-white"} opacity-100`}
            onClick={handleHeartClick}
            type="button"
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
          </Button>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{product.brand}</p>

          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-warning text-warning" />
              <span className="text-xs font-medium">{product.rating ?? "0.0"}</span>
            </div>
            <span className="text-xs text-muted-foreground">({(product.reviews ?? 0).toLocaleString()})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">₹{product.price ?? "0"}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                {product.discount != null && <span className="text-xs font-semibold text-success">({product.discount}% OFF)</span>}
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
