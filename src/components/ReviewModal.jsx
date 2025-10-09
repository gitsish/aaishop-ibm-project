// src/components/ReviewModal.jsx
import React, { useEffect, useState } from "react";
import { useReview } from "@/contexts/ReviewContext";
import { useAuth } from "@/contexts/AuthContext";

export default function ReviewModal({ productsData }) {
  const { openFor, close } = useReview();
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [text, setText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!openFor) return;
    setName(user?.name || "");
    setText("");
    const saved = JSON.parse(localStorage.getItem(`productReviews_${openFor}`) || "[]");
    setReviews(saved);
  }, [openFor, user]);

  if (!openFor) return null;

  const submit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now().toString(),
      name: name || "Anonymous",
      text,
      date: new Date().toISOString(),
    };
    const key = `productReviews_${openFor}`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    saved.unshift(newReview);
    localStorage.setItem(key, JSON.stringify(saved));
    setReviews(saved);
    setText("");
    // show overlay message
    alert("Thanks — your review is posted!");
    close();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
      <div className="bg-card w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Add a review</h3>
        <form onSubmit={submit} className="space-y-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" className="w-full input" />
          <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a quick review" rows={4} className="w-full input" />
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">Be respectful — keep it constructive.</div>
            <div className="flex gap-2">
              <button type="button" onClick={close} className="btn btn-ghost">Cancel</button>
              <button type="submit" className="btn btn-primary">Post review</button>
            </div>
          </div>
        </form>

        {/* Recent reviews preview */}
        {reviews.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Recent reviews</h4>
            <div className="space-y-3 max-h-40 overflow-auto">
              {reviews.map((r) => (
                <div key={r.id} className="p-3 rounded border">
                  <div className="text-sm font-medium">{r.name} <span className="text-xs text-muted-foreground ml-2">{new Date(r.date).toLocaleString()}</span></div>
                  <div className="text-sm">{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
