import ShadertoyReact from "shadertoy-react";
import {fragmentShader} from "../shader/fragments/frag";
import {css} from "../layout/css";

const Sea = () => {
  return (
    <ShadertoyReact
      fs={fragmentShader}
      style={css.canvas}
    />
  )
}