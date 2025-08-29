import { renderHook, act } from "@testing-library/react";
import useIntentPrefetch from "./useIntentPrefetch";

describe("useIntentPrefetch", () => {
  test("triggers prefetch only once across hover/open/scroll", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => useIntentPrefetch(spy));

    // First trigger: hover
    act(() => {
      result.current.prefetchOnHover();
    });
    expect(spy).toHaveBeenCalledTimes(1);

    // Subsequent triggers should do nothing
    act(() => {
      result.current.prefetchOnOpen();
    });
    expect(spy).toHaveBeenCalledTimes(1);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
