// src/components/IntroCurtain.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * IntroCurtain
 * - onComplete: callback when intro finished
 * - localStorageKey (optional): key to decide show-once
 * - themeTitle, subtitle optional
 *
 * NOTE: Replace the placeholder SVGs with your own illustrations or Lottie players for richer visuals.
 */

export default function IntroCurtain({
  onComplete,
  localStorageKey = "aai_intro_curtain_v1",
  themeTitle = "AaiShop",
  subtitle = "Your Fashion Destination",
}) {
  const [stage, setStage] = useState(0); // 0 initial, 1 animating, 2 opened, 3 fading
  const [show, setShow] = useState(() => {
    try {
      return localStorage.getItem(localStorageKey) !== "true";
    } catch {
      return true;
    }
  });
  const containerRef = useRef(null);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Touch/swipe detection
  const touchStartX = useRef(null);
  const leftOpen = useRef(false);
  const rightOpen = useRef(false);

  useEffect(() => {
    if (!show) {
      onComplete?.();
      return;
    }
    if (prefersReduced) {
      // Immediately finish if reduced motion or user opted out
      finishIntro(true);
      return;
    }

    // lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Start opening sequence
    const t1 = setTimeout(() => setStage(1), 200); // begin anim
    const t2 = setTimeout(() => {
      setStage(2); // fully open
      finishIntro();
    }, 3000); // total duration - tune as needed

    // Escape key to skip
    const onKey = (e) => {
      if (e.key === "Escape") {
        finishIntro(true);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]); // only run on mount / show change

  function finishIntro(skip = false) {
    try {
      localStorage.setItem(localStorageKey, "true");
    } catch {}
    if (skip) {
      setStage(3);
      setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 150);
    } else {
      // graceful fade-out to allow transitions
      setStage(3);
      setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 600);
    }
  }

  // Touch handlers for swiping outward to open early
  function handleTouchStart(e) {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  }
  function handleTouchMove(e) {
    if (!touchStartX.current) return;
    const x = e.touches?.[0]?.clientX ?? null;
    if (x === null) return;
    const w = window.innerWidth;
    const delta = x - touchStartX.current;
    // if initial touch near center, allow outward swipes
    const center = w / 2;
    if (Math.abs(touchStartX.current - center) > 150) return; // start near center
    if (delta > 80) {
      // swipe right -> open right curtain
      rightOpen.current = true;
    } else if (delta < -80) {
      // swipe left -> open left curtain
      leftOpen.current = true;
    }
    // if both opened (or one big swipe), finish early
    if (leftOpen.current || rightOpen.current) {
      finishIntro(true);
    }
  }
  function handleTouchEnd() {
    touchStartX.current = null;
    leftOpen.current = false;
    rightOpen.current = false;
  }

  if (!show) return null;

  // class helpers
  const leftCurtainOpen = stage >= 1 ? "translate-x-[-105%]" : "translate-x-0";
  const rightCurtainOpen = stage >= 1 ? "translate-x-[105%]" : "translate-x-0";
  const contentReveal = stage >= 2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95";
  const wrapperFade = stage >= 3 ? "opacity-0 pointer-events-none" : "opacity-100";

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Opening animation"
      className={`fixed inset-0 z-[2000] flex items-stretch justify-center bg-gradient-to-b from-[#fff] to-[#fff] ${wrapperFade} transition-opacity duration-500`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Left half - man */}
      <div className="relative w-1/2 h-full overflow-hidden">
        {/* fabric texture / left curtain */}
        <div
          aria-hidden
          className={`absolute inset-0 bg-[linear-gradient(135deg,#b45309,#92400e)] bg-cover bg-center transform ${leftCurtainOpen} transition-transform duration-1200 ease-in-out will-change-transform`}
          style={{
            // a subtle fabric-like skew to feel like curtain
            boxShadow: "inset -50px 0 80px rgba(0,0,0,0.08)",
            borderRight: "2px solid rgba(0,0,0,0.06)",
          }}
        />
        {/* male silhouette / flourish (placeholder SVG) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            width="340"
            height="520"
            viewBox="0 0 340 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform duration-1200 ${stage >= 1 ? "-translate-x-12 rotate-3 scale-105" : "translate-x-0 rotate-0 scale-100"} `}
            aria-hidden
          >
            {/* placeholder jacket-man silhouette */}
            <rect x="60" y="80" rx="48" ry="48" width="120" height="240" fill="rgba(255,255,255,0.12)" />
            <circle cx="120" cy="50" r="30" fill="rgba(255,255,255,0.14)" />
            <path d="M90 200 q30 -30 60 0" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Right half - woman */}
      <div className="relative w-1/2 h-full overflow-hidden">
        {/* fabric texture / right curtain */}
        <div
          aria-hidden
          className={`absolute inset-0 bg-[linear-gradient(225deg,#be185d,#fb7185)] bg-cover bg-center transform ${rightCurtainOpen} transition-transform duration-1200 ease-in-out will-change-transform`}
          style={{
            boxShadow: "inset 50px 0 80px rgba(0,0,0,0.06)",
            borderLeft: "2px solid rgba(0,0,0,0.06)",
          }}
        />
        {/* female silhouette / flourish (placeholder SVG) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            width="340"
            height="520"
            viewBox="0 0 340 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform duration-1200 ${stage >= 1 ? "translate-x-12 -rotate-3 scale-105" : "translate-x-0 rotate-0 scale-100"}`}
            aria-hidden
          >
            {/* placeholder lehenga-woman silhouette */}
            <ellipse cx="170" cy="380" rx="90" ry="80" fill="rgba(255,255,255,0.12)" />
            <circle cx="170" cy="110" r="28" fill="rgba(255,255,255,0.14)" />
            <path d="M140 150 q30 -20 60 0" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Center reveal layer - above curtains */}
      <div
        className={`pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 transition-all duration-700 ${contentReveal}`}
        aria-hidden
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff4d6d] via-[#ff7a6b] to-[#ffa14d] drop-shadow-[0_6px_20px_rgba(255,90,90,0.12)]">
            {themeTitle}
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground/80">{subtitle}</p>

          {/* subtle sparkle */}
          <div className="relative mt-6">
            <div className="absolute -left-6 -top-6 w-3 h-3 rounded-full bg-white/80 animate-pulse" />
            <div className="absolute right-0 top-2 w-2 h-2 rounded-full bg-white/70 animate-pulse delay-150" />
            <div className="absolute left-1/2 -bottom-6 w-2 h-2 rounded-full bg-white/70 animate-pulse delay-300" />
          </div>
        </div>
      </div>

      {/* Skip button (accessible) */}
      <button
        aria-label="Skip intro"
        onClick={() => finishIntro(true)}
        className="absolute top-6 right-6 z-40 rounded-full bg-white/90 text-sm px-3 py-1 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        style={{ backdropFilter: "blur(6px)" }}
      >
        Skip
      </button>
    </div>
  );
}
