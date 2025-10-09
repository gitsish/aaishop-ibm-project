// src/pages/Index.jsx
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products.mjs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Index = () => {
  const navigate = useNavigate();

  // derived product sets
  const featuredProducts = (products || [])
    .filter((p) => p.badge === 'trending' || p.badge === 'new')
    .slice(0, 6);

  const saleProducts = (products || [])
    .filter((p) => p.badge === 'sale')
    .slice(0, 4);

  // helper navigation
  const goToCategory = (category) => {
    const search = category ? `?category=${encodeURIComponent(category)}` : '';
    navigate(`/products${search}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background overflow-hidden">
        <div className="container-custom py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                New Season Collection
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Elevate Your
                <span className="text-gradient-primary block">Style Game</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-md">
                Discover the latest trends in fashion. Shop from our curated
                collection of premium clothing and accessories.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/products">
                  <Button size="lg" className="group">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  View Collections
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div>
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="text-sm text-muted-foreground">
                    Happy Customers
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4.8★</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200"
                  alt="Fashion Hero"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-slide-in-right">
                <div className="flex items-center gap-3">
                  <div className="bg-success/10 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">40% OFF</p>
                    <p className="text-xs text-muted-foreground">
                      On trending items
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-slide-in-right delay-150">
                <div className="flex items-center gap-3">
                  <div className="bg-warning/10 p-3 rounded-xl">
                    <Zap className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Flash Sale</p>
                    <p className="text-xs text-muted-foreground">
                      Limited time offer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Trending Now
              </h2>
              <p className="text-muted-foreground">
                Most popular products this week
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <Carousel opts={{ align: 'start', loop: true }} className="w-full">
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Sale Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">🔥 Hot Deals</h2>
            <p className="text-muted-foreground">
              Limited time offers - Up to 40% off
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Sale Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Banner */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Women's */}
            <div
              onClick={() => goToCategory('Sarees')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goToCategory('Sarees')}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer focus:ring-4 focus:ring-primary/30"
            >
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800"
                alt="Women's Fashion"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Women's Fashion
                  </h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToCategory('Sarees');
                    }}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Men's */}
            <div
              onClick={() => goToCategory('Shirts')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goToCategory('Shirts')}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer focus:ring-4 focus:ring-primary/30"
            >
              <img
                src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800"
                alt="Men's Fashion"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Men's Fashion
                  </h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToCategory('Shirts');
                    }}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Accessories */}
            <div
              onClick={() => goToCategory('Footwear')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goToCategory('Footwear')}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer focus:ring-4 focus:ring-primary/30"
            >
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
                alt="Accessories"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Accessories
                  </h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToCategory('Footwear');
                    }}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
