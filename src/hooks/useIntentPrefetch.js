import { useCallback, useEffect, useRef } from "react";

// input: prefetchFn: () => void (starts dynamic imports)
// output: { prefetchOnHover, prefetchOnOpen }
export default function useIntentPrefetch(prefetchFn) {
  const prefetchedRef = useRef(false);

  const doPrefetch = useCallback(() => {
    if (prefetchedRef.current) return;
    prefetchedRef.current = true;
    prefetchFn?.();
  }, [prefetchFn]);

  useEffect(() => {
    const onFirstScroll = () => {
      doPrefetch();
      window.removeEventListener("scroll", onFirstScroll);
    };
    window.addEventListener("scroll", onFirstScroll, { passive: true });
    return () => window.removeEventListener("scroll", onFirstScroll);
  }, [doPrefetch]);

  const prefetchOnHover = useCallback(() => doPrefetch(), [doPrefetch]);
  const prefetchOnOpen = useCallback(() => doPrefetch(), [doPrefetch]);

  return { prefetchOnHover, prefetchOnOpen };
}
