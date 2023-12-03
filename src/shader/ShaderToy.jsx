import ShadertoyReact from "shadertoy-react";
import {fragmentShader} from './fragments/frag.js';

const ShaderToy = ({fs, style, textures, ...props}) => {
  return (
          <ShadertoyReact
            fs={fs ?? fragmentShader}
            style={style ??{width: '100vw', height: '100vh'}}
            textures={textures ?? [
              {
                url:
                  "https://st2.depositphotos.com/5539346/10769/v/950/depositphotos_107693776-stock-illustration-vector-modern-seamless-geometry-pattern.jpg"
              }
            ]}
            {...props}
          />
  );
};
export default ShaderToy;