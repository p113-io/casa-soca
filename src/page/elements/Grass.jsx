import * as THREE from 'three';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Sky, Cloud, CameraShake } from '@react-three/drei';
import { Grass as MyGrass } from '../../particule/Grass';
import { BlobGeometry } from '../../particule/grass/BlobGeometry';
import { Butterfly } from '../../particule/grass/Butterfly';;
import { Particles } from '../../particule/grass/Particles';


import {css} from '../../layout/css';
import { 
  MyGizmoHelper, 
  MyGrid
} from '../../hooks/useHelper';
import loadable from '@loadable/component';

//const MyGrass = loadable(() => import('../particule/Grass'));

const rand = Array.from({ length: 15 }, () => ({
  position: [THREE.MathUtils.randFloat(0.5, 0.7), THREE.MathUtils.randFloat(0.5, 0.7), THREE.MathUtils.randFloat(0.5, 0.7)],
  scale: THREE.MathUtils.randFloat(0.5, 1)
}));

function Clouds() {
  return (
    <group>
      <Cloud depthTest={false} position={[-10, -6, -10]} speed={0.2} opacity={0.4} />
      <Cloud depthTest={false} position={[10, 6, -15]} speed={0.2} opacity={0.25} />
      <Cloud depthTest={false} position={[0, 10, 0]} speed={0.2} opacity={0.2} />
      <Cloud depthTest={false} position={[0, -10, 0]} speed={0.2} opacity={0.2} />
      <Cloud depthTest={false} position={[-10, -6, 15]} speed={0.2} opacity={0.3} />
      <Cloud depthTest={false} position={[10, 6, 10]} speed={0.2} opacity={0.25} />
    </group>
  )
};

const Grass = () => {
  return (
     <Canvas 
      width={css.canvas.width}
      height={css.canvas.height}
      style={css.canvas}
      gl={{ alpha: false }}
      dpr={1.5} 
      camera={{ position: [1, -1.25, 1] }}
    >
      <Suspense fallback={null}>
        {/* <MyGrass>
          <BlobGeometry />
        </MyGrass>  */}
        {rand.map((e, i) => (
          <Butterfly key={i} {...e} />
        ))}
        <Clouds />
        <Environment preset="sunset" />
        <Particles amount={333} size={0.01} opacity={0.6} />
        <OrbitControls 
          makeDefault 
        />
        <CameraShake maxRoll={0.2} maxPitch={0.2} maxYaw={0.2} />
        <Sky />
      </Suspense>
  </Canvas>
  );
};
export default Grass;