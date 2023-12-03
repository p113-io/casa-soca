
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import { PointLightHelper } from 'three';

const KeyLight = () => {
  const ref = useRef()
  useHelper(ref, PointLightHelper, 1)

  return <pointLight ref={ref} args={[`white`, 1]} position={[-3, 3, 3]} />
}

const FillLight = () => {
  const ref = useRef()
  useHelper(ref, PointLightHelper, 1)

  return <pointLight ref={ref} args={[`white`, 0.15]} position={[3, 1, 3]} />
}

const BackLight = () => {
  const ref = useRef()
  useHelper(ref, PointLightHelper, 1)

  return <pointLight ref={ref} args={[`white`, 0.15]} position={[3, 3, -3]} />
}

const Scene = () => (
  <Canvas
    style={{
      position: 'absolute',
      width: '100vw',
      height: '100vh'
    }}
    
    camera={{
      position: [0, 5, 5]
    }}>
    <KeyLight />
    <FillLight />
    <BackLight />
    <mesh position={[0, 1, 0]}>
      <sphereBufferGeometry args={[620, 620, 620]} />
      <meshStandardMaterial color="orange" />
    </mesh>
    <OrbitControls />
    <gridHelper />
  </Canvas>
);
export default Scene
