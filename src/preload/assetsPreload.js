// Dynamically import heavy drei modules and preload assets when idle
export async function warmup3DAssets() {
  try {
    const { useGLTF, useTexture, useFBX } = await import("@react-three/drei");
    useGLTF.preload("models/scene.gltf");
    useTexture.preload("textures/baked.jpg");

    useGLTF.preload("models/hank.glb");
    useFBX.preload("animations/Typing.fbx");
    useFBX.preload("animations/Standing Idle.fbx");
    useFBX.preload("animations/Falling Idle.fbx");
  } catch (e) {
    // no-op: preloading is best-effort
  }
}
