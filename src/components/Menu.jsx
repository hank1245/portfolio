import { lazy, Suspense } from "react";
import useIntentPrefetch from "../hooks/useIntentPrefetch";

export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;
  const { prefetchOnHover, prefetchOnOpen } = useIntentPrefetch(() =>
    import("./ForceGraph")
  );

  return (
    <>
      <button
        onClick={() => {
          prefetchOnOpen();
          setMenuOpened(!menuOpened);
        }}
        className="z-20 fixed top-4 right-4 md:top-12 md:right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md"
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
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-gradient-to-br from-white via-gray-50 to-indigo-50 transition-all overflow-y-auto flex flex-col
      ${menuOpened ? "w-full md:w-[460px]" : "w-0"}`}
      >
        <div className="flex-1 flex flex-col p-6 mt-24 space-y-12">
          <div className="flex flex-col gap-8">
            <MenuButton label="About" onClick={() => onSectionChange(0)} />
            <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
            <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
            <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
          </div>

          <div className="flex-1 min-h-[500px]">
            <Suspense>
              <LazyForceGraph />
            </Suspense>
            <div className="mt-3">
              <p className="text-xl text-black font-bold text-center">
                Drag around or click a node to visit!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-3xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
    >
      {label}
    </button>
  );
};

// Lazy import ForceGraph component (which itself dynamically loads d3)
const LazyForceGraph = lazy(() => import("./ForceGraph"));
