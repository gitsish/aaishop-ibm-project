// src/contexts/ReviewContext.jsx
import React, { createContext, useContext, useState } from "react";

const ReviewContext = createContext(null);

export function ReviewProvider({ children }) {
  const [openFor, setOpenFor] = useState(null); // product id

  const open = (productId) => setOpenFor(productId);
  const close = () => setOpenFor(null);

  return <ReviewContext.Provider value={{ openFor, open, close }}>{children}</ReviewContext.Provider>;
}

export function useReview() {
  return useContext(ReviewContext);
}
