
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, OrbitControls, Sky } from "@react-three/drei";
import{ css } from '../../layout/css';
import loadable from "@loadable/component";

const TerrainManager = loadable(() => import("../../terrain/TerrainManager"));
TerrainManager.preload();

const Terrain = () => {
  
  return (
    <Canvas 
      width={css.canvas.width}
      height={css.canvas.height}
      style={css.canvas}
      gl={{ alpha: true }}
      dpr={window.devicePixelRatio}
      shadows
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      camera={{ position: [0, 0, 1] }}
    >
      <Suspense fallback={null}>
        <CameraControls 
          makeDefault 
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          zoom={12}
        />
        <TerrainManager 
          w={css.canvas.width}
          h={0.20}
          sca={10}
          res={500}
          levs={3}
        
        />
        <Sky />
        <OrbitControls 
          makeDefault 
        />
      </Suspense>
    </Canvas>
  );
};
export default Terrain;