// src/pages/Wishlist.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Wishlist() {
  const auth = useAuth();
  const navigate = useNavigate();

  const openLogin = () => {
    window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode: "login" } }));
  };

  if (!auth?.user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is private</h2>
          <p className="text-muted-foreground mb-6">Please log in to view and manage your wishlist.</p>
          <div className="flex justify-center gap-3">
            <Button onClick={openLogin}>Login / Signup</Button>
            <Button variant="ghost" onClick={() => navigate("/")}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
      <p className="text-muted-foreground mb-6">Items you have saved for later appear here.</p>
      <div className="grid gap-4">
        <div className="p-4 border rounded">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Example Wishlisted Item</h3>
              <p className="text-sm text-muted-foreground">Brand • Color</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => alert("Move to cart (implement)")}>Move to cart</Button>
              <Button variant="ghost" size="sm" onClick={() => alert("Remove (implement)")}>Remove</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
