import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, lazy } from "react";
import { ScrollManager } from "./ScrollManager";

const Experience = lazy(() =>
  import("./Experience").then((m) => ({ default: m.Experience }))
);
const Interface = lazy(() =>
  import("./Interface").then((m) => ({ default: m.Interface }))
);

export default function ThreeCanvas({
  started,
  section,
  setSection,
  menuOpened,
}) {
  return (
    <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }} aria-hidden="true" role="presentation">
      <color attach="background" args={["#e6e7ff"]} />
      <ScrollControls pages={4} damping={0.1}>
        <ScrollManager section={section} onSectionChange={setSection} />
        <Scroll>
          <Suspense>
            {started && (
              <Experience section={section} menuOpened={menuOpened} />
            )}
          </Suspense>
        </Scroll>
        <Scroll html>
          <Suspense>
            {started && <Interface setSection={setSection} />}
          </Suspense>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
