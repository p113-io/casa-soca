import { Canvas, useFrame } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three'
import { OrthographicCamera } from '@react-three/drei'

const CameraDolly = ({ isZoom }) => {
  const vec = new THREE.Vector3()

  useFrame((state) => {
    const step = 0.1
    const x = isZoom ? 0 : 5
    const y = isZoom ? 10 : 5
    const z = isZoom ? 10 : 5

    state.camera.position.lerp(vec.set(x, y, z), step)
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
  })

  return null
}

const Scene = () => {
  const [isZoom, setZoom] = useState(false)
  const toggleZoom = () => setZoom((active) => !active)

  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <OrthographicCamera makeDefault zoom={40} />
      <gridHelper args={[100, 100, `white`, `gray`]} />
      <mesh onClick={toggleZoom} position={[0, 1, 0]}>
        <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
        <meshNormalMaterial attach="material" />
      </mesh>
      <CameraDolly isZoom={isZoom} />
    </Canvas>
  )
}
export default Scene;
