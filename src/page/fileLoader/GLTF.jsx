import { useRef , Suspense} from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls} from '@react-three/drei';
import {css} from '../../layout/css';
import { 
  MyGizmoHelper, 
  Presentation,  
  MyGrid
} from '../../hooks/useHelper';
import loadable from '@loadable/component';

const MySparkles = loadable(() => import('../../particule/Sparkles'));
const MyCloud = loadable(() => import('../../sky/Cloud'));
const MySky = loadable(() => import('../../sky/Sky'));

MySparkles.preload();
MyCloud.preload();
MySky.preload();

const GLTFModel = ({filePath,model, scale, position}) => {
  scale = scale || .2;
  position = position || [0,0,0];
  const gltf = useLoader(GLTFLoader, filePath);
  const ref = useRef();
  return (
    <Suspense fallback={null}>
      <Presentation >
        <mesh
          ref={ref}
          scale={scale}
          position={position}
        >
          <primitive object={gltf.scene} />
        </mesh>
      </Presentation>
    </Suspense>
  )
}
const GLTF = () => {
  return (
    <Canvas
      width={css.canvas.width}
      height={css.canvas.height}
      style={css.canvas}
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <gridHelper 
        args={[100, 100]}
      />
      <MySparkles />
      <MyGizmoHelper />
      <GLTFModel 
        filePath="./load/objects/casa-soca.gltf" 
        model="casa-soca" 
        scale={.8}
        position={0,0,0}
      />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <MyGrid />
      <MySky />
      <MyCloud />
  </Canvas>
  )
};
export default GLTF;