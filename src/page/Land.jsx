import ShadertoyReact from "shadertoy-react";
import {fragmentShader} from "../shader/fragments/land";

const Land = () => {
  return (
    <ShadertoyReact
      fs={fragmentShader}
      style={{width: '100vw', height: '100vh'}}
    />
  )
};
export default Land;