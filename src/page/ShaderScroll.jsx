import React, {useState} from  'react';
import ShadertoyReact from 'shadertoy-react';
import {css} from '../layout/css';
import { fragmentShader } from '../shader/fragments/space';
const ShaderScroll = () => {
  const { scrollY } = useState(0);

  const uniforms = {
    uScrollY : {type: '1f', value: scrollY }, // float
    uTestArrayFloats : {type: '1fv', value: [0.2, 0.4, 0.5, 0.5, 0.6] }, // Array of float
    uTestArrayVecs2 : {type: '2fv', value: [0.2, 0.4, 0.5, 0.5] }, // 2 vec2 passed as a flat array
    uTestMatrix : {
        type: 'Matrix2fv', 
        value: [0., 1., 2., 3.] // 2x2 Matrix 
    }
  };

  return (
      <ShadertoyReact
        style={{width: '100vw', height: '100vh'}}
        fs={fragmentShader}
        uniforms={uniforms}
      />
   );
};
export default ShaderScroll;