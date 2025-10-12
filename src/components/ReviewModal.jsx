// src/components/ReviewModal.jsx
import React from "react";
import { X, Star } from "lucide-react";
import { useReview } from "@/contexts/ReviewContext";

export default function ReviewModal() {
  const review = useReview();

  if (!review) return null; // context missing
  const { isOpen, close, productId, getMock } = review;

  if (!isOpen || !productId) return null;

  const data = getMock(productId);
  const { avgRating, reviewsCount, boughtCount, reviews, photos } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={close} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl z-10 overflow-auto max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-xl font-semibold">Customer reviews</h3>
            <p className="text-sm text-muted-foreground">
              {avgRating} <span className="mx-1">·</span> {reviewsCount} reviews · {boughtCount.toLocaleString()}+ bought
            </p>
          </div>

          <button className="p-2 rounded hover:bg-muted" onClick={close} aria-label="Close reviews">
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Top: rating big + photos */}
          <div className="flex flex-col md:flex-row md:items-start md:gap-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center w-28 h-28 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
                <div className="text-3xl font-bold">{avgRating}</div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(avgRating) ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-1">average rating</div>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="font-medium">What customers are saying</h4>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {photos.map((p, idx) => (
                  <img key={idx} src={p} alt={`customer ${idx}`} className="w-full h-24 object-cover rounded-md" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {boughtCount.toLocaleString()}+ customers purchased this — here are latest reviews and photos.
              </p>
            </div>
          </div>

          {/* Reviews list */}
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="flex gap-3 p-3 rounded-md border">
                <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{r.date}</div>
                  </div>
                  <div className="text-sm mt-1">{r.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-end">
            <button onClick={close} className="px-4 py-2 rounded bg-slate-700 text-white">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
