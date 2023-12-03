// from https://codesandbox.io/s/3kgfx5
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { ShaderLib, UniformsUtils, Color, Vector2, MeshPhysicalMaterial } from "three";
import { GPUComputationRenderer } from "three-stdlib";
import CustomShaderMaterialImpl from "three-custom-shader-material/vanilla"
import { css } from "../../layout/css";

import { Perf } from "r3f-perf";

export const waterVertexShader = `
  uniform sampler2D heightmap;

	void main() {
		vec2 cellSize = vec2( 1.0 / WIDTH, 1.0 / WIDTH );

		// Compute normal from heightmap
		csm_Normal = vec3(
			( texture2D( heightmap, uv + vec2( - cellSize.x, 0 ) ).x - texture2D( heightmap, uv + vec2( cellSize.x, 0 ) ).x ) * WIDTH / BOUNDS,
			( texture2D( heightmap, uv + vec2( 0, - cellSize.y ) ).x - texture2D( heightmap, uv + vec2( 0, cellSize.y ) ).x ) * WIDTH / BOUNDS,
			1.0
		);
  }
`

export const heightmapFragmentShader = `
	#include <common>

	uniform vec2 mousePos;
	uniform float mouseSize;
	uniform float viscosityConstant;
	uniform float heightCompensation;

	void main()	{
		vec2 cellSize = 1.0 / resolution.xy;
		vec2 uv = gl_FragCoord.xy * cellSize;

		vec4 heightmapValue = texture2D( heightmap, uv );

		// Get neighbours
		vec4 north = texture2D( heightmap, uv + vec2( 0.0, cellSize.y ) );
		vec4 south = texture2D( heightmap, uv + vec2( 0.0, - cellSize.y ) );
		vec4 east = texture2D( heightmap, uv + vec2( cellSize.x, 0.0 ) );
		vec4 west = texture2D( heightmap, uv + vec2( - cellSize.x, 0.0 ) );

		float newHeight = ( ( north.x + south.x + east.x + west.x ) * 0.5 - heightmapValue.y ) * viscosityConstant;

		// Mouse influence
		float mousePhase = clamp( length( ( uv - vec2( 0.5 ) ) * BOUNDS - vec2( mousePos.x, - mousePos.y ) ) * PI / mouseSize, 0.0, PI );
		newHeight += ( cos( mousePhase ) + 1.0 ) * 0.28;

		heightmapValue.y = heightmapValue.x;
		heightmapValue.x = newHeight;

		gl_FragColor = heightmapValue;
	}
`
// Texture width for simulation
const WIDTH = 128
// Water size in system units
const BOUNDS = 512
// Water height in system units
let waterUniforms;
let heightmapVariable;
// GPU Computation renderer
let gpuCompute;
// R3F Mesh with water texture
const WaterMesh = () => {
   const waterMaterial = new CustomShaderMaterialImpl({
    baseMaterial: MeshPhysicalMaterial,
    vertexShader: waterVertexShader,
    uniforms: UniformsUtils.merge([ShaderLib["physical"].uniforms, { heightmap: { value: null } }])
  })

  // Material attributes
  waterMaterial.transmission = 1
  waterMaterial.metalness = 0
  waterMaterial.roughness = 0
  waterMaterial.color = new Color(0x217d9c)

  // Defines
  waterMaterial.defines.WIDTH = WIDTH.toFixed(1)
  waterMaterial.defines.BOUNDS = BOUNDS.toFixed(1)

  waterUniforms = waterMaterial.uniforms

  const gl = useThree((state) => state.gl)
  gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, gl)

  const heightmap0 = gpuCompute.createTexture()
  heightmapVariable = gpuCompute.addVariable("heightmap", heightmapFragmentShader, heightmap0)
  gpuCompute.setVariableDependencies(heightmapVariable, [heightmapVariable])
  heightmapVariable.material.uniforms["mousePos"] = { value: new Vector2(10000, 10000) }
  heightmapVariable.material.uniforms["mouseSize"] = { value: 20.0 }
  heightmapVariable.material.uniforms["viscosityConstant"] = { value: 0.98 }
  heightmapVariable.material.uniforms["heightCompensation"] = { value: 0 }
  heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed(1)

  const error = gpuCompute.init()
  if (error !== null) {
    console.error(error)
  }

  const pointer = useThree((state) => state.pointer)

  useFrame(() => {
    const uniforms = heightmapVariable.material.uniforms
    uniforms["mousePos"].value.set(pointer.x * 200, -pointer.y * 200)
    gpuCompute.compute()
    waterUniforms["heightmap"].value = gpuCompute.getCurrentRenderTarget(heightmapVariable).texture
  })
  return (
     <mesh material={waterMaterial} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} scale={0.4} castShadow receiveShadow>
      <planeGeometry args={[BOUNDS, BOUNDS, WIDTH, WIDTH]} />
    </mesh>
  )
}
// R3F Component that add water texture to a plan scene
const Water = () => {
  return (
     <Canvas 
        style={css.canvas}
        camera={{ position: [20, 15, 40] }}
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
      <OrbitControls />
      <Sky />
      <Environment preset="sunset" />
      <WaterMesh />
    </Canvas>
  )
};
export default Water;