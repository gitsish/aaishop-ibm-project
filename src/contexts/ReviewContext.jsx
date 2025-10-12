// src/contexts/ReviewContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * Lightweight ReviewContext that:
 * - Keeps modal open state + current productId
 * - Generates deterministic mock reviews for a productId
 */

const ReviewContext = createContext(null);

const NAMES = [
  "Ananya", "Rahul", "Priya", "Karan", "Meera", "Siddharth", "Nisha", "Vikram", "Pooja", "Rohan"
];
const TEMPLATES = [
  "Loved it — beautiful fabric and fit. Received so many compliments!",
  "Good value for money. Colour was slightly different than the photos but still pretty.",
  "Fast delivery and packaging was great. The saree looked even better in person.",
  "Stitching quality is excellent. I washed it once and it still looks new.",
  "Comfortable and elegant. Perfect for festivals and parties."
];

const avatarsForIndex = (i) => `https://i.pravatar.cc/150?img=${(i % 70) + 1}`;

const seeded = (s) => {
  // small deterministic pseudo-random generator from string
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967295;
  };
};

const generateMockReviews = (productId, count = 5) => {
  const rand = seeded(String(productId));
  const reviews = [];
  const boughtCount = Math.floor(40 + Math.floor(rand() * 960)); // 40 - 1000 buyers

  for (let i = 0; i < count; i++) {
    const r = Math.floor(rand() * (TEMPLATES.length));
    const name = NAMES[(Math.floor(rand() * NAMES.length))];
    const rating = Math.floor(3 + Math.floor(rand() * 3)); // 3,4,5
    const daysAgo = Math.floor(rand() * 120);
    const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
      .toLocaleDateString();
    const avatar = avatarsForIndex(Math.floor(rand() * 70));
    reviews.push({
      id: `${productId}_r_${i}`,
      name,
      rating,
      date,
      avatar,
      text: TEMPLATES[r],
    });
  }

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  // customer photos (small set)
  const photos = Array.from({ length: Math.min(6, Math.floor(3 + rand() * 6)) }).map((_, idx) => {
    // use placeholder images sized for thumbnails
    return `https://via.placeholder.com/200x260?text=Customer+${idx + 1}`;
  });

  return {
    reviews,
    avgRating: Number(avg),
    reviewsCount: reviews.length,
    boughtCount,
    photos,
  };
};

export function ReviewProvider({ children }) {
  const [productId, setProductId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (id) => {
    setProductId(id);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setProductId(null);
  };

  const value = useMemo(() => {
    return {
      productId,
      open,
      close,
      isOpen,
      getMock: (id) => generateMockReviews(id || productId),
    };
  }, [productId, isOpen]);

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
}

export function useReview() {
  return useContext(ReviewContext);
}
