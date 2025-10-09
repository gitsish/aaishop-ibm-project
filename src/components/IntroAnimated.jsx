// src/components/IntroAnimation.jsx
import React, { useEffect, useState, useRef } from "react";

/**
 * IntroAnimation (image + curtain version)
 *
 * Props:
 *  - onComplete: function called when intro finishes or is skipped
 *  - leftImageSrc: URL or import for left performer (e.g. "/images/man.png" or imported asset)
 *  - rightImageSrc: URL or import for right performer
 *  - leftAlt, rightAlt: alt text for images
 *  - durationMs: total duration in ms (optional; default 5200)
 *
 * Usage:
 *  <IntroAnimation leftImageSrc="/images/man.webp" rightImageSrc="/images/woman.webp" onComplete={() => setShowIntro(false)} />
 *
 * Put images in /public/images/ or import them (recommended for bundlers).
 */

export default function IntroAnimation({
  onComplete,
  leftImageSrc,
  rightImageSrc,
  leftAlt = "Left performer",
  rightAlt = "Right performer",
  durationMs = 7000,
}) {
  const [stage, setStage] = useState(0); // 0 initial, 1 curtains open, 2 content revealed, 3 fading/done
  const touchStartX = useRef(null);
  const leftOpen = useRef(false);
  const rightOpen = useRef(false);

  // Derived timings (you can tune these)
  const tStart = 500; // curtain starts to move
  const tReveal = Math.floor(durationMs * 0.42); // when center content appears
  const tFadeStart = Math.floor(durationMs * 0.8);
  const tFinish = durationMs;

  // We'll set inline transition durations for curtains and image transforms
  // for precise timing without relying on arbitrary Tailwind classes.
  const curtainTransitionMs = 1400; // how long curtains take to slide away
  const imageTransitionMs = 1400; // how long performer image takes to move
  const centerTransitionMs = 900;

  useEffect(() => {
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setStage(2);
      if (typeof onComplete === "function") onComplete();
      return;
    }

    // Lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeouts = [];
    timeouts.push(setTimeout(() => setStage(1), tStart));       // begin curtains open
    timeouts.push(setTimeout(() => setStage(2), tReveal));      // reveal center content
    timeouts.push(setTimeout(() => setStage(3), tFadeStart));   // start fade/out
    timeouts.push(setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      if (typeof onComplete === "function") onComplete();
    }, tFinish));

    const onKey = (e) => {
      if (e.key === "Escape") {
        // skip immediately
        timeouts.forEach((t) => clearTimeout(t));
        document.body.style.overflow = prevOverflow;
        setStage(3);
        if (typeof onComplete === "function") onComplete();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs]);

  // Touch swipe to skip
  function handleTouchStart(e) {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  }
  function handleTouchMove(e) {
    if (!touchStartX.current) return;
    const x = e.touches?.[0]?.clientX ?? null;
    if (x == null) return;
    const w = window.innerWidth;
    const delta = x - touchStartX.current;
    const center = w / 2;
    if (Math.abs(touchStartX.current - center) > 150) return;
    if (delta > 100) rightOpen.current = true;
    else if (delta < -100) leftOpen.current = true;
    if (leftOpen.current || rightOpen.current) {
      setStage(3);
      if (typeof onComplete === "function") onComplete();
    }
  }
  function handleTouchEnd() {
    touchStartX.current = null;
    leftOpen.current = false;
    rightOpen.current = false;
  }

  // Unmount when done
  if (stage >= 3) return null;

  // Transform states
  const leftCurtainClass = stage >= 1 ? "-translate-x-full" : "translate-x-0";
  const rightCurtainClass = stage >= 1 ? "translate-x-full" : "translate-x-0";
  const centerClass = stage >= 2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95";
  const wrapperFade = stage >= 3 ? "opacity-0 pointer-events-none" : "opacity-100";

  // inline style for transitions (keeps Tailwind warnings away and gives exact ms)
  const curtainStyle = { transitionProperty: "transform", transitionTimingFunction: "cubic-bezier(.22,.9,.36,1)", transitionDuration: `${curtainTransitionMs}ms` };
  const imageStyle = { transitionProperty: "transform, opacity", transitionTimingFunction: "cubic-bezier(.22,.9,.36,1)", transitionDuration: `${imageTransitionMs}ms` };
  const centerStyle = { transitionProperty: "opacity, transform", transitionDuration: `${centerTransitionMs}ms` };

  return (
    <div
      role="dialog"
      aria-label="Opening animation"
      className={`fixed inset-0 z-[2000] flex items-stretch justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 ${wrapperFade} transition-opacity duration-700`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* LEFT HALF */}
      <div className="relative w-1/2 h-full overflow-hidden">
        {/* Curtain panel */}
        <div
          aria-hidden
          style={curtainStyle}
          className={`absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-amber-600 ${leftCurtainClass} ease-in-out`}
        >
          {/* Golden border (decorative) */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-400 shadow-lg" />
        </div>

        {/* Performer image or fallback silhouette */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {leftImageSrc ? (
            <img
              src={leftImageSrc}
              alt={leftAlt}
              style={imageStyle}
              className={`max-h-[70%] object-contain transform ${stage >= 1 ? "-translate-x-12 scale-[1.04] opacity-95" : "translate-x-0 scale-100 opacity-100"}`}
              onError={(e) => { e.currentTarget.style.opacity = 0.6; }} // soft fallback if image fails
            />
          ) : (
            // fallback SVG silhouette (keeps previous look)
            <svg width="300" height="420" viewBox="0 0 300 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={imageStyle}
              className={`transform ${stage >= 1 ? "-translate-x-8 rotate-3 scale-105 opacity-90" : "translate-x-0 rotate-0 scale-100 opacity-100"}`}>
              <circle cx="150" cy="60" r="28" fill="rgba(255,255,255,0.25)" />
              <rect x="120" y="110" rx="36" width="110" height="210" fill="rgba(255,255,255,0.12)" />
              <path d="M140 240 q40 -30 80 0" stroke="rgba(255,255,255,0.18)" strokeWidth="6" fill="none" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>

      {/* RIGHT HALF */}
      <div className="relative w-1/2 h-full overflow-hidden">
        <div
          aria-hidden
          style={curtainStyle}
          className={`absolute inset-0 bg-gradient-to-bl from-pink-600 via-rose-600 to-red-600 ${rightCurtainClass} ease-in-out`}
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-400 shadow-lg" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {rightImageSrc ? (
            <img
              src={rightImageSrc}
              alt={rightAlt}
              style={imageStyle}
              className={`max-h-[70%] object-contain transform ${stage >= 1 ? "translate-x-12 scale-[1.04] opacity-95" : "translate-x-0 scale-100 opacity-100"}`}
              onError={(e) => { e.currentTarget.style.opacity = 0.6; }}
            />
          ) : (
            <svg width="320" height="420" viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={imageStyle}
              className={`transform ${stage >= 1 ? "translate-x-8 -rotate-3 scale-105 opacity-90" : "translate-x-0 rotate-0 scale-100 opacity-100"}`}>
              <circle cx="160" cy="70" r="30" fill="rgba(255,255,255,0.25)" />
              <path d="M140 195 Q120 220 100 250 Q85 280 80 320 Q75 360 70 420 L250 420 Q245 360 240 320 Q235 280 220 250 Q200 220 180 195 Z" fill="rgba(255,255,255,0.20)" stroke="rgba(255,215,0,0.25)" strokeWidth="2" />
            </svg>
          )}
        </div>
      </div>

      {/* Center reveal (title + caption) */}
      <div className={`absolute inset-0 z-30 flex items-center justify-center px-6 transition-all`} style={centerStyle}>
        <div className={`text-center ${stage >= 2 ? "opacity-100" : "opacity-0"}`}>
          <h1
            className="text-8xl md:text-[8.5rem] font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1 }}
          >
            AaiShop
          </h1>

          <p className="text-2xl md:text-3xl text-gray-800 font-light max-w-3xl mx-auto">
            Where tradition meets runway — draped in color, crowned with craft. Discover curated lehengas, handcrafted dupattas, and statement pieces that celebrate your every celebration.
          </p>

          <p className="text-sm md:text-base text-gray-600 mt-4">
            Trending Styles • Ethnic Wear • Premium Accessories
          </p>
        </div>
      </div>

      {/* Skip button (visible) */}
      <button
        aria-label="Skip intro"
        onClick={() => {
          setStage(3);
          if (typeof onComplete === "function") onComplete();
        }}
        className="absolute top-6 right-6 z-40 rounded-md bg-white/90 px-3 py-1 text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        style={{ backdropFilter: "blur(6px)" }}
      >
        Skip
      </button>
    </div>
  );
}
