import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient-primary">AaiShop</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products, brands and more"
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border animate-slide-up">
          <div className="container-custom py-4 space-y-4">
            <Link
              to="/products"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="flex items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full px-2 py-1">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button className="block py-2 text-sm font-medium hover:text-primary transition-colors w-full text-left">
              Wishlist
            </button>
            <button className="block py-2 text-sm font-medium hover:text-primary transition-colors w-full text-left">
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
