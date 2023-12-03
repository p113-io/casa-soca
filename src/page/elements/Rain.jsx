import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, usePlane } from '@react-three/cannon';
import { ShaderMaterial } from 'three';
import { Sky } from '@react-three/drei';
import { css } from "../../layout/css";
import { Perf } from "r3f-perf";

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    // React to collisions with raindrops here
    onCollide: (e) => {
      const { mesh } = e.contact;
      // Example: Change the color of the ground on impact
      mesh.material.color.set(0xff0000); // Red color
    },
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  );
};
const Rain = ({ count }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    groupRef.current.rotation.y += 0.01 * delta; // Rotation du groupe de gouttes de pluie

    groupRef.current.position.y -= 0.1 * delta; // Vitesse de descente des gouttes de pluie
    if (groupRef.current.position.y < -10) {
      groupRef.current.position.y = 30; // Réinitialise la position des gouttes de pluie en haut
    }
  });

  const raindrops = [];

  for (let i = 0; i < count; i++) {
    raindrops.push(
      <mesh key={i} position={[Math.random() * 20 - 10, Math.random() * 30, Math.random() * 20 - 10]}>
        <sphereBufferGeometry attach="geometry" args={[0.05, 16, 16]} />
        <meshStandardMaterial attach="material" color="blue" transparent opacity={0.6} />
      </mesh>
    );
  }

  return <group ref={groupRef}>{raindrops}</group>;
};

const RainScene = () => {
  return (
    <Canvas
      style={css.canvas}
    >
      <Perf
        position="bottom-right"
        antialias={true}
        colorBliend={true}
        style={{
          backgroundColor: 'transparent',
          left: 0,
        }}
      />
      <Sky sunPosition={[100, 10, 100]} />
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.6} position={[1000, 2000, 1000]} />
      <Physics>
        <Ground position={[0, -1, 0]} />
        <Rain count={1000} radius={2} />
      </Physics>
    </Canvas>
  );
};

export default RainScene;