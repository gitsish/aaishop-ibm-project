import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();

  // memoize computed count for small perf win
  const cartItemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

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
          <div className="hidden md:flex flex-1 max-w-md mx-8" role="search" aria-label="Site search">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products, brands and more"
                className="pl-10 w-full"
                aria-label="Search products"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Wishlist"
              onClick={() => {
                /* navigate to wishlist or open wishlist UI */
              }}
            >
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Profile"
              onClick={() => {
                /* open profile menu or navigate */
              }}
            >
              <User className="h-5 w-5" />
            </Button>

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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 w-full"
              aria-label="Search products"
            />
          </div>
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

            <Link
              to="/cart"
              className="flex items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              aria-label={`Cart, ${cartItemCount} items`}
            >
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full px-2 py-1">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors w-full text-left"
              onClick={() => {
                setIsMenuOpen(false);
                /* navigate to wishlist */
              }}
              role="menuitem"
              aria-label="Wishlist"
            >
              Wishlist
            </button>

            <button
              type="button"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors w-full text-left"
              onClick={() => {
                setIsMenuOpen(false);
                /* navigate to profile */
              }}
              role="menuitem"
              aria-label="Profile"
            >
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
