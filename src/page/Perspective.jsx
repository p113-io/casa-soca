import ShadertoyReact from "shadertoy-react";
import {fragmentShader} from "../shader/fragments/perspective";
import {css} from "../layout/css";

const Perspective = () => {
  return (
    <ShadertoyReact
      fs={fragmentShader}
      style={css.canvas}
    />
  );
};
export default Perspective;