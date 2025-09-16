import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useSpring, a } from "@react-spring/three";
import useProjectStore from "../stores/projectStore";
import React, { useEffect, useRef, useMemo, useCallback } from "react";

export const projects = [
  {
    title: "DirectoryTracer",
    url: "https://directorytracer.xyz",
    image: "projects/directory.avif",
    description: "A directory listing vulnerability scanner",
  },
  {
    title: "Bedtime Storyteller",
    url: "https://bedtimestoryteller.rest",
    image: "projects/bedtime.avif",
    description: "Create bedtime stories with AI for your kids",
  },
  {
    title: "Algorithm Playground",
    url: "https://algorithmplayground.vercel.app/",
    image: "projects/algorithm.avif",
    description: "Algorithm 3D visualization with Three.js",
  },
  {
    title: "Vocasimple",
    url: "https://endearing-pie-91e6b8.netlify.app/",
    image: "projects/vocasimple.avif",
    description:
      "Learn English vocabulary through quizzes and interactive features",
  },
  {
    title: "Storybook",
    url: "https://hankstorybook.netlify.app/",
    image: "projects/storybook.avif",
    description:
      "Learn English vocabulary through quizzes and interactive features",
  },
  {
    title: "Dev Blog",
    url: "https://hank1245.github.io",
    image: "projects/blog.avif",
    description: "My personal blog to share tech articles.",
  },
];

const Project = React.memo((props) => {
  const { project, highlighted } = props;
  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        title={`${project.title} preview image`}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.15}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
});

export const Projects = () => {
  const { viewport } = useThree();
  const currentProject = useProjectStore((state) => state.currentProject);

  const projectItems = useMemo(() => projects, []);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projectItems.map((project, index) => {
        const projectSpring = useSpring({
          position: [
            0 + (index - currentProject) * 2.5,
            currentProject === index ? 0 : -0.1,
            currentProject === index ? -2 : -3,
          ],
          rotation: [
            currentProject === index ? 0 : -Math.PI / 3,
            0,
            currentProject === index ? 0 : -0.1 * Math.PI,
          ],
          config: { mass: 1, tension: 280, friction: 60 },
        });

        return (
          <a.group
            key={"project_" + index}
            position={projectSpring.position}
            rotation={projectSpring.rotation}
          >
            <Project project={project} highlighted={index === currentProject} />
          </a.group>
        );
      })}
    </group>
  );
};
