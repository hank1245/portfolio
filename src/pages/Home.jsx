import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import React, { Suspense, lazy, useEffect, useState, useCallback } from "react";
import { Cursor } from "../components/Cursor";
import { Interface } from "../components/Interface";
import { LoadingScreen } from "../components/LoadingScreen";
import { Menu } from "../components/Menu";
import { ScrollManager } from "../components/ScrollManager";
import useIntentPrefetch from "../hooks/useIntentPrefetch";
import { framerMotionConfig } from "../config";
import ErrorBoundary from "../components/ErrorBoundary";

const Experience = lazy(() =>
  import("../components/Experience").then((m) => ({ default: m.Experience }))
);

export default function Home() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const handleRetry = useCallback(() => {
    import("../components/Experience");
  }, []);

  const { prefetchOnHover, prefetchOnOpen } = useIntentPrefetch(() =>
    import("../components/Experience")
  );

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig transition={{ ...framerMotionConfig }}>
        <Canvas
          shadows
          camera={{ position: [0, 3, 10], fov: 42 }}
          onMouseEnter={prefetchOnHover}
        >
          <color attach="background" args={["#e6e7ff"]} />
          <ErrorBoundary onRetry={handleRetry}>
            <ScrollControls pages={4} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
                <Suspense fallback={null}>
                  {started && (
                    <Experience
                      section={section}
                      menuOpened={menuOpened}
                      onLoad={prefetchOnOpen}
                    />
                  )}
                </Suspense>
              </Scroll>
              <Scroll html>
                {started && <Interface setSection={setSection} />}
              </Scroll>
            </ScrollControls>
          </ErrorBoundary>
        </Canvas>
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        <Cursor />
      </MotionConfig>
      <Leva hidden />
    </>
  );
}
