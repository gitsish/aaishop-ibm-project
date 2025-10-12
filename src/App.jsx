import React, { Suspense, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tool-tip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import IntroAnimated from "@/components/IntroAnimated";
import { AuthProvider } from "@/contexts/AuthContext";
import { ReviewProvider } from "@/contexts/ReviewContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <p className="text-lg font-medium">Loading…</p>
    </div>
  </div>
);

export default function AppRoot() {
  // lazy imports moved *inside* the component to avoid TDZ/circular errors
  const Index = React.lazy(() => import("./pages/Index"));
  const Products = React.lazy(() => import("./pages/Products"));
  const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
  const Cart = React.lazy(() => import("./pages/Cart"));
  const NotFound = React.lazy(() => import("./pages/NotFound"));
  const Wishlist = React.lazy(() => import("./pages/Wishlist"));
  const Profile = React.lazy(() => import("./pages/Profile"));

  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showIntro && (
            <IntroAnimated
              leftImageSrc="/images/man.jpg"
              rightImageSrc="/images/woman.jpg"
              onComplete={handleIntroComplete}
            />
          )}

          {!showIntro && (
            <AuthProvider>
              {/* IMPORTANT: WishlistProvider must be inside AuthProvider so it can read useAuth().user */}
              <WishlistProvider>
                <ReviewProvider>
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </Layout>
                </ReviewProvider>
              </WishlistProvider>
            </AuthProvider>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
