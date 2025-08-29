import { renderHook, act } from "@testing-library/react";
import useIntentPrefetch from "./useIntentPrefetch";

describe("useIntentPrefetch", () => {
  test("prefetches on hover and only once", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => useIntentPrefetch(spy));

    act(() => {
      result.current.prefetchOnHover();
    });
    expect(spy).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.prefetchOnHover();
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("prefetches on open (toggle) and only once", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => useIntentPrefetch(spy));

    act(() => {
      result.current.prefetchOnOpen();
    });
    expect(spy).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.prefetchOnOpen();
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("prefetches on first scroll and cleans up listener", () => {
    const spy = vi.fn();
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useIntentPrefetch(spy));
    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), {
      passive: true,
    });

    act(() => {
      // simulate scroll event once
      const event = new Event("scroll");
      window.dispatchEvent(event);
    });
    expect(spy).toHaveBeenCalledTimes(1);

    // After first scroll, hook should remove listener
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

    unmount();
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
