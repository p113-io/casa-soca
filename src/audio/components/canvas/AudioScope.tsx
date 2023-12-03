import { Canvas } from "@react-three/fiber";
import AudioScopeVisual from "../visualizers/visualizerAudioScope";
import { css } from "../../../layout/css";

const AudioScopeCanvas = () => {
  return (
    <Canvas
      style={css.canvas}
      dpr={window.devicePixelRatio}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <color attach="background" args={["black"]} />
      <AudioScopeVisual />
    </Canvas>
  );
};
export default AudioScopeCanvas;
