import {useState, useEffect} from 'react';;
import ShadertoyReact from "shadertoy-react";
import {fragmentShader} from "../shader/fragments/wave";
import {css} from "../layout/css";



const Waves = () => {
  // Color definitions as RGB values -> uniform vec3(3f)
  const uniforms = {
    uBgColorA: { type: "3f", value: [0.0, 0.49, 0.753] },
    uBgColorB: { type: "3f", value: [0.0, 0.608, 0.843] },
    uWaveColor: { type: "3f", value: [0.1, 0.25, 0.15] }
  };
  return (
    <ShadertoyReact
      fs={fragmentShader}
      uniforms={uniforms}
      style={css.canvas}
    />
  )
};
export default Waves;