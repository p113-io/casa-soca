import ShadertoyReact from "shadertoy-react";
import {fragmentShader} from "../shader/fragments/light";
import {css} from "../layout/css";

const Light = () => {
  return (
    <ShadertoyReact
      fs={fragmentShader}
      style={css.canvas}
    />
  );
};
export default Light;