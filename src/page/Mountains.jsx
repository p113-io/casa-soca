import ShadertoyReact from "shadertoy-react";
import {fragmentShader, vertexShader} from "../shader/fragments/mountain";
import {css} from "../layout/css";

const Light = () => {
  return (
    <ShadertoyReact
      fs={fragmentShader}
      textures={[
        {url: "./texture.png", name: "texture"},
      ]}
      style={css.canvas}
    />
  );
};
export default Light;