import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useSpring, a } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Background } from "./Background";
import { Office } from "./Office";
import { Projects } from "./Projects";

export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
    }, 600);
  }, [section]);

  const characterGroup = useRef();

  const characterGroupSpring = useSpring({
    position:
      section === 1
        ? [isMobile ? 0.3 : 0, -viewport.height + 0.5, 7]
        : section === 2
        ? [isMobile ? -1.4 : -2, -viewport.height * 2 + 0.5, 0]
        : section === 3
        ? [0.24, -viewport.height * 3 + 1, 8.5]
        : [0, 0, 0],
    rotation:
      section === 1
        ? [0, isMobile ? -Math.PI / 2 : 0, 0]
        : section === 2
        ? [0, Math.PI / 2, 0]
        : section === 3
        ? [0, -Math.PI / 4, 0]
        : [-3.141592653589793, 1.2053981633974482, 3.141592653589793],
    scale:
      section === 1
        ? [isMobile ? 1.5 : 1, isMobile ? 1.5 : 1, isMobile ? 1.5 : 1]
        : section === 2
        ? [1, 1, 1]
        : section === 3
        ? [1, 1, 1]
        : [officeScaleRatio, officeScaleRatio, officeScaleRatio],
    config: { duration: 600 },
  });

  const officeGroupSpring = useSpring({
    position: [
      isMobile ? 0 : 1.5 * officeScaleRatio,
      isMobile ? -viewport.height / 6 : 0,
      3,
    ],
    config: { duration: 800 },
  });

  const skillsGroupSpring = useSpring({
    position: [
      0,
      section === 1
        ? -viewport.height
        : isMobile
        ? -viewport.height
        : -1.5 * officeScaleRatio,
      section === 1 ? 0 : -10,
    ],
    config: { duration: 600 },
  });

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    if (section === 0) {
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
    }
  });

  return (
    <>
      <Background />
      <a.group
        ref={characterGroup}
        position={characterGroupSpring.position}
        rotation={characterGroupSpring.rotation}
        scale={characterGroupSpring.scale}
      >
        <Avatar animation={characterAnimation} />
      </a.group>
      <ambientLight intensity={1} />
      <a.group
        position={officeGroupSpring.position}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
      >
        <Office section={section} />
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.07, 0.16, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </a.group>

      {/* SKILLS */}
      <a.group position={skillsGroupSpring.position}>
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
      </a.group>
      <Projects />
    </>
  );
};
