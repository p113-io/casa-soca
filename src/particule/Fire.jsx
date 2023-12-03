import {
  Box,
  Effects,
  OrbitControls,
  PerspectiveCamera,
  Plane,
} from "@react-three/drei";

import { Canvas, extend } from "@react-three/fiber";
import { HalfFloatType, LinearEncoding, Vector2 } from "three";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader.js";
import { Perf } from "r3f-perf";
import { FireplaceVFX } from "./effects/Debris";

extend({ UnrealBloomPass });

const RenderPipeline = () => (
  <Effects disableGamma encoding={LinearEncoding} type={HalfFloatType}>
    <unrealBloomPass args={[new Vector2(256, 256), 1.5, 0.0, 1.0]} />
    <shaderPass args={[VignetteShader]} />
  </Effects>
);

const MyFire = () => {
  return (
    <Canvas
      style={{
        width: "98vw",
        height: "92vh",
      }}
      flat
      dpr={[1, 1]}
    >
      <Perf />
      <RenderPipeline />
      <fogExp2 args={["#000", 0.003]} attach="fog" />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[20, 0, -10]} />
      <pointLight intensity={1} position={[0, 20, 0]} color="hotpink" />
      <PerspectiveCamera position={[-30, 30, 50]} makeDefault />
      <OrbitControls />

      <Plane args={[1000, 1000]} rotation-x={-Math.PI / 2}>
        <meshStandardMaterial color="grey" />
      </Plane>
      <FireplaceVFX />
    </Canvas>
  );
};

export default MyFire;
