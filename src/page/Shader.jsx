import {useState, useEffect} from 'react';;
import ShadertoyReact from "shadertoy-react";
import {fragmentShader} from "../shader/fragments/space";
import {css} from "../layout/css";

const Shader = () => {
  const [fragment, setFragment]=useState("../shader/fragments/space.frag");
  const list = [
    {
      "name": "Space", 
      "fs": "../shader/fragments/space",
      "style": {width: '100vw', height: '100vh'},
      "textures": null,
    },
    {
      "name": "3D Texture", 
      "fs": "../shader/fragments/frag",
      "style": {width: '100vw', height: '100vh'},
      "textures": null,
    }
  ];
  return (
    <ShadertoyReact
      fs={fragmentShader} 
      style={css.canvas} 
    />
  );
};
export default Shader;