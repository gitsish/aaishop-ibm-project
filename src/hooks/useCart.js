// src/stores/useCart.js
import { create } from "zustand";

/**
 * User-scoped cart store (Zustand).
 * - Does NOT rely on zustand's persist because that creates a single static key.
 * - Instead we manually read/write localStorage keys: cart_{userId} (or cart_guest)
 *
 * API:
 *  - addItem(product, size, color)
 *  - removeItem(productId)
 *  - updateQuantity(productId, quantity)
 *  - clearCart()
 *  - getTotalPrice(), getTotalItems()
 *  - setUserId(userId)   <-- IMPORTANT: call this on login/logout
 *
 * Notes:
 *  - This store uses localStorage and will auto-persist when items change.
 *  - setUserId will rehydrate from the appropriate key.
 */

const GUEST_KEY = "cart_guest";

const readFromStorage = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeToStorage = (key, items) => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {}
};

export const useCart = create((set, get) => {
  // internal current storage key. Closed over by store actions.
  let currentStorageKey = GUEST_KEY;

  // helper to persist current store to the currentStorageKey
  const persistNow = (items) => {
    writeToStorage(currentStorageKey, items);
  };

  // loads items from a given key and replaces store.items
  const rehydrateFromKey = (key) => {
    const items = readFromStorage(key) || [];
    set({ items });
  };

  // initialize: load guest cart (so app has something at boot)
  const initialItems = readFromStorage(currentStorageKey);

  return {
    // initial state
    items: initialItems,

    // actions
    addItem: (product, size, color) => {
      const items = get().items;
      const existingItem = items.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingItem) {
        const updated = items.map((item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({ items: updated });
        persistNow(updated);
      } else {
        const updated = [
          ...items,
          {
            ...product,
            quantity: 1,
            selectedSize: size,
            selectedColor: color,
          },
        ];
        set({ items: updated });
        persistNow(updated);
      }
    },

    removeItem: (productId) => {
      const updated = get().items.filter((item) => item.id !== productId);
      set({ items: updated });
      persistNow(updated);
    },

    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        const updated = get().items.filter((item) => item.id !== productId);
        set({ items: updated });
        persistNow(updated);
        return;
      }
      const updated = get().items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      set({ items: updated });
      persistNow(updated);
    },

    clearCart: () => {
      set({ items: [] });
      persistNow([]);
    },

    getTotalPrice: () =>
      get().items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0),

    getTotalItems: () =>
      get().items.reduce((total, item) => total + item.quantity, 0),

    /**
     * IMPORTANT: call this whenever the active user changes.
     * - userId: string or null/undefined for guest.
     * Behaviour:
     * - sets internal key to cart_{userId} or cart_guest
     * - rehydrates store from that key
     */
    setUserId: (userId) => {
      currentStorageKey = userId ? `cart_${userId}` : GUEST_KEY;
      rehydrateFromKey(currentStorageKey);
    },

    /**
     * Forcibly write the current in-memory cart to whichever key is active.
     * (usually not needed because every mutating action persists)
     */
    persistNowPublic: () => {
      persistNow(get().items);
    },
  };
});
