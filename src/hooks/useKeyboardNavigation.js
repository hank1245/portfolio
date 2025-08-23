import { useEffect } from "react";

// Generic left/right navigation hook
// options: { onLeft?: () => void, onRight?: () => void, enabled?: boolean }
export default function useKeyboardNavigation({
  onLeft,
  onRight,
  enabled = true,
} = {}) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") onLeft?.();
      if (e.key === "ArrowRight") onRight?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onLeft, onRight, enabled]);
}
