import { useGLTF, useTexture, useFBX } from "@react-three/drei";

// Preload 3D assets and textures early to keep the initial UX responsive
useGLTF.preload("models/scene.gltf");
useTexture.preload("textures/baked.jpg");

useGLTF.preload("models/hank.glb");
useFBX.preload("animations/Typing.fbx");
useFBX.preload("animations/Standing Idle.fbx");
useFBX.preload("animations/Falling Idle.fbx");
