import React, { lazy, Suspense, useCallback, memo } from "react";
import useIntentPrefetch from "../hooks/useIntentPrefetch";

export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;
  const { prefetchOnHover, prefetchOnOpen } = useIntentPrefetch(() =>
    import("./ForceGraph")
  );
  const handleToggle = useCallback(() => {
    prefetchOnOpen();
    setMenuOpened(!menuOpened);
  }, [prefetchOnOpen, setMenuOpened, menuOpened]);

  return (
    <>
      <button
        onClick={handleToggle}
        className="z-20 fixed top-4 right-4 md:top-12 md:right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        aria-label={menuOpened ? "Close menu" : "Open menu"}
        aria-expanded={menuOpened}
        aria-controls="site-menu"
        title={menuOpened ? "Close menu" : "Open menu"}
        onMouseEnter={prefetchOnHover}
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <nav
        id="site-menu"
        role="navigation"
        aria-label="Site"
        aria-hidden={!menuOpened}
        className={`z-10 fixed top-0 right-0 bottom-0 bg-gradient-to-br from-white via-gray-50 to-indigo-50 transition-all overflow-y-auto flex flex-col
      ${menuOpened ? "w-full md:w-[460px]" : "w-0"}`}
      >
        <div className="flex-1 flex flex-col p-6 mt-24 space-y-12">
          <div className="flex flex-col gap-8">
            <MenuButton label="About" onClick={() => onSectionChange(0)} tabIndex={menuOpened ? 0 : -1} />
            <MenuButton label="Skills" onClick={() => onSectionChange(1)} tabIndex={menuOpened ? 0 : -1} />
            <MenuButton label="Projects" onClick={() => onSectionChange(2)} tabIndex={menuOpened ? 0 : -1} />
            <MenuButton label="Contact" onClick={() => onSectionChange(3)} tabIndex={menuOpened ? 0 : -1} />
          </div>

          <div className="flex-1 min-h-[500px]">
            <Suspense fallback={null}>
              <LazyForceGraph />
            </Suspense>
            <div className="mt-3">
              <p className="text-xl text-black font-bold text-center">
                Drag around or click a node to visit!
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
const MenuButton = memo((props) => {
  const { label, onClick, tabIndex } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      tabIndex={tabIndex}
      className="text-3xl font-bold cursor-pointer hover:text-indigo-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded"
      aria-label={`Go to ${label} section`}
    >
      {label}
    </button>
  );
});

const LazyForceGraph = lazy(() => import("./ForceGraph"));
