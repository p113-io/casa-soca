const fragmentShader = `
  precision mediump float;
                  varying vec2 v_uv;


                  uniform vec2 u_resolution;
                  uniform vec2 u_mouse;
                  uniform float u_time;
                  uniform sampler2D diffuse;

                  float inverseLerp(float v, float minValue, float maxValue) {
                    return (v - minValue) / (maxValue - minValue);
                  }

                  float remap(float v, float inMin, float inMax, float outMin, float outMax) {
                    float t = inverseLerp(v, inMin, inMax);
                    return mix(outMin, outMax, t);
                  }
                  float Math_Random(vec2 p)  // replace this by something better
            {
              p  = 50.0*fract( p*0.3183099 + vec2(0.71,0.113));
              return -1.0+2.0*fract( p.x*p.y*(p.x+p.y) );
            }

                  vec3 hash( vec3 p ) {
                   p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                        dot(p,vec3(269.5,183.3,246.1)),
                        dot(p,vec3(113.5,271.9,124.6)));

                   return -1.0 + 2.0*fract(sin(p)*43758.5453123);
                  }


                  float noise( in vec3 p )
      {
        vec3 i = floor( p );
        vec3 f = fract( p );

      	vec3 u = f*f*(3.0-2.0*f);

        return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ),
                              dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                         mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ),
                              dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
                    mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ),
                              dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                         mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ),
                              dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
      }

                  float fbm(vec3 p, int octaves, float persistence, float lacunarity) {
                    float amplitude = 0.5;
                    float frequency = 1.0;
                    float total = 0.0;
                    float normalization = 0.0;

                    for (int i = 0; i < octaves; ++i) {
                      float noiseValue = noise(p * frequency);
                      total += noiseValue * amplitude;
                      normalization += amplitude;
                      amplitude *= persistence;
                      frequency *= lacunarity;
                    }

                    total /= normalization;

                    return total;
                  }

                  float ridgedfbm(vec3 p, int octaves, float persistence, float lacunarity) {
                    float amplitude = 0.5;
                    float frequency = 1.0;
                    float total = 0.0;
                    float normalization = 0.0;

                    for (int i = 0; i < octaves; ++i) {
                      float noiseValue = noise(p * frequency);
                      noiseValue = 1.0 - abs(noiseValue);
                      total += noiseValue * amplitude;
                      normalization += amplitude;
                      amplitude *= persistence;
                      frequency *= lacunarity;
                    }

                    total /= normalization;

                    total *= total;

                    return total;
                  }

                  float turbulencefbm(vec3 p, int octaves, float persistence, float lacunarity) {
                    float amplitude = 0.5;
                    float frequency = 1.0;
                    float total = 0.0;
                    float normalization = 0.0;

                    for (int i = 0; i < octaves; ++i) {
                      float noiseValue = noise(p * frequency);
                      noiseValue =  abs(noiseValue);
                      total += noiseValue * amplitude;
                      normalization += amplitude;
                      amplitude *= persistence;
                      frequency *= lacunarity;
                    }

                    total /= normalization;


                    return total;
                  }

                  vec3 DrawSkyBg() {
                    vec3 color1 = vec3(0.4, 0.6, 9);
                    vec3 color2 = vec3(0.1, .15, .4);

                    return mix(
                      color1,
                      color2,
                      smoothstep(0.87, 1.0, v_uv.y) * 0.7
                    );
                  }

                  vec3 DrawMountain(vec3 baseColor, vec3 mountainColor, vec2 coords, float depth) {
                    float y = fbm(vec3((depth * 0.2 + coords.x) / 210., 1.33, 2.335), 7, 0.5, 2.) * 250.;

                    float sdfMountain = coords.y - y;

                    vec3 fogColor = vec3(0.1, 0.15, 0.4);
                    float fogFactor = smoothstep(0.0, 8000., depth) * 0.5;
                    float heightFactor = smoothstep(265., -200., coords.y);
                    heightFactor *= heightFactor;
                    fogColor *= heightFactor;

                    mountainColor = mix(mountainColor, fogColor, fogFactor);



                    float blur = 1.;
                    blur += smoothstep(2500., 9000., depth) * 70.;
                    blur += smoothstep(400., -900., depth) * 10.;


                    vec3 result = mix(mountainColor, baseColor, smoothstep(0.0, blur,sdfMountain));

                    return result;
                  }


                  void main() {
                    vec2 pixelCoords = (v_uv - 0.5) * u_resolution;

                    vec3 color = DrawSkyBg();


                    vec2 timeVec = vec2(u_time * 10.5, 0.0) * 1.0;

                    vec2 mountainCoord1 = (pixelCoords - vec2(0.0, 250.)) * 4. + timeVec;
                    color = DrawMountain(color, vec3(0.5), mountainCoord1, 6000.0);

                    vec2 mountainCoord2 = (pixelCoords - vec2(0.0, 170.)) * 1. + timeVec;
                    color = DrawMountain(color, vec3(0.4), mountainCoord2, 4000.0);

                    vec2 mountainCoord3 = (pixelCoords - vec2(0.0, 120.)) * .5 + timeVec;
                    color = DrawMountain(color, vec3(0.30), mountainCoord3, 3000.0);

                    vec2 mountainCoord4 = (pixelCoords - vec2(0.0, 60.)) * 0.3 + timeVec;
                    color = DrawMountain(color, vec3(0.25), mountainCoord4, 2000.0);

                    vec2 mountainCoord5 = (pixelCoords - vec2(0.0, 5.)) * 0.2 + timeVec;
                    color = DrawMountain(color, vec3(0.2), mountainCoord5, 1000.0);

                    vec2 mountainCoord6 = (pixelCoords - vec2(0.0, -50.)) * .1 + timeVec;
                    color = DrawMountain(color, vec3(0.15), mountainCoord6, 50.0);



                    gl_FragColor = vec4(color, 1.);
                  }
`;

const vertexShader = `
varying vec2 v_uv;
void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export { fragmentShader, vertexShader };