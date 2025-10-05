import { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.badge === 'new' ? 1 : -1;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted border-b border-border">
        <div className="container-custom py-8">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} products
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            {/* Categories */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5" />
                <h3 className="font-semibold">Categories</h3>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category}
                    {category === 'All' && (
                      <Badge variant="secondary" className="ml-2">
                        {products.length}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-5 w-5" />
                <h3 className="font-semibold">Price Range</h3>
              </div>
              <div className="space-y-2">
                <button className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                  Under ₹1000
                </button>
                <button className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                  ₹1000 - ₹2000
                </button>
                <button className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                  ₹2000 - ₹5000
                </button>
                <button className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                  Above ₹5000
                </button>
              </div>
            </div>

            {/* Discount */}
            <div>
              <h3 className="font-semibold mb-4">Discount</h3>
              <div className="space-y-2">
                <button className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                  40% and above
                </button>
                <button className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                  30% and above
                </button>
                <button className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                  20% and above
                </button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                {sortedProducts.length} products found
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found in this category</p>
                <Button onClick={() => setSelectedCategory('All')}>
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
