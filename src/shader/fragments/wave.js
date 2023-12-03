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
// const fragmentShader = `
//   void main(void) {
//      vec2 uv = gl_FragCoord.xy/iResolution.xy;
//      vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
//      gl_FragColor = vec4(col ,1.0);
//   }
// `;

const fragmentShader = `
float gradient(float p)
{
    vec2 pt0 = vec2(0.00,0.0);
    vec2 pt1 = vec2(0.86,0.1);
    vec2 pt2 = vec2(0.955,0.40);
    vec2 pt3 = vec2(0.99,1.0);
    vec2 pt4 = vec2(1.00,0.0);
    if (p < pt0.x) return pt0.y;
    if (p < pt1.x) return mix(pt0.y, pt1.y, (p-pt0.x) / (pt1.x-pt0.x));
    if (p < pt2.x) return mix(pt1.y, pt2.y, (p-pt1.x) / (pt2.x-pt1.x));
    if (p < pt3.x) return mix(pt2.y, pt3.y, (p-pt2.x) / (pt3.x-pt2.x));
    if (p < pt4.x) return mix(pt3.y, pt4.y, (p-pt3.x) / (pt4.x-pt3.x));
    return pt4.y;
}

float waveN(vec2 uv, vec2 s12, vec2 t12, vec2 f12, vec2 h12, float waveFreq, float waveAmplitude)
{
    vec2 x12 = sin((iTime * s12 + t12 + uv.x) * f12) * h12;

    float waveOffset = sin((iTime + uv.x) * waveFreq) * waveAmplitude;
    
    float g = gradient((uv.y + waveOffset) / (0.5 + x12.x + x12.y));
    
    return g * 0.27;
}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    
    float waves = waveN(vec2(uv.x, uv.y-0.25), vec2(0.03, 0.06), vec2(0.00, 0.02), vec2(8.0, 3.7), vec2(0.06, 0.05), 0.35, 0.05) +
                  waveN(vec2(uv.x, uv.y-0.25), vec2(0.04, 0.07), vec2(0.16, -0.37), vec2(6.7, 2.89), vec2(0.06, 0.05), 0.5, 0.05) +
                  waveN(vec2(uv.x, 0.75-uv.y), vec2(0.035, 0.055), vec2(-0.09, 0.27), vec2(7.4, 2.51), vec2(0.06, 0.05), 0.62, 0.05) +
                  waveN(vec2(uv.x, 0.75-uv.y), vec2(0.032, 0.09), vec2(0.08, -0.22), vec2(6.5, 3.89), vec2(0.06, 0.05), 0.75, 0.05);
    
	float x = uv.x;
	float y = 1.0 - uv.y;
    
    vec3 bg = mix(uBgColorA, uBgColorB, (x+y)*0.55);
    vec3 ac = bg + uWaveColor * waves;

    fragColor = vec4(ac, 1.0);
}
 `;
 export { fragmentShader };
