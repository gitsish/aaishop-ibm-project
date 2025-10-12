import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth(); // reactive: becomes null on logout
  const [items, setItems] = useState([]);

  // IMPORTANT: user-specific storage key
  const storageKey = user ? `wishlist:${user.id}` : null;

  // Load wishlist for the logged-in user (or clear when logged out)
  useEffect(() => {
    if (!user) {
      // Clear in-memory list on logout so it won't show for anonymous
      setItems([]);
      return;
    }

    try {
      const raw = localStorage.getItem(storageKey);
      setItems(raw ? JSON.parse(raw) : []);
    } catch (err) {
      console.error("Failed to load wishlist for user:", err);
      setItems([]);
    }
  }, [user, storageKey]);

  // Persist wishlist under the user-specific key
  useEffect(() => {
    if (!user) return; // only persist when a user is logged in
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save wishlist for user:", err);
    }
  }, [items, user, storageKey]);

  // helpers
  const has = (id) => items.some(i => (i?.id ?? i) === id);

  const toggle = (itemOrId) => {
    // Optionally block wishlist actions for anonymous users
    if (!user) {
      // you could open auth modal here or just noop
      console.warn("toggle called while not logged-in; ignoring");
      return;
    }

    const id = itemOrId?.id ?? itemOrId;
    setItems(prev => {
      const exists = prev.some(i => (i?.id ?? i) === id);
      if (exists) return prev.filter(i => (i?.id ?? i) !== id);
      // store full object if provided, otherwise store id
      return [...prev, (itemOrId?.id ? itemOrId : id)];
    });
  };

  return (
    <WishlistContext.Provider value={{ items, has, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    // Defensive: helpful in dev if provider missing
    console.warn("useWishlist must be used within <WishlistProvider>");
    return { items: [], has: () => false, toggle: () => {} };
  }
  return ctx;
};
