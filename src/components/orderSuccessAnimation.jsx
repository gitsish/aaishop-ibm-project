import { useEffect, useState } from "react";
import { CheckCircle, Sparkles, Package } from "lucide-react";

export default function OrderSuccessAnimation({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 600);
    const t3 = setTimeout(() => setStage(3), 3000);
    const t4 = setTimeout(() => onComplete?.(), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = prevOverflow;
    };
  }, [onComplete]);

  const wrapperFade = stage >= 3 ? "opacity-0" : "opacity-100";
  const contentReveal = stage >= 2 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4";

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 ${wrapperFade} transition-opacity duration-500`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-20 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl transition-transform duration-1000 ${stage >= 1 ? "scale-150" : "scale-0"}`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl transition-transform duration-1000 delay-100 ${stage >= 1 ? "scale-150" : "scale-0"}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-3xl transition-transform duration-1000 delay-200 ${stage >= 1 ? "scale-150" : "scale-0"}`} />
      </div>

      {stage >= 1 && (
        <>
          <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-amber-400 animate-pulse" />
          <Sparkles className="absolute top-1/3 right-1/4 w-8 h-8 text-yellow-400 animate-pulse" />
          <Sparkles className="absolute bottom-1/3 left-1/3 w-5 h-5 text-amber-300 animate-pulse" />
          <Sparkles className="absolute bottom-1/4 right-1/3 w-7 h-7 text-yellow-300 animate-pulse" />
        </>
      )}

      <div className={`relative z-10 text-center px-6 transition-all duration-700 ${contentReveal}`}>
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
          <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-6 shadow-2xl">
            <CheckCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-bounce" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
          Order Placed!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 font-medium">
          Your order has been successfully placed
        </p>

        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <Package className="w-5 h-5 text-emerald-600 animate-bounce" />
          <span className="text-sm font-semibold text-gray-700">Preparing for delivery...</span>
        </div>
      </div>

      {stage >= 1 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <rect x="10%" y="5%" width="8" height="8" fill="#ef4444" className="animate-fall" opacity="0.8" transform="rotate(45)" />
          <rect x="25%" y="8%" width="6" height="12" fill="#f87171" className="animate-fall" opacity="0.7" transform="rotate(30)" />
          <circle cx="40%" cy="10%" r="4" fill="#fbbf24" className="animate-fall" opacity="0.8" />
          <circle cx="55%" cy="7%" r="5" fill="#fcd34d" className="animate-fall" opacity="0.7" />
          <rect x="70%" y="6%" width="10" height="6" fill="#10b981" className="animate-fall" opacity="0.8" transform="rotate(60)" />
          <rect x="85%" y="9%" width="7" height="10" fill="#34d399" className="animate-fall" opacity="0.7" transform="rotate(15)" />
          <circle cx="15%" cy="12%" r="6" fill="#3b82f6" className="animate-fall" opacity="0.8" />
          <circle cx="90%" cy="5%" r="4" fill="#60a5fa" className="animate-fall" opacity="0.7" />
          <rect x="30%" y="4%" width="8" height="8" fill="#ec4899" className="animate-fall" opacity="0.8" transform="rotate(75)" />
          <rect x="65%" y="11%" width="6" height="12" fill="#f472b6" className="animate-fall" opacity="0.7" transform="rotate(20)" />
        </svg>
      )}
    </div>
  );
}
