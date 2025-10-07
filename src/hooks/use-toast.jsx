import { useIsMobile } from "@/hooks/useIsMobile";

export function Example() {
  const isMobile = useIsMobile();

  return (
    <div className="p-4">
      <p className="text-lg font-semibold">
        {isMobile ? "📱 You’re on a mobile device" : "💻 You’re on a desktop"}
      </p>
    </div>
  );
}
