/**
 * Playground shadertoy-react:
 * https://www.npmjs.com/package/shadertoy-react
 *
 * Built-in uniforms (Can be used directly in your shader)
 * float iTime -- shader playback time (in seconds).
 * float iTimeDelta -- Render time (in seconds).
 * int iFrame -- Shader playback frame.
 * vec2 iResolution -- viewport resolution (in pixels).
 * vec4 iDate -- (year, month, day, time in seconds).
 * vec4 iMouse -- mouse pixel coords. xy: current (if MLB down), zw: click.
 * sampler2D iChannel^n -- The textures input channel you've passed; numbered in the same order as the textures passed as prop in your react component.
 * vec3 iChannelResolution[n] -- An array containing the texture channel resolution (in pixels).
 * vec4 iDeviceOrientation -- Raw data from device orientation where respectively x: Alpha, y: Beta, z: Gamma and w: window.orientation.
 */

// Classic glsl syntax
const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif

// uniform float iTime; 
// uniform vec2 iResolution;
// uniform float iTimeDelta;
// uniform float iFrameRate;
// uniform int iFrame;
// uniform float iChannelTime[4];
// uniform vec3 mouse;
// uniform vec3 resolution;
// uniform vec3 iChannelResolution[4];

#define PI 3.141592
#define ORBS 13.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2. * fragCoord - iResolution) / iResolution.y;
  uv *= 180.27;
  fragColor = vec4(0.);
  for (float i = 0.; i < ORBS; i++) {
    uv.y -= i / 1000. * (uv.x); 
    uv.x += i / 0.05 * sin(uv.x / 9.32 + iTime) * 0.1 * cos(uv.y / 16.92 + iTime / 3.) * 0.31;
    float t = 3. * i * PI / float(ORBS) * (3. + 9.) + iTime / 1.3;
    float x = -1. * tan(t);
    float y = sin(t / 3.5795); 
    vec2 p = (115. * vec2(x, y)) / sin(PI * sin(uv.x / 12.25 + iTime / 3.));
    vec3 col = cos(vec3(0, 1, -1) * PI * 2. / 3. + PI * (3. + i / 6.)) * 0.6 + 0.6;
    fragColor += vec4(i / 33. * 55.94 / length(uv - p * 0.9) * col, 3.57);
  }
  fragColor.xyz = pow(fragColor.xyz, vec3(4.5));
  fragColor.w = 1.0;
}
`;

// const fragmentShader = `
//   void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
//     vec2 uv = fragCoord.xy/iResolution.xy;
//     vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
//     fragColor = vec4(col ,1.0);
//   }
// `;
export { fragmentShader };