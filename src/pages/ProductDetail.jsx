// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Heart,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products.mjs";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useReview } from "@/contexts/ReviewContext";

const PLACEHOLDER = "https://via.placeholder.com/400x500?text=No+Image";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { open: openReview } = useReview();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [reviews, setReviews] = useState([]);

  const product = products.find((p) => String(p.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      try {
        const saved = JSON.parse(localStorage.getItem(`productReviews_${id}`) || "[]");
        setReviews(saved);
      } catch {
        setReviews([]);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const colors = Array.isArray(product.colors) ? product.colors : [];

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    addItem(product, selectedSize, selectedColor);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  // ✅ FIXED: Wishlist logic with localStorage persistence
  const handleWishlistClick = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
      const exists = stored.some((item) => item.id === product.id);

      if (exists) {
        toast.warning("Already in wishlist");
        return;
      }

      stored.push(product);
      localStorage.setItem("wishlist", JSON.stringify(stored));
      toast.success("Added to wishlist");
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Something went wrong while saving");
    }
  };

  const openReviewModal = () => openReview(String(product.id));

  const averageRating = (() => {
    if (reviews.length === 0) return Number(product.rating || 0);
    const sum = reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    return +(sum / reviews.length).toFixed(1);
  })();

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container-custom py-4">
          <Link
            to="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {(product.images ?? []).length > 0 ? (
                  product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                        <img
                          src={image || PLACEHOLDER}
                          alt={`${product.name} - ${index + 1}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                        />
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
                      <img src={PLACEHOLDER} alt="No image" />
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {product.brand}
              </p>
              {product.badge && (
                <Badge
                  className={
                    product.badge === "sale"
                      ? "badge-sale"
                      : product.badge === "new"
                      ? "badge-new"
                      : "badge-trending"
                  }
                >
                  {String(product.badge).toUpperCase()}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(Number(averageRating) || 0)
                        ? "fill-warning text-warning"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">
                {averageRating} ({reviews.length > 0 ? reviews.length : (product.reviews ?? 0).toLocaleString()} reviews)
              </span>
              <button
                onClick={openReviewModal}
                className="ml-4 text-sm underline text-primary hover:opacity-90"
              >
                Write a review
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">₹{product.price ?? 0}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  {product.discount != null && (
                    <span className="text-lg font-semibold text-success">
                      {product.discount}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="border-t border-border pt-6 space-y-6">
              {/* Size Selection */}
              {sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        }`}
                        aria-pressed={selectedSize === size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {colors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Select Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                          selectedColor === color
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        }`}
                        aria-pressed={selectedColor === color}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>

              <Button
                size="lg"
                variant="outline"
                aria-label="Add to wishlist"
                onClick={handleWishlistClick}
              >
                <Heart className="h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                aria-label="Share product"
                onClick={() =>
                  navigator.share?.({
                    title: product.name,
                    url: window.location.href,
                  })
                }
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Free Delivery</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Easy Returns</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Secure Payment</p>
              </div>
            </div>

            {/* Description + Reviews */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold mb-3">Product Details</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
