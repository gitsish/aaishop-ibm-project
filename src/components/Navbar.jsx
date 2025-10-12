import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Hooks (keep existing paths)
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";

import AuthModal from "@/components/AuthModal";
import ReviewModal from "@/components/ReviewModal";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

    // call hooks normally (WishlistProvider must wrap App)
  const cartHook = useCart ? useCart() : { items: [] };
  const auth = useAuth ? useAuth() : {};

  // wishlist now comes from WishlistContext (items, has, toggle)
  const { items: wishlistItems = [], has: wishlistHas, toggle: wishlistToggle } = useWishlist() || {};

  // safe fallbacks for cart
  const cartItems = Array.isArray(cartHook.items) ? cartHook.items : [];


  const cartItemCount = useMemo(
    () =>
      Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
        : 0,
    [cartItems],
  );

  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const submitSearch = (e) => {
    e?.preventDefault?.();
    const q = (searchValue || "").trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    navigate({ pathname: "/products", search: params.toString() });
    setIsMenuOpen(false);
  };

  const handleWishlistClick = () => {
    // open auth modal if not signed in, otherwise go to wishlist
    if (!auth?.user) {
      setShowAuth(true);
      window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode: "login" } }));
      return;
    }
    navigate("/wishlist");
  };

  const handleLogout = () => {
    if (typeof auth?.logout === "function") auth.logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" aria-label="AaiShop home">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient-primary">AaiShop</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8" role="search" aria-label="Site search">
            <form onSubmit={submitSearch} className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products, brands and more"
                className="pl-10 pr-24 w-full"
                aria-label="Search products"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchValue("");
                }}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-primary text-white text-sm"
                aria-label="Search"
              >
                Search
              </button>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>

            {/* Wishlist button with badge */}
            <div className="relative">
              <Button variant="ghost" size="icon" aria-label="Wishlist" onClick={handleWishlistClick}>
                <Heart className="h-5 w-5" />
              </Button>
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  aria-hidden="false"
                >
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Profile / Login */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Profile"
              onClick={() =>
                auth?.user
                  ? navigate("/profile")
                  : (setShowAuth(true), window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode: "login" } })))
              }
            >
              <User className="h-5 w-5" />
            </Button>

            {auth?.user ? (
              <>
                <span className="text-sm hidden md:inline">Hi, {auth.user.name}</span>
                <Button variant="ghost" size="icon" aria-label="Logout" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Login"
                onClick={() => (setShowAuth(true), window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode: "login" } })) )}
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Cart with badge */}
            <Link to="/cart" aria-label={`Cart (${cartItemCount} items)`}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    aria-hidden={false}
                    aria-label={`${cartItemCount} items in cart`}
                  >
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3" role="search" aria-label="Site search (mobile)">
          <form onSubmit={submitSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-20 w-full"
              aria-label="Search products"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-primary text-white text-sm"
              aria-label="Search"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border animate-slide-up" role="menu">
          <div className="container-custom py-4 space-y-4">
            <Link
              to="/products"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
            >
              Products
            </Link>

            <button
              type="button"
              className="flex items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors w-full"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/cart");
              }}
              role="menuitem"
              aria-label={`Cart, ${cartItemCount} items`}
            >
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full px-2 py-1">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors w-full text-left"
              onClick={() => {
                setIsMenuOpen(false);
                handleWishlistClick();
              }}
              role="menuitem"
              aria-label="Wishlist / Accessories"
            >
              Wishlist
            </button>

            <button
              type="button"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors w-full text-left"
              onClick={() => {
                setIsMenuOpen(false);
                if (auth?.user) navigate("/profile");
                else (setShowAuth(true), window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode: "login" } })));
              }}
              role="menuitem"
              aria-label="Profile / Login"
            >
              Profile / Login
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal - controlled locally so clicking profile opens it */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />

      {/* ReviewModal kept in DOM (it internally uses ReviewContext to show/hide itself) */}
      <ReviewModal />
    </nav>
  );
};

export default Navbar;
