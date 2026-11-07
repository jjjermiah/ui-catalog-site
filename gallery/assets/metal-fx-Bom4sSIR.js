import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{n as t,t as n}from"./jsx-runtime-C3cWAN_r.js";function r(e){let t=e.replace(`#`,``);(t.length===3||t.length===4)&&(t=t.split(``).map(e=>e+e).join(``));let n=t.length>=8?parseInt(t.slice(6,8),16)/255:1;return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255,n]}function i(e,t,n){e/=255,t/=255,n/=255;let r=Math.max(e,t,n),i=r-Math.min(e,t,n),a=0,o=r===0?0:i/r;return i!==0&&(a=r===e?((t-n)/i+6)%6:r===t?(n-e)/i+2:(e-t)/i+4,a/=6),[a,o,r]}function a(e,t,n){let r=Math.floor(e*6),i=e*6-r,a=n*(1-t),o=n*(1-i*t),s=n*(1-(1-i)*t),c=0,l=0,u=0;switch(r%6){case 0:c=n,l=s,u=a;break;case 1:c=o,l=n,u=a;break;case 2:c=a,l=n,u=s;break;case 3:c=a,l=o,u=n;break;case 4:c=s,l=a,u=n;break;case 5:c=n,l=a,u=o}return[Math.round(c*255),Math.round(l*255),Math.round(u*255)]}var o={colorBack:`#00000000`,speed:1,repetition:1.5,softness:.05,shiftRed:.3,shiftBlue:.3,distortion:.1,contour:.4,angle:90,shape:0,scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0,fit:1},s={chromatic:{name:`chromatic`,modes:{dark:{...o,colorTint:`#88ccff2e`,shiftRed:.75,shiftBlue:.75,repetition:2,softness:.09,shaderOpacity:1},light:{...o,colorTint:`#66b0ff99`,shiftRed:.6,shiftBlue:.6,shaderOpacity:1}}},silver:{name:`silver`,modes:{dark:{...o,colorTint:`#ffffff66`,shaderOpacity:.88},light:{...o,colorTint:`#ffffff40`,shaderOpacity:1}}},gold:{name:`gold`,modes:{dark:{...o,colorTint:`#ffcc55cc`,speed:.85,shaderOpacity:.92},light:{...o,colorTint:`#f7d488aa`,shaderOpacity:1}}}},c=`#version 300 es
precision mediump float;

uniform sampler2D u_image;

uniform vec2 u_resolution;
uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorTint;

uniform float u_softness;
uniform float u_repetition;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_distortion;
uniform float u_contour;
uniform float u_angle;

uniform float u_shape;
uniform bool u_isImage;

in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_imageUV;

out vec4 fragColor;


#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846


vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}


vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


float getColorChanges(float c1, float c2, float stripe_p, vec3 w, float blur, float bump, float tint) {

  float ch = mix(c2, c1, smoothstep(.0, 2. * blur, stripe_p));

  float border = w[0];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  if (u_isImage == true) {
    bump = smoothstep(.2, .8, bump);
  }
  border = w[0] + .4 * (1. - bump) * w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + .5 * (1. - bump) * w[1];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
  float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
  ch = mix(ch, gradient, smoothstep(border, border + .5 * blur, stripe_p));

  // Tint color is applied with color burn blending
  ch = mix(ch, 1. - min(1., (1. - ch) / max(tint, 0.0001)), u_colorTint.a);
  return ch;
}

float getImgFrame(vec2 uv, float th) {
  float frame = 1.;
  frame *= smoothstep(0., th, uv.y);
  frame *= 1.0 - smoothstep(1. - th, 1., uv.y);
  frame *= smoothstep(0., th, uv.x);
  frame *= 1.0 - smoothstep(1. - th, 1., uv.x);
  return frame;
}

float blurEdge3x3(sampler2D tex, vec2 uv, vec2 dudx, vec2 dudy, float radius, float centerSample) {
  vec2 texel = 1.0 / vec2(textureSize(tex, 0));
  vec2 r = radius * texel;

  float w1 = 1.0, w2 = 2.0, w4 = 4.0;
  float norm = 16.0;
  float sum = w4 * centerSample;

  sum += w2 * textureGrad(tex, uv + vec2(0.0, -r.y), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(0.0, r.y), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(-r.x, 0.0), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(r.x, 0.0), dudx, dudy).r;

  sum += w1 * textureGrad(tex, uv + vec2(-r.x, -r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, -r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(-r.x, r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, r.y), dudx, dudy).r;

  return sum / norm;
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {

  const float firstFrameOffset = 2.8;
  float t = .3 * (u_time + firstFrameOffset);

  vec2 uv = v_imageUV;
  vec2 dudx = dFdx(v_imageUV);
  vec2 dudy = dFdy(v_imageUV);
  vec4 img = textureGrad(u_image, uv, dudx, dudy);

  if (u_isImage == false) {
    uv = v_objectUV + .5;
    uv.y = 1. - uv.y;
  }

  float cycleWidth = u_repetition;
  float edge = 0.;
  float contOffset = 1.;

  vec2 rotatedUV = uv - vec2(.5);
  float angle = (-u_angle + 70.) * PI / 180.;
  float cosA = cos(angle);
  float sinA = sin(angle);
  rotatedUV = vec2(
  rotatedUV.x * cosA - rotatedUV.y * sinA,
  rotatedUV.x * sinA + rotatedUV.y * cosA
  ) + vec2(.5);

  // u_contour is applied in 2 separate ranges:
  // - 0 to .4 sets the edge hardness, saturated above .4 (both branches below)
  // - .5 to 1 warps the stripes direction along the edges, inactive below .5 (see u_contour range 2)
  if (u_isImage == true) {
    float edgeRaw = img.r;
    edge = blurEdge3x3(u_image, uv, dudx, dudy, 6., edgeRaw);
    edge = pow(edge, 1.6);
    edge *= mix(0.0, 1.0, smoothstep(0.0, 0.4, u_contour));
  } else {
    if (u_shape < 1.) {
      // full-fill on canvas
      vec2 borderUV = v_responsiveUV + .5;
      float ratio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
      vec2 mask = min(borderUV, 1. - borderUV);
      vec2 pixel_thickness = min(250. / v_responsiveBoxGivenSize, vec2(.5));
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);

      uv = v_responsiveUV;
      if (ratio > 1.) {
        uv.y /= ratio;
      } else {
        uv.x *= ratio;
      }
      uv += .5;
      uv.y = 1. - uv.y;

      cycleWidth *= 2.;
      contOffset = 1.5;

    } else if (u_shape < 2.) {
      // circle
      vec2 shapeUV = uv - .5;
      shapeUV *= .67;
      edge = pow(clamp(3. * length(shapeUV), 0., 1.), 18.);
    } else if (u_shape < 3.) {
      // daisy
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.68;

      float r = length(shapeUV) * 2.;
      float a = atan(shapeUV.y, shapeUV.x) + .2;
      r *= (1. + .05 * sin(3. * a + 2. * t));
      float f = abs(cos(a * 3.));
      edge = smoothstep(f, f + .7, r);
      edge *= edge;

      uv *= .8;
      cycleWidth *= 1.6;

    } else if (u_shape < 4.) {
      // diamond
      vec2 shapeUV = uv - .5;
      shapeUV = rotate(shapeUV, .25 * PI);
      shapeUV *= 1.42;
      shapeUV += .5;
      vec2 mask = min(shapeUV, 1. - shapeUV);
      vec2 pixel_thickness = vec2(.15);
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);
    } else if (u_shape < 5.) {
      // metaballs
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.3;
      edge = 0.;
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float speed = 1.5 + 2./3. * sin(fi * 12.345);
        float angle = -fi * 1.5;
        vec2 dir1 = vec2(cos(angle), sin(angle));
        vec2 dir2 = vec2(cos(angle + 1.57), sin(angle + 1.));
        vec2 traj = .4 * (dir1 * sin(t * speed + fi * 1.23) + dir2 * cos(t * (speed * 0.7) + fi * 2.17));
        float d = length(shapeUV + traj);
        edge += pow(1.0 - clamp(d, 0.0, 1.0), 4.0);
      }
      edge = 1. - smoothstep(.65, .9, edge);
      edge = pow(edge, 4.);
    }

    edge = mix(smoothstep(.9 - 2. * fwidth(edge), .9, edge), edge, smoothstep(0.0, 0.4, u_contour));

  }

  float opacity = 0.;
  if (u_isImage == true) {
    opacity = img.g;
    float frame = getImgFrame(v_imageUV, 0.);
    opacity *= frame;
  } else {
    opacity = 1. - smoothstep(.9 - 2. * fwidth(edge), .9, edge);
    if (u_shape < 2.) {
      edge = 1.2 * edge;
    } else if (u_shape < 5.) {
      edge = 1.8 * pow(edge, 1.5);
    }
  }

  float diagBLtoTR = rotatedUV.x - rotatedUV.y;
  float diagTLtoBR = rotatedUV.x + rotatedUV.y;

  vec3 color = vec3(0.);
  vec3 color1 = vec3(.98, 0.98, 1.);
  vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, diagTLtoBR));

  vec2 grad_uv = uv - .5;

  float dist = length(grad_uv + vec2(0., .2 * diagBLtoTR));
  grad_uv = rotate(grad_uv, (.25 - .2 * diagBLtoTR) * PI);
  float direction = grad_uv.x;

  float bump = pow(1.8 * dist, 1.2);
  bump = 1. - bump;
  bump *= pow(uv.y, .3);


  float thin_strip_1_ratio = .12 / cycleWidth * (1. - .4 * bump);
  float thin_strip_2_ratio = .07 / cycleWidth * (1. + .4 * bump);
  float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);

  float thin_strip_1_width = cycleWidth * thin_strip_1_ratio;
  float thin_strip_2_width = cycleWidth * thin_strip_2_ratio;

  float noise = snoise(uv - t);

  edge += (1. - edge) * u_distortion * noise;

  direction += diagBLtoTR;
  float contour = 0.;
  direction -= 2. * noise * diagBLtoTR * (smoothstep(0., 1., edge) * (1.0 - smoothstep(0., 1., edge)));
  // u_contour range 2
  direction *= mix(1., 1. - edge, smoothstep(.5, 1., u_contour));
  direction -= 1.7 * edge * smoothstep(.5, 1., u_contour);
  direction += .2 * pow(u_contour, 4.) * (1.0 - smoothstep(0., 1., edge));

  bump *= clamp(pow(uv.y, .1), .3, 1.);
  direction *= (.1 + (1.1 - edge) * bump);

  direction *= (.4 + .6 * (1.0 - smoothstep(.5, 1., edge)));
  direction += .18 * (smoothstep(.1, .2, uv.y) * (1.0 - smoothstep(.2, .4, uv.y)));
  direction += .03 * (smoothstep(.1, .2, 1. - uv.y) * (1.0 - smoothstep(.2, .4, 1. - uv.y)));

  direction *= (.5 + .5 * pow(uv.y, 2.));
  direction *= cycleWidth;
  direction -= t;


  float colorDispersion = (1. - bump);
  colorDispersion = clamp(colorDispersion, 0., 1.);
  float dispersionRed = colorDispersion;
  dispersionRed += .03 * bump * noise;
  dispersionRed += 5. * (smoothstep(-.1, .2, uv.y) * (1.0 - smoothstep(.1, .5, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, 1., bump)));
  dispersionRed -= diagBLtoTR;

  float dispersionBlue = colorDispersion;
  dispersionBlue *= 1.3;
  dispersionBlue += (smoothstep(0., .4, uv.y) * (1.0 - smoothstep(.1, .8, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, .8, bump)));
  dispersionBlue -= .2 * edge;

  dispersionRed *= (u_shiftRed / 20.);
  dispersionBlue *= (u_shiftBlue / 20.);

  float blur = 0.;
  float rExtraBlur = 0.;
  float gExtraBlur = 0.;
  if (u_isImage == true) {
    float softness = 0.05 * u_softness;
    blur = softness + .5 * smoothstep(1., 10., u_repetition) * smoothstep(.0, 1., edge);
    float smallCanvasT = 1.0 - smoothstep(100., 500., min(u_resolution.x, u_resolution.y));
    blur += smallCanvasT * smoothstep(.0, 1., edge);
    rExtraBlur = softness * (0.05 + .1 * (u_shiftRed / 20.) * bump);
    gExtraBlur = softness * 0.05 / max(0.001, abs(1. - diagBLtoTR));
  } else {
    blur = u_softness / 15. + .3 * contour;
  }

  vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
  w[1] -= .02 * smoothstep(.0, 1., edge + bump);
  float stripe_r = fract(direction + dispersionRed);
  float r = getColorChanges(color1.r, color2.r, stripe_r, w, blur + fwidth(stripe_r) + rExtraBlur, bump, u_colorTint.r);
  float stripe_g = fract(direction);
  float g = getColorChanges(color1.g, color2.g, stripe_g, w, blur + fwidth(stripe_g) + gExtraBlur, bump, u_colorTint.g);
  float stripe_b = fract(direction - dispersionBlue);
  float b = getColorChanges(color1.b, color2.b, stripe_b, w, blur + fwidth(stripe_b), bump, u_colorTint.b);

  color = vec3(r, g, b);
  color *= opacity;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);


  fragColor = vec4(color, opacity);
}
`,l=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`,u=c;function d(e,t,n){let r=e.createShader(t);if(!r)throw Error(`metal-fx: gl.createShader returned null`);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r);throw e.deleteShader(r),Error(`metal-fx: shader compile failed: ${t??`(no info log)`}`)}return r}function f(e,t,n){let r=e.createProgram();if(!r)throw Error(`metal-fx: gl.createProgram returned null`);if(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)){let t=e.getProgramInfoLog(r);throw e.deleteProgram(r),Error(`metal-fx: program link failed: ${t??`(no info log)`}`)}return r}var p=1.6,m=1.3,h=null,g=null;function _(){if(g!==null)return g;if(typeof document>`u`)return g=!1;try{let e=document.createElement(`canvas`).getContext(`webgl2`);g=!!e,e?.getExtension(`WEBGL_lose_context`)?.loseContext()}catch{g=!1}return g}var v=null;function y(e){v=e}var b=[`u_resolution`,`u_time`,`u_pixelRatio`,`u_colorBack`,`u_colorTint`,`u_repetition`,`u_softness`,`u_shiftRed`,`u_shiftBlue`,`u_distortion`,`u_contour`,`u_angle`,`u_shape`,`u_isImage`,`u_image`,`u_originX`,`u_originY`,`u_worldWidth`,`u_worldHeight`,`u_fit`,`u_scale`,`u_rotation`,`u_offsetX`,`u_offsetY`,`u_imageAspectRatio`];function x(e){e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA);let t=f(e,d(e,e.VERTEX_SHADER,l),d(e,e.FRAGMENT_SHADER,u));e.useProgram(t);let n=e.createBuffer();if(!n)throw Error(`metal-fx: gl.createBuffer returned null`);e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);let r=e.getAttribLocation(t,`a_position`);e.enableVertexAttribArray(r),e.vertexAttribPointer(r,2,e.FLOAT,!1,0,0);let i={};for(let n of b)i[n]=e.getUniformLocation(t,n);let a=e.createTexture();return a&&(e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),i.u_image&&e.uniform1i(i.u_image,0)),{program:t,buffer:n,uniforms:i,dummyTexture:a}}function S(){if(h)return h;let e=Math.min(2,typeof window<`u`&&window.devicePixelRatio||1),t=Math.round(96*e),n=typeof OffscreenCanvas<`u`,r,i;if(n)r=new OffscreenCanvas(t,t),i=r.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1});else{let e=document.createElement(`canvas`);e.width=t,e.height=t,i=e.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,preserveDrawingBuffer:!0}),r=e}if(!i)throw Error(`metal-fx: WebGL2 not supported`);let{program:a,buffer:o,uniforms:c,dummyTexture:l}=x(i);return r.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),h&&(h.contextLost=!0)},!1),r.addEventListener(`webglcontextrestored`,()=>{if(!h)return;let e=x(h.gl);h.program=e.program,h.buffer=e.buffer,h.uniforms=e.uniforms,h.dummyTexture=e.dummyTexture,h.presetDirty=!0,h.contextLost=!1,v?.()},!1),h={glCanvas:r,gl:i,program:a,buffer:o,uniforms:c,dummyTexture:l,preset:s.chromatic.modes.dark,presetDirty:!0,contextLost:!1,useOffscreen:n,frameBitmap:null,startMs:performance.now(),pausedMs:0,pausedAtMs:null,rafId:0,dpr:e,instances:new Set,frameCount:0,glowQueue:[],glowIdx:0,glowSkip:0,glowPixels:new Uint8Array(t*t*4),glowPixelsW:t,glowPixelsH:t},h}function C(){if(!h)return;let{gl:e,program:t,buffer:n,frameBitmap:r,dummyTexture:i}=h;try{r?.close(),e.deleteBuffer(n),e.deleteProgram(t),i&&e.deleteTexture(i),e.getExtension(`WEBGL_lose_context`)?.loseContext()}catch{}h=null}var w=0;function T(){if(!h)return;let e=performance.now();if(e-w<1500)return;w=e;let{gl:t,glCanvas:n}=h,r=n.width,i=n.height;(h.glowPixelsW!==r||h.glowPixelsH!==i)&&(h.glowPixelsW=r,h.glowPixelsH=i,h.glowPixels=new Uint8Array(r*i*4)),t.readPixels(0,0,r,i,t.RGBA,t.UNSIGNED_BYTE,h.glowPixels)}var E={bx:0,by:0};function D(e,t,n){if(!h)return E.bx=0,E.by=0,E;let{glCanvas:r}=h,i=r.width,a=r.height,o=e.dpr,s=e.cssWidth*o,c=e.cssHeight*o,l=140*o,u=40*o,d=i/l*s/e.shaderScale,f=a/u*c/e.shaderScale;d>i&&(d=i),f>a&&(f=a);let p=(i-d)/2,m=(a-f)/2,g=p+t/e.cssWidth*d,_=m+n/e.cssHeight*f;return E.bx=Math.round(g),E.by=Math.round(a-1-_),E}var O={r:0,g:0,b:0,lum:0,count:0};function k(e,t,n,r,i,a){let o=Math.max(1,a|0),s=Math.max(0,r-o),c=Math.min(t,r+o+1),l=Math.max(0,i-o),u=Math.min(n,i+o+1);O.r=0,O.g=0,O.b=0,O.lum=0,O.count=0;for(let n=l;n<u;n++){let r=n*t;for(let t=s;t<c;t++){let n=(r+t)*4;O.r+=e[n],O.g+=e[n+1],O.b+=e[n+2],O.lum+=(.2126*e[n]+.7152*e[n+1]+.0722*e[n+2])/255,O.count++}}return O}var A={r:255,g:255,b:255};function j(e,t,n,r){if(!h)return 0;let i=D(e,t,n),a=k(h.glowPixels,h.glowPixelsW,h.glowPixelsH,i.bx,i.by,r);return a.count>0?a.lum/a.count:0}function M(e,t,n,r){if(!h)return A.r=255,A.g=255,A.b=255,A;let i=D(e,t,n),a=k(h.glowPixels,h.glowPixelsW,h.glowPixelsH,i.bx,i.by,r);return a.count===0?(A.r=255,A.g=255,A.b=255,A):(A.r=a.r/a.count,A.g=a.g/a.count,A.b=a.b/a.count,A)}function N(e,t,n,r){if(!h)return A.r=255,A.g=255,A.b=255,A;let i=D(e,t,n),{glowPixels:a,glowPixelsW:o,glowPixelsH:s}=h,c=Math.max(1,r|0),l=Math.max(0,i.bx-c),u=Math.min(o,i.bx+c+1),d=Math.max(0,i.by-c),f=Math.min(s,i.by+c+1),p=-1;A.r=255,A.g=255,A.b=255;for(let e=d;e<f;e++){let t=e*o;for(let e=l;e<u;e++){let n=(t+e)*4,r=a[n],i=a[n+1],o=a[n+2],s=Math.max(r,i,o),c=(s>0?(s-Math.min(r,i,o))/s:0)*(.35+s/255*.65);c>p&&(p=c,A.r=r,A.g=i,A.b=o)}}return A}var P=14,F=1.5,I={x:0,y:0};function L(e=512){return{xy:new Float32Array(e*2),n:0}}function R(e,t,n,r,i,a,o=L()){i=Math.max(0,Math.min(i,Math.min(n,r)/2));let s=60+Math.ceil(2*(n+r)/F)+8;o.xy.length<s*2&&(o.xy=new Float32Array(s*2));let c=o.xy,l=0,u=(e,t)=>{a?(a(e,t,I),c[l*2]=I.x,c[l*2+1]=I.y):(c[l*2]=e,c[l*2+1]=t),l++},d=(e,t,n,r)=>{let i=Math.hypot(n-e,r-t),a=Math.max(1,Math.ceil(i/F));for(let i=0;i<a;i++){let o=i/a;u(e+(n-e)*o,t+(r-t)*o)}},f=(e,t,n,r)=>{for(let a=0;a<=P;a++){let o=n+(r-n)*(a/P);u(e+i*Math.cos(o),t+i*Math.sin(o))}};return d(e+i,t,e+n-i,t),f(e+n-i,t+i,-Math.PI/2,0),d(e+n,t+i,e+n,t+r-i),f(e+n-i,t+r-i,0,Math.PI/2),d(e+n-i,t+r,e+i,t+r),f(e+i,t+r-i,Math.PI/2,Math.PI),d(e,t+r-i,e,t+i),f(e+i,t+i,Math.PI,1.5*Math.PI),o.n=l,o}y(()=>{h&&h.instances.size>0&&h.pausedAtMs===null&&ve()}),typeof document<`u`&&document.addEventListener(`visibilitychange`,()=>{h&&h.pausedAtMs===null&&!h.contextLost&&(document.hidden?ye():h.instances.size>0&&ve())});function z(e){let t=S(),n=e.hostCanvas.getContext(`2d`,{alpha:!0});if(!n)throw Error(`metal-fx: canvas 2D context unavailable`);let r=e.scale??1,i={canvas:e.hostCanvas,ctx:n,cssWidth:e.cssWidth,cssHeight:e.cssHeight,cornerRadius:e.cornerRadius,kind:e.kind,ringCssPx:e.ringCssPx??(e.kind===`circle`?2:1)*r,shaderScale:e.shaderScale??(e.kind===`circle`?1.3:1.6)*r,opacityMul:e.opacityMul??1,glowGain:e.glowGain??1,visible:!0,paused:e.paused??!1,everCopied:!1,frozen:null,dpr:typeof window<`u`&&window.devicePixelRatio||1,scale:r,onAfterFrame:e.onAfterFrame,onComposite:e.onComposite,onFirstCopy:e.onFirstCopy,mask:e.mask??null,deform:null,deformLayers:null,overscan:0,cursorLight:null,glowFast:!1,rawCanvas:null,wantRaw:!1,ringCanvas:null,wantRing:!1};return ce(i),t.instances.add(i),t.rafId===0&&t.pausedAtMs===null&&ve(),i}function B(e){if(!h)return;h.instances.delete(e);let t=h.glowQueue.indexOf(e);t!==-1&&h.glowQueue.splice(t,1),h.instances.size===0&&(ye(),C())}function ee(e){h&&(h.glowQueue.includes(e)||h.glowQueue.push(e))}function te(e){if(!h)return;let t=h.glowQueue.indexOf(e);t!==-1&&h.glowQueue.splice(t,1)}function V(e,t){let n=!1;t.mask!==void 0&&(e.mask=t.mask),t.cssWidth!==void 0&&t.cssWidth!==e.cssWidth&&(e.cssWidth=t.cssWidth,n=!0),t.cssHeight!==void 0&&t.cssHeight!==e.cssHeight&&(e.cssHeight=t.cssHeight,n=!0),t.cornerRadius!==void 0&&(e.cornerRadius=t.cornerRadius),t.scale!==void 0&&(e.scale=t.scale),t.kind!==void 0&&t.kind!==e.kind&&(e.kind=t.kind,t.shaderScale===void 0&&(e.shaderScale=(t.kind===`circle`?m:p)*e.scale),t.ringCssPx===void 0&&(e.ringCssPx=(t.kind===`circle`?2:1)*e.scale)),t.shaderScale!==void 0&&(e.shaderScale=t.shaderScale),t.ringCssPx!==void 0&&(e.ringCssPx=t.ringCssPx),t.opacityMul!==void 0&&(e.opacityMul=t.opacityMul),t.glowGain!==void 0&&(e.glowGain=t.glowGain),t.paused!==void 0&&t.paused!==e.paused&&(e.paused=t.paused,t.paused?fe(e):e.frozen=null,!t.paused&&h&&h.rafId===0&&h.pausedAtMs===null&&!h.contextLost&&ve()),n&&ce(e)}function ne(e,t){e.visible=t,t&&h&&h.rafId===0&&h.pausedAtMs===null&&!h.contextLost&&ve()}function re(e){return(typeof window<`u`&&window.devicePixelRatio||1)!==e.dpr&&(ce(e),pe(e),!0)}var ie=null;function ae(e,t){let n=S();n.preset=ie??s[e].modes[t],n.presetDirty=!0}var H=null;function oe(e){H=e}function se(e,t){H&&h&&e.visible&&!e.paused&&h.glowQueue.includes(e)&&(e.glowFast=!!H(e,t))}function ce(e){e.dpr=typeof window<`u`&&window.devicePixelRatio||1;let t=e.overscan,n=Math.max(1,Math.round((e.cssWidth+2*t)*e.dpr)),r=Math.max(1,Math.round((e.cssHeight+2*t)*e.dpr));e.canvas.width!==n&&(e.canvas.width=n),e.canvas.height!==r&&(e.canvas.height=r);let i=e.canvas.style;t>0?(i.left=`${-t}px`,i.top=`${-t}px`,i.width=`calc(100% + ${2*t}px)`,i.height=`calc(100% + ${2*t}px)`,i.borderRadius=`0`):i.left!==``&&(i.left=``,i.top=``,i.width=`100%`,i.height=`100%`,i.borderRadius=``)}function le(e){let{ctx:t,dpr:n,canvas:r}=e,i=e.ringCssPx*n,a=r.width,o=r.height,s=Math.max(0,(e.cornerRadius-e.ringCssPx)*n);t.save(),t.globalCompositeOperation=`destination-out`,t.fillStyle=`#000`,t.beginPath(),t.roundRect(i,i,a-2*i,o-2*i,s),t.fill(),t.restore()}var ue=L();function de(e,t,n,r,i,a,o,s){let{xy:c,n:l}=R(t,n,r,i,a,o,ue);e.beginPath();for(let t=0;t<l;t++)t===0?e.moveTo(c[0]*s,c[1]*s):e.lineTo(c[t*2]*s,c[t*2+1]*s);e.closePath()}function fe(e){if(!h)return null;let t=h.frameBitmap??h.glCanvas,n=h.glCanvas.width,r=h.glCanvas.height;if(n<1||r<1)return null;let i=e.frozen;i||(i=document.createElement(`canvas`),e.frozen=i),(i.width!==n||i.height!==r)&&(i.width=n,i.height=r);let a=i.getContext(`2d`);return a?(a.clearRect(0,0,n,r),a.drawImage(t,0,0),i):(e.frozen=null,null)}function pe(e){if(!h)return;let t=(e.paused?e.frozen??fe(e):null)??h.frameBitmap??h.glCanvas,n=e.dpr,r=e.canvas.width,i=e.canvas.height;if(r<1||i<1)return;let a=Math.max(1,Math.round(e.cssWidth*n)),o=Math.max(1,Math.round(e.cssHeight*n)),s=e.overscan*n,c=t.width,l=t.height,u=140*n,d=40*n,f=c/u*a/e.shaderScale,p=l/d*o/e.shaderScale;f>c&&(f=c),p>l&&(p=l);let m=Math.max(0,(c-f)/2),g=Math.max(0,(l-p)/2),_=e.opacityMul*h.preset.shaderOpacity,v=e.ctx;v.clearRect(0,0,r,i);let y=e.deform;if(e.mask){if(_<1&&(v.globalAlpha=_),v.drawImage(t,m,g,f,p,0,0,r,i),_<1&&(v.globalAlpha=1),e.wantRaw){let t=e.rawCanvas;t||(t=document.createElement(`canvas`),e.rawCanvas=t),(t.width!==r||t.height!==i)&&(t.width=r,t.height=i);let n=t.getContext(`2d`);n&&(n.clearRect(0,0,r,i),n.drawImage(e.canvas,0,0))}v.save(),v.globalCompositeOperation=`destination-in`,v.fillStyle=`#000`,e.mask(v,r,i,n),v.restore(),v.globalCompositeOperation=`source-over`}else if(!y)_<1&&(v.globalAlpha=_),v.drawImage(t,m,g,f,p,0,0,r,i),_<1&&(v.globalAlpha=1),le(e);else{let u=e.cssWidth,d=e.cssHeight,m=e.cornerRadius,h=e.ringCssPx,g=e.deformLayers;v.save(),v.translate(s,s);let b=a/f,x=o/p,S=Math.min(c,f*(a+2*s)/a),C=Math.min(l,p*(o+2*s)/o),w=Math.max(0,(c-S)/2),T=Math.max(0,(l-C)/2),E=S*b,D=C*x;if(_<1&&(v.globalAlpha=_),v.drawImage(t,w,T,S,C,a/2-E/2,o/2-D/2,E,D),_<1&&(v.globalAlpha=1),v.globalCompositeOperation=`destination-in`,de(v,0,0,u,d,m,y,n),v.fillStyle=`#000`,v.fill(),v.globalCompositeOperation=`destination-out`,de(v,h,h,u-2*h,d-2*h,Math.max(0,m-h),y,n),v.fill(),e.wantRing){let c=e.ringCanvas;c||(c=document.createElement(`canvas`),e.ringCanvas=c),(c.width!==r||c.height!==i)&&(c.width=r,c.height=i);let l=c.getContext(`2d`);l&&(l.setTransform(1,0,0,1,0,0),l.globalCompositeOperation=`source-over`,l.clearRect(0,0,r,i),l.translate(s,s),_<1&&(l.globalAlpha=_),l.drawImage(t,w,T,S,C,a/2-E/2,o/2-D/2,E,D),l.globalAlpha=1,l.globalCompositeOperation=`destination-out`,de(l,h,h,u-2*h,d-2*h,Math.max(0,m-h),y,n),l.fillStyle=`#000`,l.fill(),l.globalCompositeOperation=`source-over`,l.setTransform(1,0,0,1,0,0))}if(g?.hairline){let e=g.hairline;v.globalCompositeOperation=`destination-over`,de(v,e.inset,e.inset,u-2*e.inset,d-2*e.inset,Math.max(0,m-e.inset),y,n),v.lineWidth=e.width*n,v.strokeStyle=e.color,v.stroke()}if(g?.fill&&(v.globalCompositeOperation=`destination-over`,de(v,0,0,u,d,m,y,n),v.fillStyle=g.fill,v.fill()),g?.rim){let e=g.rim;v.globalCompositeOperation=`source-over`,v.save(),de(v,0,0,u,d,m,y,n),v.clip();let t=e.inset+e.width/2;de(v,t,t,u-2*t,d-2*t,Math.max(0,m-t),y,n),v.lineWidth=e.width*n,v.strokeStyle=e.color,v.stroke(),v.restore()}v.restore(),v.globalCompositeOperation=`source-over`}if(e.onComposite?.(),e.onFirstCopy){let t=e.onFirstCopy;e.onFirstCopy=void 0,t()}e.onAfterFrame?.()}function me(){if(!h)return;let{gl:e,uniforms:t,preset:n,glCanvas:i,dpr:a}=h;t.u_resolution&&e.uniform2f(t.u_resolution,i.width,i.height),t.u_pixelRatio&&e.uniform1f(t.u_pixelRatio,a),t.u_colorBack&&e.uniform4fv(t.u_colorBack,r(n.colorBack)),t.u_colorTint&&e.uniform4fv(t.u_colorTint,r(n.colorTint)),t.u_repetition&&e.uniform1f(t.u_repetition,n.repetition),t.u_softness&&e.uniform1f(t.u_softness,n.softness),t.u_shiftRed&&e.uniform1f(t.u_shiftRed,n.shiftRed),t.u_shiftBlue&&e.uniform1f(t.u_shiftBlue,n.shiftBlue),t.u_distortion&&e.uniform1f(t.u_distortion,n.distortion),t.u_contour&&e.uniform1f(t.u_contour,n.contour),t.u_angle&&e.uniform1f(t.u_angle,n.angle),t.u_shape&&e.uniform1f(t.u_shape,n.shape),t.u_isImage&&e.uniform1i(t.u_isImage,0),t.u_imageAspectRatio&&e.uniform1f(t.u_imageAspectRatio,1),t.u_originX&&e.uniform1f(t.u_originX,n.originX),t.u_originY&&e.uniform1f(t.u_originY,n.originY),t.u_worldWidth&&e.uniform1f(t.u_worldWidth,n.worldWidth),t.u_worldHeight&&e.uniform1f(t.u_worldHeight,n.worldHeight),t.u_fit&&e.uniform1f(t.u_fit,n.fit),t.u_scale&&e.uniform1f(t.u_scale,n.scale),t.u_rotation&&e.uniform1f(t.u_rotation,n.rotation),t.u_offsetX&&e.uniform1f(t.u_offsetX,n.offsetX),t.u_offsetY&&e.uniform1f(t.u_offsetY,n.offsetY),h.presetDirty=!1}function he(e){if(!h)return;let{gl:t,uniforms:n,preset:r,glCanvas:i}=h,a=(e-h.startMs-h.pausedMs)/1e3*r.speed;t.viewport(0,0,i.width,i.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),h.presetDirty&&me(),n.u_time&&t.uniform1f(n.u_time,a),t.drawArrays(t.TRIANGLES,0,6),h.frameCount++}var ge=0;function _e(e){if(!h)return;if(h.contextLost){h.rafId=0;return}let t=!1;for(let e of h.instances)if(e.visible&&(!e.paused||!e.everCopied)){t=!0;break}if(!t)h.rafId=0;else if(h.rafId=requestAnimationFrame(_e),e-ge<66){if(H)for(let t of h.glowQueue)t.glowFast&&t.visible&&!t.paused&&(t.glowFast=!!H(t,e))}else{ge=e,he(e),T(),h.useOffscreen&&(h.frameBitmap?.close(),h.frameBitmap=h.glCanvas.transferToImageBitmap());for(let e of h.instances)e.visible&&(e.paused&&e.everCopied||(pe(e),e.everCopied=!0));if(H&&h.glowQueue.length>0&&++h.glowSkip%1==0)for(let t of h.glowQueue)t.visible&&!t.paused&&(t.glowFast=!!H(t,e))}}function ve(){h&&h.rafId===0&&(h.rafId=requestAnimationFrame(_e))}function ye(){h&&(h.rafId!==0&&cancelAnimationFrame(h.rafId),h.rafId=0)}var be={linear:e=>e,smoothstep:e=>e*e*(3-2*e)};function xe(e,t,n,r=be.linear){return{from:e,to:t,dur:n,ease:r,startMs:-1,val:e,done:!1}}function Se(e,t){e.startMs=t,e.val=e.from,e.done=!1}function Ce(e,t){if(e.done||e.startMs<0)return e.val;let n=Math.min(1,(t-e.startMs)/e.dur);return e.val=e.from+(e.to-e.from)*e.ease(n),n>=1&&(e.done=!0),e.val}var U={...Object.freeze({haloOpMul:2,extraIntensity:3.51,peakOp:.85,baseOp:.34,inset:1.5,extraOutward:1,wanderRange:15,wanderLerp:.0075,fadeRate:.00875,lumLo:.08,lumHi:.32,minDwellMs:1500,relocFadeMs:300,relocFadeOutMs:450,pointGain:2.5,haloHalfLen:7.8,extraHalfLen:9.13952/3,haloStrokeXl:26.4,haloStrokeLg:15.6,haloStrokeMd:7.2,haloStrokeSm:3,haloBlurXl:8.4,haloBlurLg:4.8,haloBlurMd:2.1,haloBlurSm:.9,haloOpXl:.385,haloOpLg:.595,haloOpMd:.7,haloOpSm:.7,extraStrokeOuter:4/3,extraStrokeCore:2/3,extraBlurOuter:2/3,extraBlurCore:1.35/3,extraFadeR:13/3,extraOpOuter:.85})},we=new Set;function Te(e){return we.add(e),()=>{we.delete(e)}}var Ee={...Object.freeze({enabled:!0,reach:56,fadeMs:200,cursor:!0,cursorDistance:186,cursorStrength:3.35,cursorDiffuse:1.4,cursorFalloff:37,cursorDepth:.4,cursorEdge:0,cursorReach:11.5,cursorBlur:.5,cursorZoom:3,spill:!1,spillRadius:48,spillStrength:.55,spillOffset:.35,spillLumGain:.7,spillSaturation:1.3,spillInside:.5,spillBlur:0,catchLight:!1,catchFollow:.25,catchGain:1})},De=!1,Oe=0,ke=0,Ae=0,je=!1,Me=0,Ne=0,W=NaN,Pe=NaN,Fe=0,Ie=0,Le=0,Re=0,G=null,K={d:0,nx:0,ny:0,k:1,left:0,top:0},ze={x:0,y:0},q={r:255,g:255,b:255},J=null,Be=``,Ve=-1,He=-1,Ue=!1;function We(){Ae++,Je()}function Ge(){Ae=Math.max(0,Ae-1),Ae===0&&Ye()}var Ke=e=>typeof window.matchMedia==`function`&&window.matchMedia(e).matches;function qe(){if(De||performance.now()<Oe||1)return!1;let e=window.visualViewport;return!(e&&Math.abs(e.scale-1)>.001)}function Je(){je||Ae===0||typeof document>`u`||Ke(`(pointer: fine)`)&&(je=!0,document.addEventListener(`pointermove`,Qe,{passive:!0}),document.addEventListener(`pointerleave`,et),document.addEventListener(`pointercancel`,et),document.addEventListener(`keydown`,$e,{passive:!0}),document.addEventListener(`visibilitychange`,et),window.addEventListener(`blur`,et))}function Ye(){je&&(je=!1,document.removeEventListener(`pointermove`,Qe),document.removeEventListener(`pointerleave`,et),document.removeEventListener(`pointercancel`,et),document.removeEventListener(`keydown`,$e),document.removeEventListener(`visibilitychange`,et),window.removeEventListener(`blur`,et),Me!==0&&(cancelAnimationFrame(Me),Me=0),G&&=(G.cursorLight=null,null),Le=0,Re=0,J&&(J.remove(),J=null,Be=``,Ve=-1,He=-1,Ue=!1),gt(),rt&&=(rt.remove(),null))}var Xe=!0,Ze=!1;function Qe(e){Xe=e.pointerType===`mouse`||e.pointerType===``,Ze=!1,W=Fe=e.clientX,Pe=Ie=e.clientY,it&&rt&&(Xe&&mt(W,Pe)||gt()),tt()}function $e(){Ze=!0,gt()}function et(){W=Pe=NaN,tt()}function tt(){je&&Me===0&&(Ne=performance.now(),Me=requestAnimationFrame(yt))}function nt(e,t,n,r,i,a,o){let s=a===`circle`?Math.min(n,r)/2:Math.max(0,Math.min(i,Math.min(n,r)/2)),c=n/2,l=r/2,u=Math.max(0,n/2-s),d=Math.max(0,r/2-s),f=Math.max(-u,Math.min(u,e-c)),p=Math.max(-d,Math.min(d,t-l)),m=e-c-f,h=t-l-p,g=Math.hypot(m,h);if(g>1e-6)return o.x=c+f+m/g*s,o.y=l+p+h/g*s,g-s;let _=e,v=n-e,y=t,b=r-t,x=Math.min(_,v,y,b);return x===_?(o.x=0,o.y=t):x===v?(o.x=n,o.y=t):x===y?(o.x=e,o.y=0):(o.x=e,o.y=r),-x}var rt=null,it=!1,at=!1,ot=``,Y=null,st=``,ct=/^(INPUT|TEXTAREA|SELECT)$/,lt=new WeakMap,ut=0,dt=null;function ft(e){let t=e;for(;t&&t!==document.body;){if(ct.test(t.tagName)||t.isContentEditable)return!0;t=t.parentElement}return!1}function pt(){if(rt)return!0;let e=document.createElement(`div`);e.className=`metal-fx-cursor`,e.setAttribute(`aria-hidden`,`true`),e.style.cssText=`position:fixed;left:0;top:0;pointer-events:none;z-index:2147483001;will-change:transform;transform-origin:0 0;display:none`;let t=document.createElement(`canvas`);t.style.display=`block`,e.appendChild(t),document.body.appendChild(e);let n=t.getContext(`2d`),r=document.createElement(`canvas`).getContext(`2d`);return!n||!r?(e.remove(),!1):(rt=e,!0)}function mt(e,t,n=!1){let r=performance.now();if(!n&&at&&r-ut<12)return!0;ut=r;let i=document.elementFromPoint(e,t);if(!i)return ht(),!1;if(i===dt&&at)return!0;dt=i;let a=lt.get(i);if(a===void 0){if(a=!ft(i),a){let e=getComputedStyle(i).cursor;a=e===`auto`||e==="default"||e===`none`}lt.set(i,a)}if(!a)return ht(),!1;if(!at){let e=document.documentElement;ot=e.style.cursor,e.style.cursor=`none`,at=!0}return i!==Y&&(Y&&(Y.style.cursor=st,Y=null,st=``),getComputedStyle(i).cursor!==`none`&&(Y=i,st=i.style.cursor,i.style.cursor=`none`)),!0}function ht(){Y&&(Y.isConnected&&(Y.style.cursor=st),Y=null,st=``),at&&(document.documentElement.style.cursor=ot,at=!1,ot=``),dt=null,lt=new WeakMap}function gt(){ht(),rt&&it&&(rt.style.display=`none`,it=!1)}function _t(){if(J)return J;let e=document.createElement(`div`);return e.className=`metal-fx-cursor-spill`,e.setAttribute(`aria-hidden`,`true`),e.style.cssText=`position:fixed;left:0;top:0;pointer-events:none;z-index:2147483000;border-radius:50%;mix-blend-mode:plus-lighter;will-change:transform,opacity;opacity:0;display:none`,document.body.appendChild(e),J=e,e}function vt(){J&&Ue&&(J.style.display=`none`,J.style.opacity=`0`,Ue=!1)}function yt(e){if(Me=0,!je)return;let t=performance.now();try{bt(e)}catch(e){De=!0,gt(),vt(),G&&=(G.cursorLight=null,null),typeof console<`u`&&console.warn(`metal-fx: cursor light disabled after error`,e);return}performance.now()-t>6?++ke>=20&&(ke=0,Oe=performance.now()+5e3,gt()):ke>0&&ke--}function bt(e){let t=Ee,n=Math.min(.05,Math.max(.001,(e-Ne)/1e3));Ne=e;let r=null,o=0,s=0;if(t.enabled&&h&&!Number.isNaN(W)){let e=1/0,n=Math.max(1,t.reach),i=t.cursor&&qe()?Math.max(1,t.cursorDistance):0,a=Math.max(n,i);for(let t of h.instances){if(!t.visible||!t.canvas.isConnected)continue;let n=t.canvas.getBoundingClientRect();if(n.width<=0)continue;let i=t.overscan,o=n.width/(t.cssWidth+2*i),s=n.left+i*o,c=n.top+i*o,l=a*o;if(W<s-l||W>s+t.cssWidth*o+l||Pe<c-l||Pe>c+t.cssHeight*o+l)continue;let u=nt((W-s)/o,(Pe-c)/o,t.cssWidth,t.cssHeight,t.cornerRadius,t.kind,ze),d=Math.abs(u);d<=a&&d<e&&(e=d,r=t,K.d=u,K.nx=ze.x,K.ny=ze.y,K.k=o,K.left=s,K.top=c)}if(r){if(e<=n){let t=1-e/n;o=t*t*(3-2*t)}e<=i&&(s=Math.min(1,(1-e/i)*3)),r.mask&&(K.nx=r.cssWidth/2,K.ny=r.cssHeight/2,r.wantRaw=!0)}}let c=1-Math.exp(-(n*1e3)/(Math.max(1,t.fadeMs)/3));if(Le+=(o-Le)*c,Re+=(s-Re)*c,r&&r!==G&&(G&&(G.cursorLight=null,se(G,e)),G=r),!r&&Le<.002&&Re<.002)Le=0,Re=0,G&&=(G.cursorLight=null,se(G,e),null),vt(),gt();else if(G){if(t.catchLight){let e=G.cursorLight??(G.cursorLight={x:0,y:0,w:0});e.x=K.nx,e.y=K.ny,e.w=Le}else G.cursorLight&&(G.cursorLight=null);if(se(G,e),t.cursor&&Re>.002&&Xe&&!Ze&&!Number.isNaN(W)&&qe()&&pt()&&mt(W,Pe)||gt(),t.spill){let e=_t(),n=M(G,K.nx,K.ny,2),r=j(G,K.nx,K.ny,3),o=Math.max(n.r,n.g,n.b)||1,s=i(n.r*255/o,n.g*255/o,n.b*255/o),[c,l,u]=a(s[0],Math.min(1,s[1]*t.spillSaturation),1);q.r+=(c-q.r)*.15,q.g+=(l-q.g)*.15,q.b+=(u-q.b)*.15;let d=Math.round(q.r/6)*6,f=Math.round(q.g/6)*6,p=Math.round(q.b/6)*6,m=`radial-gradient(closest-side, rgba(${d},${f},${p},1) 0%, rgba(${d},${f},${p},0.35) 45%, rgba(${d},${f},${p},0) 100%)`;m!==Be&&(Be=m,e.style.background=m);let h=Math.max(1,t.spillRadius*K.k);h!==Ve&&(Ve=h,e.style.width=`${(2*h).toFixed(1)}px`,e.style.height=`${(2*h).toFixed(1)}px`),t.spillBlur!==He&&(He=t.spillBlur,e.style.filter=t.spillBlur>0?`blur(${t.spillBlur}px)`:``);let g=K.left+K.nx*K.k,_=K.top+K.ny*K.k,v=Fe+(g-Fe)*t.spillOffset,y=Ie+(_-Ie)*t.spillOffset;e.style.transform=`translate3d(${(v-h).toFixed(2)}px,${(y-h).toFixed(2)}px,0)`;let b=Math.min(1,Math.max(0,r/.3)),x=1-t.spillLumGain+t.spillLumGain*b,S=K.d<0?t.spillInside:1,C=Math.max(0,Math.min(1,t.spillStrength*Le*x*S));Ue||=(e.style.display=``,!0),e.style.opacity=C.toFixed(3)}else vt();Me=requestAnimationFrame(yt)}}var xt=new Map;function St(e,t){let n=Math.sqrt(12*e*e/t+1),r=Math.floor(n);r%2==0&&r--;let i=r+2,a=(12*e*e-t*r*r-4*t*r-3*t)/(-4*r-4),o=Math.round(a),s=[];for(let e=0;e<t;e++)s.push(e<o?r:i);return s}function Ct(e,t,n,r,i){let a=1/(i+i+1);for(let o=0;o<r;o++){let r=o*n,s=0;for(let t=-i;t<=i;t++)s+=e[r+Math.min(n-1,Math.max(0,t))];for(let o=0;o<n;o++){t[r+o]=s*a;let c=r+Math.max(0,o-i),l=r+Math.min(n-1,o+i+1);s+=e[l]-e[c]}}}function wt(e,t,n,r,i){let a=1/(i+i+1);for(let o=0;o<n;o++){let s=0;for(let t=-i;t<=i;t++)s+=e[Math.min(r-1,Math.max(0,t))*n+o];for(let c=0;c<r;c++){t[c*n+o]=s*a;let l=Math.max(0,c-i)*n+o,u=Math.min(r-1,c+i+1)*n+o;s+=e[u]-e[l]}}}function Tt(e,t,n,r){if(r<=.05)return e;let i=new Float32Array(e.length),a=e;for(let e of St(r,3)){let r=(e-1)/2;Ct(a,i,t,n,r),wt(i,a,t,n,r)}return a}function Et(e,t,n,r,i,a,o){let s=document.createElement(`canvas`);s.width=n,s.height=r;let c=s.getContext(`2d`,{willReadFrequently:!0}),l=new Float32Array(n*r);if(!c)return l;c.scale(i,i),c.strokeStyle=`#fff`,c.lineCap=`round`,c.lineJoin=`round`,c.lineWidth=t,c.beginPath(),c.moveTo(a-e,o),c.lineTo(a+e,o),c.stroke();let u=c.getImageData(0,0,n,r).data;for(let e=0,t=3;e<l.length;e++,t+=4)l[e]=u[t]/255;return l}function Dt(e,t,n,r,i){let a=0;for(let t of e)a=Math.max(a,(t.stroke/2+3*t.blur)*n);let o=Math.ceil(a)+1,s=2*t+2*o,c=2*o,l=Math.ceil(s*r),u=Math.ceil(c*r),d=new Float32Array(l*u);for(let i of e){let e=Et(t,i.stroke*n,l,u,r,o,o);e=Tt(e,l,u,i.blur*n*r);let a=i.opacity;for(let t=0;t<d.length;t++){let n=e[t]*a;d[t]=d[t]+n*(1-d[t])}}if(i>0){let e=o*r,t=o*r,a=i*n*r;for(let n=0;n<u;n++)for(let r=0;r<l;r++){let i=Math.hypot(r+.5-e,n+.5-t)/a,o;o=i<=.3?1:i<=.65?1-(i-.3)/.35*.75:i<1?.25*(1-(i-.65)/.35):0,d[n*l+r]*=o}}let f=document.createElement(`canvas`);f.width=l,f.height=u;let p=f.getContext(`2d`),m=new Uint8ClampedArray(l*u);for(let e=0;e<d.length;e++)m[e]=Math.round(Math.min(1,d[e])*255);if(p){let e=p.createImageData(l,u),t=e.data;for(let e=0,n=0;e<d.length;e++,n+=4)t[n]=255,t[n+1]=255,t[n+2]=255,t[n+3]=m[e];p.putImageData(e,0,0)}return{canvas:f,alpha:m,w:s,h:c,ax:o,ay:o}}function Ot(){return[U.haloStrokeXl,U.haloStrokeLg,U.haloStrokeMd,U.haloStrokeSm,U.haloBlurXl,U.haloBlurLg,U.haloBlurMd,U.haloBlurSm,U.haloOpXl,U.haloOpLg,U.haloOpMd,U.haloOpSm,U.extraStrokeOuter,U.extraStrokeCore,U.extraBlurOuter,U.extraBlurCore,U.extraFadeR,U.extraOpOuter].join(`,`)}function kt(e,t,n){let r=`h|${e.toFixed(2)}|${t}|${n}|${Ot()}`,i=xt.get(r);return i||(i=Dt([{stroke:U.haloStrokeXl,blur:U.haloBlurXl,opacity:U.haloOpXl},{stroke:U.haloStrokeLg,blur:U.haloBlurLg,opacity:U.haloOpLg},{stroke:U.haloStrokeMd,blur:U.haloBlurMd,opacity:U.haloOpMd},{stroke:U.haloStrokeSm,blur:U.haloBlurSm,opacity:U.haloOpSm}],e,t,n,0),xt.set(r,i)),i}function At(e,t,n){let r=`e|${e.toFixed(2)}|${t}|${n}|${Ot()}`,i=xt.get(r);return i||(i=Dt([{stroke:U.extraStrokeOuter,blur:U.extraBlurOuter,opacity:U.extraOpOuter},{stroke:U.extraStrokeCore,blur:U.extraBlurCore,opacity:1}],e,t,n,U.extraFadeR),xt.set(r,i)),i}function jt(e,t,n,r,i){let a=t<<16|n<<8|r;if(i.canvas&&i.tint===a&&i.src===e)return i.canvas;let o=i.canvas,s=i.img;o&&s&&i.src===e||(o=document.createElement(`canvas`),o.width=e.canvas.width,o.height=e.canvas.height,s=o.getContext(`2d`)?.createImageData(o.width,o.height)??null);let c=o.getContext(`2d`);if(c&&s){let i=s.data,a=e.alpha;for(let e=0,o=0;e<a.length;e++,o+=4)i[o]=t,i[o+1]=n,i[o+2]=r,i[o+3]=a[e];c.putImageData(s,0,0)}return i.canvas=o,i.img=s,i.tint=a,i.src=e,o}function Mt(e,t,n){let r=Math.max(0,Math.min(n,Math.min(e,t)/2));return 2*Math.max(0,e-2*r)+2*Math.max(0,t-2*r)+2*Math.PI*r}function Nt(e,t,n,r){return r===`circle`?2*Math.PI*Math.max(0,Math.min(n,Math.min(e,t)/2)):Mt(e,t,n)}function Pt(e,t,n,r,i,a,o,s){let c=s||{x:0,y:0},l=Math.max(0,Math.min(r,Math.min(t,n)/2));if(o===`circle`){let r=2*Math.PI*l;if(r<=1e-4)return c.x=t*.5,c.y=n*.5,c;e=(e%r+r)%r;let o=-Math.PI/2+e/r*Math.PI*2,s=Math.max(0,l-i+a);return c.x=t*.5+s*Math.cos(o),c.y=n*.5+s*Math.sin(o),c}let u=Math.max(0,t-2*l),d=Math.max(0,n-2*l),f=Math.PI*l/2,p=2*(u+d)+4*f;e=(e%p+p)%p;let m=Math.max(0,l-i+a),h=e;if(h<u)return c.x=l+h,c.y=i-a,c;if(h-=u,h<f){let e=-Math.PI/2+(f>0?h/f:0)*(Math.PI/2);return c.x=t-l+m*Math.cos(e),c.y=l+m*Math.sin(e),c}if(h-=f,h<d)return c.x=t-i+a,c.y=l+h,c;if(h-=d,h<f){let e=(f>0?h/f:0)*(Math.PI/2);return c.x=t-l+m*Math.cos(e),c.y=n-l+m*Math.sin(e),c}if(h-=f,h<u)return c.x=t-l-h,c.y=n-i+a,c;if(h-=u,h<f){let e=Math.PI/2+(f>0?h/f:0)*(Math.PI/2);return c.x=l+m*Math.cos(e),c.y=n-l+m*Math.sin(e),c}if(h-=f,h<d)return c.x=i-a,c.y=n-l-h,c;h-=d;let g=Math.PI+(f>0?h/f:0)*(Math.PI/2);return c.x=l+m*Math.cos(g),c.y=l+m*Math.sin(g),c}function Ft(e,t,n,r,i,a){let o=Math.max(0,Math.min(i,Math.min(n,r)/2));if(a===`circle`){let i=2*Math.PI*o;return i<=1e-4?0:((Math.atan2(t-r/2,e-n/2)+Math.PI/2)/(2*Math.PI)*i%i+i)%i}let s=Math.max(0,n-2*o),c=Math.max(0,r-2*o),l=Math.PI*o/2,u=Math.PI/2,d=s,f=d+l,p=f+c,m=p+l,h=m+s,g=h+l,_=g+c,v=e>=o&&e<=n-o,y=t>=o&&t<=r-o;if(v&&y){let i=e,a=n-e,s=t,c=r-t,l=Math.min(i,a,s,c);return l===s?e-o:l===a?f+(t-o):l===c?m+(n-o-e):g+(r-o-t)}return v?t<r/2?e-o:m+(n-o-e):y?e>n/2?f+(t-o):g+(r-o-t):e>n/2&&t<r/2?d+(Math.atan2(t-o,e-(n-o))+u)/u*l:e>n/2?p+Math.atan2(t-(r-o),e-(n-o))/u*l:t>r/2?h+(Math.atan2(t-(r-o),e-o)-u)/u*l:_+(Math.atan2(t-o,e-o)+Math.PI)/u*l}var It={x:0,y:0},Lt={x:0,y:0};function Rt(e,t,n,r,i,a){let o=.1;return Pt(e-o,t,n,r,i,0,a,It),Pt(e+o,t,n,r,i,0,a,Lt),Math.atan2(Lt.y-It.y,Lt.x-It.x)}function zt(e,t,n){if(e===t)return n<e?0:1;let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function Bt(e){if(e.samplePoints&&e.samplePoints.length>0)return e.samplePoints.map((e,t)=>({x:e.x,y:e.y,arc:t}));let t=Nt(e.width,e.height,e.cornerRadius,e.kind),n=U.inset*(e.scale??1),r=[];for(let i=0;i<16;i++){let a=i/16*t,o=Pt(a,e.width,e.height,e.cornerRadius,n,0,e.kind);r.push({x:o.x,y:o.y,arc:a})}return r}var Vt=.05,Ht=1e3/15*120,Ut=1e3/15,Wt=2e3,Gt=400,Kt=2.625,qt=1.008,Jt=.31,Yt=140,Xt=40,Zt=20,Qt=34,$t=.25,en=.01,tn=.004,nn=.5,rn=3.5,X={x:0,y:0};function an(e,t){let{width:n,height:r}=t,i=t.scale??1,a=Math.min(3,typeof window<`u`&&window.devicePixelRatio||1),o=Nt(n,r,t.cornerRadius,t.kind)/Mt(Yt,Xt,Zt),s=Math.max(1,U.haloHalfLen*o),c=Math.max(.6,U.extraHalfLen*o),l=kt(s,i,a),u=At(c,i,a),d=Math.ceil(Math.max(l.ay,u.ay)+U.extraOutward*o*i+2),f=document.createElement(`div`);f.className=`metal-fx-glow-svg`,f.setAttribute(`aria-hidden`,`true`);let p=document.createElement(`div`);p.className=`metal-fx-glow-env`,p.style.cssText=`position:absolute;inset:0;pointer-events:none;opacity:0`;let m=document.createElement(`canvas`);m.className=`metal-fx-glow-canvas`;let h=n+2*d,g=r+2*d;m.width=Math.ceil(h*a),m.height=Math.ceil(g*a),m.style.cssText=`position:absolute;left:${-d}px;top:${-d}px;width:${h}px;height:${g}px;pointer-events:none`,p.appendChild(m),f.appendChild(p),e.appendChild(f);let _=m.getContext(`2d`,{willReadFrequently:!!t.maskDataUrl});if(!_)throw Error(`metal-fx: glow canvas 2D context unavailable`);let v={wrap:f,env:p,canvas:m,ctx:_,surroundPath:null,bandPath:null,maskAlpha:null,maskReady:!1,margin:d,dpr:a,halo:l,extra:u,haloTint:{canvas:null,img:null,tint:-1,src:null},extraTint:{canvas:null,img:null,tint:-1,src:null},mO:L(),mI:L(),maskSum:NaN,maskDeformed:!1,deform:null,width:n,height:r,cornerRadius:t.cornerRadius,kind:t.kind,scale:i,perim:Bt(t),pointMode:!!(t.samplePoints&&t.samplePoints.length>0),currentIdx:0,appearedAt:0,glowOpacity:0,relocTween:null,relocNextIdx:-1,relocMul:0,envClock:0,cursorMode:!1,cursorArc:0,cursorTargetArc:0,lastTickMs:0,wanderS:0,wanderTargetS:0,wanderFrames:0,tintFrom:{r:255,g:255,b:255},tintTarget:{r:255,g:255,b:255},tintTween:null,tintHoldUntil:0,dX:NaN,dY:NaN,dAng:NaN,dEX:NaN,dEY:NaN,dHOp:NaN,dEOp:NaN,dHaloTint:``,dExtraTint:``,dirty:!0,dEnv:-1};if(t.maskDataUrl){let e=new Image;e.onload=()=>{let t=document.createElement(`canvas`);t.width=m.width,t.height=m.height;let i=t.getContext(`2d`,{willReadFrequently:!0});if(!i)return;i.scale(a,a),i.drawImage(e,d,d,n,r);let o=i.getImageData(0,0,t.width,t.height).data,s=t.width*t.height,c=new Float32Array(s);for(let e=0,t=3;e<s;e++,t+=4)c[e]=o[t]/255;let l=Tt(Float32Array.from(c),t.width,t.height,rn*a),u=0;for(let e=0;e<s;e++)l[e]>u&&(u=l[e]);let f=u>0?nn/u:0,p=new Uint8ClampedArray(s);for(let e=0;e<s;e++)p[e]=Math.round(Math.max(c[e],l[e]*f)*255);v.maskAlpha=p,v.maskReady=!0,v.dirty=!0},e.src=t.maskDataUrl}else on(v,null);return v}function on(e,t){if(e.pointMode)return;let{margin:n,width:r,height:i,cornerRadius:a}=e,o=e.kind===`circle`?2:1;R(0,0,r,i,a,t,e.mO),R(o,o,r-2*o,i-2*o,Math.max(0,a-o),t,e.mI);let s=new Path2D;sn(s,e.mO,n);let c=new Path2D;sn(c,e.mO,n),sn(c,e.mI,n);let l=new Path2D;l.rect(0,0,r+2*n,i+2*n),l.addPath(s),e.surroundPath=l,e.bandPath=c,e.maskReady=!0}function sn(e,t,n){let r=t.xy;for(let i=0;i<t.n;i++){let t=r[i*2]+n,a=r[i*2+1]+n;i===0?e.moveTo(t,a):e.lineTo(t,a)}e.closePath()}function cn(e,t){if(!e)return 0;R(0,0,t.width,t.height,t.cornerRadius,e,t.mO);let n=0,r=t.mO.xy;for(let e=0;e<t.mO.n;e+=4)n+=r[e*2]*1.37+r[e*2+1];return n}function ln(e,t){if(e.deform=t,!e.pointMode){if(t){let n=cn(t,e);n!==e.maskSum&&(e.maskSum=n,on(e,t),e.maskDeformed=!0,e.dirty=!0)}else e.maskDeformed&&(e.maskSum=NaN,on(e,null),e.maskDeformed=!1,e.dirty=!0)}}function un(e,t,n,r,o=`dark`){let{width:s,height:c,cornerRadius:l,perim:u}=e;if(u.length===0)return!1;let d=-1,f=e.currentIdx,p=0;for(let n=0;n<u.length;n++){let r=u[n],i=j(t,r.x,r.y,2);i>d&&(d=i,f=n),n===e.currentIdx&&(p=i)}let m=e.appearedAt>0&&n-e.appearedAt<U.minDwellMs,h=U.baseOp+(U.peakOp-U.baseOp)*zt(U.lumLo,U.lumHi,p),g=!m&&d-p>Vt,_=t.cursorLight,v=Ee.enabled&&Ee.catchLight&&!e.pointMode&&!!_&&_.w>.02,y=Nt(s,c,l,e.kind);v&&(e.cursorTargetArc=Ft(_.x,_.y,s,c,l,e.kind));let b=v?Math.min(1,U.peakOp*Ee.catchGain*_.w):0,x=e.lastTickMs>0?Math.min(200,Math.max(.5,n-e.lastTickMs)):Ut;e.lastTickMs=n,e.envClock+=Math.min(x,Qt);let S=e=>1-(1-e)**(x/Ut),C=Math.max(1,U.relocFadeMs),w=Math.max(1,U.relocFadeOutMs),T=()=>{e.appearedAt=n,e.wanderS=0,e.wanderTargetS=0,e.wanderFrames=0,e.relocTween=xe(0,1,C,be.smoothstep),Se(e.relocTween,e.envClock)},E=t=>{e.relocNextIdx=t,e.relocTween=xe(1,0,w,be.smoothstep),Se(e.relocTween,e.envClock)};if(e.relocTween?.done&&e.relocTween.to===0){let n=e.relocNextIdx;if(n===-2&&!v&&(n=-3),n===-3)e.cursorMode=!1,e.appearedAt=0,e.relocTween=null;else if(n===-2)e.cursorMode=!0,e.cursorArc=e.cursorTargetArc,e.glowOpacity=b,T();else{e.currentIdx=n;let r=u[e.currentIdx],i=j(t,r.x,r.y,2);e.glowOpacity=U.baseOp+(U.peakOp-U.baseOp)*zt(U.lumLo,U.lumHi,i),T()}}if((!e.relocTween||e.relocTween.done)&&(e.appearedAt===0?(v?(e.cursorMode=!0,e.cursorArc=e.cursorTargetArc,e.glowOpacity=b):(e.cursorMode=!1,e.currentIdx=f,e.glowOpacity=h),T()):v===e.cursorMode?!e.cursorMode&&g&&E(f):E(v?-2:-3)),e.cursorMode){v&&(e.glowOpacity=b);let t=1-(1-Math.max(.01,Math.min(1,Ee.catchFollow)))**(x/(1e3/60)),n=e.cursorTargetArc-e.cursorArc;n=(n%y+y*1.5)%y-y/2,e.cursorArc+=n*t}else e.glowOpacity+=(h-e.glowOpacity)*S(U.fadeRate);e.glowOpacity=Math.max(0,Math.min(1,e.glowOpacity)),e.relocMul=e.relocTween?Ce(e.relocTween,e.envClock):1;let D=Nt(s,c,l,e.kind)/Mt(Yt,Xt,Zt),O=U.wanderRange*D;e.wanderFrames+=x,e.wanderFrames>=Ht&&(e.wanderTargetS=(Math.random()*2-1)*O,e.wanderFrames=0),e.wanderS+=(e.wanderTargetS-e.wanderS)*S(U.wanderLerp);let k,A,P,F,I;if(e.pointMode){let t=u[e.currentIdx];k=t.x+e.wanderS,A=t.y,P=0,F=k,I=A}else{let t=e.cursorMode?e.cursorArc:u[e.currentIdx].arc+e.wanderS,n=U.inset*e.scale;Pt(t,s,c,l,n,0,e.kind,X),k=X.x,A=X.y,P=Rt(t,s,c,l,n,e.kind),Pt(t,s,c,l,n,U.extraOutward*D*e.scale,e.kind,X),F=X.x,I=X.y}e.deform&&(e.deform(k,A,X),k=X.x,A=X.y,e.deform(F,I,X),F=X.x,I=X.y);let L=o===`light`,R=L?N(t,k,A,2):M(t,k,A,2);e.tintTween?e.tintTween.done&&(L?(e.tintFrom={r:e.tintFrom.r+(e.tintTarget.r-e.tintFrom.r)*e.tintTween.val,g:e.tintFrom.g+(e.tintTarget.g-e.tintFrom.g)*e.tintTween.val,b:e.tintFrom.b+(e.tintTarget.b-e.tintFrom.b)*e.tintTween.val},e.tintTarget={...R},e.tintTween=xe(0,1,Gt),Se(e.tintTween,n)):n>=e.tintHoldUntil&&(e.tintFrom={...e.tintTarget},e.tintTarget={...R},e.tintTween=xe(0,1,Gt),Se(e.tintTween,n),e.tintHoldUntil=n+Wt)):(e.tintFrom={...R},e.tintTarget={...R},e.tintTween=xe(0,1,Gt),Se(e.tintTween,n),e.tintHoldUntil=L?0:n+Wt),Ce(e.tintTween,n);let z=e.tintTween.val,B,ee,te;if(L)B=Math.round(e.tintFrom.r+(e.tintTarget.r-e.tintFrom.r)*z),ee=Math.round(e.tintFrom.g+(e.tintTarget.g-e.tintFrom.g)*z),te=Math.round(e.tintFrom.b+(e.tintTarget.b-e.tintFrom.b)*z);else{let t=e.tintFrom.r+(e.tintTarget.r-e.tintFrom.r)*z,n=e.tintFrom.g+(e.tintTarget.g-e.tintFrom.g)*z,r=e.tintFrom.b+(e.tintTarget.b-e.tintFrom.b)*z,i=Math.max(t,n,r)||1;B=Math.round(t/i*255),ee=Math.round(n/i*255),te=Math.round(r/i*255)}let V=`rgb(${B},${ee},${te})`,ne=`#ffffff`;if(L){let e=i(B,ee,te),[t,n,r]=a(e[0],Math.min(1,e[1]*Kt),Math.max(Jt,e[2]*qt));ne=`rgb(${t},${n},${r})`}let re=Math.max(0,Math.min(1,r))*(e.pointMode?U.pointGain:1),ie=Math.min(1,e.glowOpacity*U.haloOpMul*re),ae=Math.min(1,e.glowOpacity*U.extraIntensity*re);if(Math.abs(e.relocMul-e.dEnv)>.002){let t=e.relocMul>=.998&&e.dEnv<.998;e.dEnv=e.relocMul,e.env.style.opacity=e.relocMul.toFixed(3),t&&(e.dirty=!0)}let H=!(!e.relocTween||e.relocTween.done)||e.cursorMode,oe=!(Math.abs(k-e.dX)<$t&&Math.abs(A-e.dY)<$t&&Math.abs(P-e.dAng)<en&&Math.abs(F-e.dEX)<$t&&Math.abs(I-e.dEY)<$t),se=!(Math.abs(ie-e.dHOp)<tn&&Math.abs(ae-e.dEOp)<tn),ce=V!==e.dHaloTint||ne!==e.dExtraTint;return(e.dirty||oe||se||ce)&&(e.dX=k,e.dY=A,e.dAng=P,e.dEX=F,e.dEY=I,e.dHOp=ie,e.dEOp=ae,e.dHaloTint=V,e.dExtraTint=ne,e.dirty=!1,dn(e,k,A,P,F,I,ie,ae,V,ne)),H}function dn(e,t,n,r,i,a,o,s,c,l){let{ctx:u,canvas:d,dpr:f,margin:p}=e;if(u.setTransform(1,0,0,1,0,0),u.globalCompositeOperation=`source-over`,u.globalAlpha=1,u.clearRect(0,0,d.width,d.height),o<=.002&&s<=.002||!e.maskReady)return;let m=o>.002?jt(e.halo,...pn(c),e.haloTint):null,h=s>.002?l===`#ffffff`?e.extra.canvas:jt(e.extra,...pn(l),e.extraTint):null,g=c=>{m&&(u.save(),u.translate(t+p,n+p),u.rotate(r),u.globalAlpha=o*c,u.drawImage(m,-e.halo.ax,-e.halo.ay,e.halo.w,e.halo.h),u.restore()),h&&(u.save(),u.translate(i+p,a+p),u.rotate(r),u.globalAlpha=s*c,u.drawImage(h,-e.extra.ax,-e.extra.ay,e.extra.w,e.extra.h),u.restore())};if(!e.pointMode&&e.surroundPath&&e.bandPath){u.save(),u.scale(f,f),u.clip(e.surroundPath,`evenodd`),g(.5),u.restore(),u.save(),u.scale(f,f),u.clip(e.bandPath,`evenodd`),g(1),u.restore();return}u.save(),u.scale(f,f),g(1),u.restore();let _=e.maskAlpha;if(!_)return;let v=u.getImageData(0,0,d.width,d.height),y=v.data;for(let e=0,t=3;e<_.length;e++,t+=4){let n=_[e];n!==255&&(n===0?y[t]=0:y[t]=(y[t]*n+127)/255)}u.putImageData(v,0,0)}var fn=[255,255,255];function pn(e){if(e[0]===`#`)return fn[0]=parseInt(e.slice(1,3),16),fn[1]=parseInt(e.slice(3,5),16),fn[2]=parseInt(e.slice(5,7),16),fn;let t=4,n=0,r=0;for(;t<e.length&&r<3;){let i=e.charCodeAt(t++);i>=48&&i<=57?n=n*10+(i-48):(i===44||i===41)&&(fn[r++]=n,n=0)}return fn}function mn(e,t){e.pointMode===t.pointMode&&(t.currentIdx=Math.min(e.currentIdx,Math.max(0,t.perim.length-1)),t.appearedAt=e.appearedAt,t.glowOpacity=e.glowOpacity,t.relocTween=e.relocTween,t.relocNextIdx=e.relocNextIdx,t.relocMul=e.relocMul,t.envClock=e.envClock,t.cursorMode=e.cursorMode,t.cursorArc=e.cursorArc,t.cursorTargetArc=e.cursorTargetArc,t.lastTickMs=e.lastTickMs,t.wanderS=e.wanderS,t.wanderTargetS=e.wanderTargetS,t.wanderFrames=e.wanderFrames,t.tintFrom=e.tintFrom,t.tintTarget=e.tintTarget,t.tintTween=e.tintTween,t.tintHoldUntil=e.tintHoldUntil,t.dEnv=e.relocMul,t.env.style.opacity=e.relocMul.toFixed(3))}var hn=Object.freeze({offsetY:1,blur:.5,alpha:.9,color:`#ffffff`});function gn(e,t,n){let r=Math.min(3,typeof window<`u`&&window.devicePixelRatio||1),i=Math.ceil(3*n.blur+Math.abs(n.offsetY)+1),a=t.width+2*i,o=t.height+2*i,s=document.createElement(`canvas`);s.className=`metal-fx-rim-canvas`,s.setAttribute(`aria-hidden`,`true`),s.width=Math.ceil(a*r),s.height=Math.ceil(o*r),s.style.cssText=`position:absolute;left:${-i}px;top:${-i}px;width:${a}px;height:${o}px;pointer-events:none`;let c=s.getContext(`2d`),l=document.createElement(`canvas`);l.width=s.width,l.height=s.height;let u=l.getContext(`2d`,{willReadFrequently:!0});if(!c||!u)return null;e.appendChild(s);let d={canvas:s,ctx:c,scratch:l,sctx:u,width:t.width,height:t.height,cornerRadius:t.cornerRadius,kind:t.kind,ring:t.ring,margin:i,dpr:r,opts:n,mO:L(),mI:L(),sum:NaN};return vn(d,null,!0),d}function _n(e,t,n){let r=t.xy;for(let i=0;i<t.n;i++){let t=r[i*2]+n,a=r[i*2+1]+n;i===0?e.moveTo(t,a):e.lineTo(t,a)}e.closePath()}function vn(e,t,n=!1){let{width:r,height:i,cornerRadius:a,ring:o,margin:s,dpr:c}=e;R(0,0,r,i,a,t,e.mO),R(o,o,r-2*o,i-2*o,Math.max(0,a-o),t,e.mI);let l=0,u=e.mO.xy;for(let t=0;t<e.mO.n;t+=4)l+=u[t*2]*1.37+u[t*2+1];if(!n&&l===e.sum)return;e.sum=l;let{sctx:d,scratch:f,ctx:p,canvas:m,opts:h}=e,g=f.width,_=f.height;d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,g,_),d.scale(c,c),d.fillStyle=`#fff`,d.beginPath(),_n(d,e.mO,s),_n(d,e.mI,s),d.fill(`evenodd`);let v=d.getImageData(0,0,g,_).data,y=g*_,b=new Float32Array(y);for(let e=0,t=3;e<y;e++,t+=4)b[e]=v[t]/255;let x=Math.round(h.offsetY*c)*g,S=new Float32Array(y);if(x>=0)for(let e=0;e<y;e++)S[e]=Math.max(0,b[e]-(e>=x?b[e-x]:0));else for(let e=0;e<y;e++)S[e]=Math.max(0,b[e]-(e-x<y?b[e-x]:0));let C=Tt(S,g,_,h.blur*c),w=parseInt(h.color.slice(1,3),16),T=parseInt(h.color.slice(3,5),16),E=parseInt(h.color.slice(5,7),16),D=p.createImageData(g,_),O=D.data;for(let e=0,t=0;e<y;e++,t+=4)O[t]=w,O[t+1]=T,O[t+2]=E,O[t+3]=Math.round(Math.min(1,C[e]*b[e]*h.alpha)*255);p.setTransform(1,0,0,1,0,0),p.putImageData(D,0,0)}function yn(e){e&&e.canvas.remove()}var bn=.55,xn=.85,Sn=1.3,Cn=3.6,wn=.7,Tn=.52,En=.044,Dn=2.535,On=.7,kn=.5,An=new Set([`INPUT`,`TEXTAREA`,`SELECT`,`OPTION`]);function jn(e,t){let n=Math.max(e.left-t.right,t.left-e.right,0),r=Math.max(e.top-t.bottom,t.top-e.bottom,0);return Math.sqrt(n*n+r*r)}function Mn(e,t,n,r){return!(Math.min(e.bottom,t.bottom)-Math.max(e.top,t.top)<n||Math.max(e.left-t.right,t.left-e.right,0)>r)}function Nn(e,t,n,r){return Math.min(e.right,t.right)-Math.max(e.left,t.left)<n?!1:Math.max(e.top-t.bottom,t.top-e.bottom,0)<=r}function Pn(e,t,n,r,i,a){let o=Math.max(0,Math.min(a,r*.5,i*.5)),s=e.roundRect;typeof s==`function`?s.call(e,t,n,r,i,o):(e.moveTo(t+o,n),e.lineTo(t+r-o,n),e.quadraticCurveTo(t+r,n,t+r,n+o),e.lineTo(t+r,n+i-o),e.quadraticCurveTo(t+r,n+i,t+r-o,n+i),e.lineTo(t+o,n+i),e.quadraticCurveTo(t,n+i,t,n+i-o),e.lineTo(t,n+o),e.quadraticCurveTo(t,n,t+o,n))}function Fn(e,t,n,r,i){!i.flipX&&!i.flipY?e.drawImage(t,i.sx??0,i.sy??0,n,r,i.x,i.y,i.w,i.h):(e.save(),i.flipX&&(e.translate(i.x+i.w,0),e.scale(-1,1)),i.flipY&&(e.translate(0,i.y+i.h),e.scale(1,-1)),e.drawImage(t,i.sx??0,i.sy??0,n,r,i.flipX?0:i.x,i.flipY?0:i.y,i.w,i.h),e.restore())}function In(e,t,n,r,i,a,o){r<=2*o||i<=2*o?(e.beginPath(),Pn(e,t,n,r,i,a),e.clip()):(e.beginPath(),Pn(e,t,n,r,i,a),Pn(e,t+o,n+o,r-2*o,i-2*o,Math.max(0,a-o)),e.clip(`evenodd`))}function Ln(e,t,n,r,i,a,o,s,c,l,u,d){let f=d??Math.max(1,Math.round(24*u)),p=Math.max(0,o),m=!0;for(let o=0;o<3&&p>1e-4;o++){let o=Math.min(1,p);e.save(),In(e,l.x,l.y,l.w,l.h,l.r,f),e.globalCompositeOperation=m?`source-over`:`lighter`,m=!1,e.globalAlpha=o,Fn(e,t,n,r,c),e.globalAlpha=1,e.globalCompositeOperation=`destination-in`,e.fillStyle=s,e.fillRect(0,0,i,a),e.restore(),p-=o}}function Rn(e,t,n,r,i,a,o){let s=o|0;s<1||r<=2*s||i<=2*s?(e.beginPath(),Pn(e,t,n,r,i,a),e.clip()):(e.beginPath(),Pn(e,t,n,r,i,a),Pn(e,t+s,n+s,r-2*s,i-2*s,Math.max(0,a-s)),e.clip(`evenodd`))}function zn(e,t,n,r,i,a,o,s,c,l,u,d){let f=s*u,p=!0;for(let s=0;s<3&&f>1e-4;s++){let s=Math.min(1,f);e.save(),Rn(e,o.x,o.y,o.w,o.h,o.r,c),e.globalCompositeOperation=p?`source-over`:`lighter`,p=!1,e.globalAlpha=s,Fn(e,t,n,r,d),e.globalAlpha=1,e.globalCompositeOperation=`destination-in`,e.fillStyle=l,e.fillRect(0,0,i,a),e.restore(),f-=s}}function Bn(e,t,n,r,i,a,o,s){let c=e.createLinearGradient(r,i,a,o);c.addColorStop(0,`rgba(255,255,255,${s.toFixed(3)})`),c.addColorStop(.5,`rgba(255,255,255,${(s*.45).toFixed(3)})`),c.addColorStop(1,`rgba(255,255,255,0)`),e.save(),Rn(e,t.x,t.y,t.w,t.h,t.r,n),e.globalCompositeOperation=`lighter`,e.lineWidth=n*2,e.strokeStyle=c,e.beginPath(),Pn(e,t.x,t.y,t.w,t.h,t.r),e.stroke(),e.restore()}function Vn(e){let t=getComputedStyle(e),n=[parseFloat(t.borderTopLeftRadius)||0,parseFloat(t.borderTopRightRadius)||0,parseFloat(t.borderBottomRightRadius)||0,parseFloat(t.borderBottomLeftRadius)||0].filter(e=>e>0);return n.length?Math.min.apply(null,n):0}function Hn(e){let t=getComputedStyle(e),n=Math.max(parseFloat(t.borderTopWidth)||0,parseFloat(t.borderRightWidth)||0,parseFloat(t.borderBottomWidth)||0,parseFloat(t.borderLeftWidth)||0),r=0,i=0,a=t.boxShadow;if(a&&a!==`none`){let e=a.replace(/rgba?\([^)]*\)/g,e=>e.replace(/,/g,`\0`)).split(/,\s*/),t=1/0,n=1/0;for(let r of e){let e=r.match(/-?\d+(?:\.\d+)?px/g);if(!e||e.length<4)continue;let i=parseFloat(e[3]);i>0&&(/\binset\b/.test(r)?i<t&&(t=i):i<n&&(n=i))}Number.isFinite(t)&&(r=t),Number.isFinite(n)&&(i=n)}return{width:Math.max(n,r,i)||1,outerCssPx:Math.max(n,i)}}function Un(e){e.cornerRadius=Vn(e.el);let t=Hn(e.el);e.hairlineWidth=t.width,e.hairlineOuterCssPx=t.outerCssPx}function Wn(e){typeof ResizeObserver<`u`&&(e.resizeObserver=new ResizeObserver(()=>Un(e)),e.resizeObserver.observe(e.el)),typeof MutationObserver<`u`&&(e.mutationObserver=new MutationObserver(()=>Un(e)),e.mutationObserver.observe(e.el,{attributes:!0,attributeFilter:[`style`,`class`]}))}function Gn(e){e.resizeObserver?.disconnect(),e.resizeObserver=null,e.mutationObserver?.disconnect(),e.mutationObserver=null}var Kn=new Set,qn={...Object.freeze({enabled:!0,radius:11.5,strength:.57,penumbra:.55,falloff:.21,edgeFade:.7,softness:.24,repaintMs:36})},Jn=null,Yn=0,Xn=0,Zn=!1;function Qn(){Yn===0&&typeof requestAnimationFrame<`u`&&(Yn=requestAnimationFrame(e=>{Yn=0,e-Xn<qn.repaintMs?Qn():(Xn=e,fr())}))}var $n=!1;function er(e,t){let n=qn.radius;for(let r of Kn){let i=r.anchorEl.getBoundingClientRect(),a=r.el.getBoundingClientRect(),o=Math.min(i.left,a.left)-n,s=Math.max(i.right,a.right)+n,c=Math.min(i.top,a.top)-n,l=Math.max(i.bottom,a.bottom)+n;if(e>=o&&e<=s&&t>=c&&t<=l)return!0}return!1}function tr(e){if(Jn={x:e.clientX,y:e.clientY},!qn.enabled)return;let t=er(e.clientX,e.clientY);(t||$n)&&Qn(),$n=t}function nr(){Jn=null,$n&&Qn(),$n=!1}function rr(e){typeof document<`u`&&e!==Zn&&(Zn=e,e?(document.addEventListener(`pointermove`,tr,{passive:!0}),document.addEventListener(`pointerleave`,nr),window.addEventListener(`blur`,nr)):(document.removeEventListener(`pointermove`,tr),document.removeEventListener(`pointerleave`,nr),window.removeEventListener(`blur`,nr),Jn=null))}function ir(e,t,n,r,i,a,o,s,c){if(!Jn)return;let l=qn;if(!l.enabled||l.strength<=0)return;let u=l.radius,d,f,p,m,h,g;if(i){let e=n.left>=r.right;d=e?r.right:n.right,f=e?n.left:r.left,p=Jn.x,m=Jn.y,h=Math.max(n.top,r.top),g=Math.min(n.bottom,r.bottom)}else{let e=n.top>=r.bottom;d=e?r.bottom:n.bottom,f=e?n.top:r.top,p=Jn.y,m=Jn.x,h=Math.max(n.left,r.left),g=Math.min(n.right,r.right)}let _=Math.min(d,f),v=Math.max(d,f),y=Math.max(1,v-_);if(p<_-u||p>v+u||m<h-u||m>g+u)return;let b=Math.max(0,Math.min(1,Math.abs(p-d)/y)),x=Math.max(.5,u*l.edgeFade),S=Math.min(1,Math.min(p-(_-u),v+u-p)/x),C=Math.min(1,Math.min(m-(h-u),g+u-m)/x),w=l.strength*(1-l.falloff*b)*S*C;if(w<=.001)return;let T=u*c*(1+l.penumbra*b),E=i?(m-r.top+s)*c:(m-r.left+s)*c,D=Math.max(0,Math.min(.5,(1-l.softness)*.5)),O=Math.max(.001,.5-D),k=i?o:a,A=Math.max(0,Math.floor(E-T)),j=Math.min(k,Math.ceil(E+T));if(j<=A)return;let M=new Float32Array(j-A);for(let e=A;e<j;e++){let t=(e+.5-(E-T))/(2*T),n=t<O?t/O:t>1-O?(1-t)/O:1;M[e-A]=1-w*Math.max(0,Math.min(1,n))}for(let n of[e,t]){let e=i?0:A,t=i?A:0,r=i?a:j-A,s=i?j-A:o,c=n.getImageData(e,t,r,s),l=c.data;if(i)for(let e=0;e<s;e++){let t=M[e];if(!(t>=.999))for(let n=e*r*4+3,i=(e+1)*r*4;n<i;n+=4)l[n]=l[n]*t}else for(let e=0;e<s;e++)for(let t=0;t<r;t++){let n=M[t];if(n>=.999)continue;let i=(e*r+t)*4+3;l[i]=l[i]*n}n.putImageData(c,e,t)}}var Z=null,ar=null,or=null,sr=null;function cr(e,t){return Z||(Z=document.createElement(`canvas`),ar=document.createElement(`canvas`),or=Z.getContext(`2d`,{alpha:!0}),sr=ar.getContext(`2d`,{alpha:!0})),!or||!sr||!Z||!ar?!1:(Z.width!==e&&(Z.width=e,ar.width=e),Z.height!==t&&(Z.height=t,ar.height=t),or.setTransform(1,0,0,1,0,0),sr.setTransform(1,0,0,1,0,0),or.globalCompositeOperation=`source-over`,sr.globalCompositeOperation=`source-over`,or.clearRect(0,0,e,t),sr.clearRect(0,0,e,t),!0)}function lr(e,t,n,r=1){if(typeof document>`u`||An.has(e.tagName))return null;for(let t of Kn)if(t.el===e)return t.strength=r,t;let i=document.createElement(`div`);i.setAttribute(`data-metal-fx-reflection`,``),i.setAttribute(`aria-hidden`,`true`);let a=document.createElement(`canvas`);a.className=`metal-fx-reflection-canvas`;let o=a.getContext(`2d`,{alpha:!0,willReadFrequently:!0});if(!o)return null;let s=document.createElement(`canvas`);s.className=`metal-fx-reflection-stroke-canvas`;let c=s.getContext(`2d`,{alpha:!0,willReadFrequently:!0});if(!c)return null;i.appendChild(a),i.appendChild(s);let l=getComputedStyle(e),u=!1;l.position===`static`&&(e.style.position=`relative`,u=!0);let d=!1;l.isolation!==`isolate`&&(e.style.isolation=`isolate`,d=!0),e.setAttribute(`data-metal-fx-reflect-host`,``),e.insertBefore(i,e.firstChild);let f=Hn(e),p={el:e,anchor:t,anchorEl:n,strength:r,wrap:i,canvas:a,ctx:o,strokeCanvas:s,strokeCtx:c,cornerRadius:Vn(e),hairlineWidth:f.width,hairlineOuterCssPx:f.outerCssPx,appliedPositionRelative:u,appliedIsolation:d,resizeObserver:null,mutationObserver:null};return Wn(p),Kn.add(p),rr(!0),p}function ur(e){for(let t of Kn)if(t.el===e){Gn(t),t.canvas.width=0,t.canvas.height=0,t.strokeCanvas.width=0,t.strokeCanvas.height=0,t.wrap.parentNode===t.el&&t.el.removeChild(t.wrap),t.el.removeAttribute(`data-metal-fx-reflect-host`),t.appliedPositionRelative&&(t.el.style.position=``),t.appliedIsolation&&(t.el.style.isolation=``),Kn.delete(t),Kn.size===0&&rr(!1);return}}function dr(e,t,n,r,i){if(r<1||i<1)return null;let a=e.getContext(`2d`);if(!a)return null;let o=a.getImageData(t,n,r,i).data,s=r,c=i,l=-1,u=-1;for(let e=0;e<i;e++){let t=e*r;for(let n=0;n<r;n++)o[(t+n)*4+3]>8&&(n<s&&(s=n),n>l&&(l=n),e<c&&(c=e),e>u&&(u=e))}return l<0?null:{x:t+s,y:n+c,w:l-s+1,h:u-c+1}}function fr(){if(Kn.size===0)return;let e=typeof window<`u`&&window.devicePixelRatio||1,t=new Map;for(let n of Kn){let r=n.el.getBoundingClientRect(),i=t.get(n.anchorEl);if(i||(i=n.anchorEl.getBoundingClientRect(),t.set(n.anchorEl,i)),r.width<1||r.height<1||i.width<1||i.height<1)continue;let a=n.el.hasAttribute(`data-metal-fx-text`);if(a&&!n.glyphStyled&&(n.canvas.style.filter=`blur(0.4px) saturate(1.35) brightness(1.2)`,n.glyphStyled=!0),!Mn(i,r,1,32)&&!Nn(i,r,1,32)){n.canvas.width!==1&&(n.canvas.width=1,n.canvas.height=1),n.strokeCanvas.width!==1&&(n.strokeCanvas.width=1,n.strokeCanvas.height=1);continue}let o=a&&!!n.anchor.mask;o&&!n.anchor.wantRaw&&(n.anchor.wantRaw=!0),n.anchor.wantRing||(n.anchor.wantRing=!0);let s=!!n.anchor.deform&&!!n.anchor.ringCanvas,c=o&&n.anchor.rawCanvas?n.anchor.rawCanvas:s?n.anchor.ringCanvas:n.anchor.canvas,l=Math.round(n.anchor.overscan*e),u=l,d=l,f=(c.width|0)-2*l,p=(c.height|0)-2*l;if(n.anchor.mask&&!o){let e=dr(c,u,d,f,p);e&&(u=e.x,d=e.y,f=e.w,p=e.h)}if(f<4||p<4)continue;let m=(i.left+i.right)*.5,h=(i.top+i.bottom)*.5,g=(r.left+r.right)*.5,_=(r.top+r.bottom)*.5,v=m-g,y=h-_,b=Math.max(i.left-r.right,r.left-i.right,0)>=Math.max(i.top-r.bottom,r.top-i.bottom,0),x=jn(i,r),S=1-Math.min(1,x/12);S=S*S*(3-2*S);let C=bn+(1-bn)*S,w=Math.min(Cn,C*Sn*wn)*n.strength,T=i.left>=r.left&&i.right<=r.right&&i.top>=r.top&&i.bottom<=r.bottom?[!0,!1]:[b],E=n.anchor.scale??1,D=Math.max(1*E,n.hairlineWidth),O=Math.max(1,Math.round(D*e)),k=Math.max(1,Math.round(Math.max(1*E,n.hairlineWidth)*e)),A=n.hairlineOuterCssPx;n.wrap.style.inset=`${-A}px`,n.wrap.style.borderRadius=`${Math.max(0,n.cornerRadius)}px`;let j=Math.max(1,Math.round((r.width+A*2)*e)),M=Math.max(1,Math.round((r.height+A*2)*e));n.canvas.width!==j&&(n.canvas.width=j),n.canvas.height!==M&&(n.canvas.height=M),n.strokeCanvas.width!==j&&(n.strokeCanvas.width=j),n.strokeCanvas.height!==M&&(n.strokeCanvas.height=M);let N=n.ctx;N.setTransform(1,0,0,1,0,0),N.clearRect(0,0,j,M);let P=n.strokeCtx;P.setTransform(1,0,0,1,0,0),P.clearRect(0,0,j,M);for(let[t,o]of T.entries()){let s=t>0&&cr(j,M),l=s?or:N,m=s?sr:P,h=Math.min((a?18:12)*e,Math.max(j,M)),g,_,b,x;o?(g=v>0?j:0,b=v>0?j-h:h,_=M*.5,x=M*.5):(_=y>0?M:0,x=y>0?M-h:h,g=j*.5,b=j*.5);let S=N.createLinearGradient(g,_,b,x);S.addColorStop(0,`rgba(0,0,0,1)`),S.addColorStop(.5,`rgba(0,0,0,${xn})`),S.addColorStop(1,`rgba(0,0,0,0)`);let C=f/e,T=a?Math.max(1,Math.min(o?j:M,Math.round(o?f:p))):Math.max(1,Math.round(235*Math.max(.1,C/140)*e)),E,D,F,I,L=!1,R=!1;if(o){let t=Math.max(i.top,r.top),n=Math.min(i.bottom,r.bottom);L=!0,E=v>0?j-T:0,D=Math.round((t-r.top+A)*e),F=T,I=Math.max(1,Math.round((n-t)*e))}else{let t=Math.max(i.left,r.left),n=Math.min(i.right,r.right);R=!0,E=Math.round((t-r.left+A)*e),D=y>0?M-T:0,F=Math.max(1,Math.round((n-t)*e)),I=T}let z={x:E,y:D,w:F,h:I,flipX:L,flipY:R,sx:u,sy:d},B={x:0,y:0,w:j,h:M,r:Math.max(0,n.cornerRadius*e)},ee=a?Math.min(1,w*On):Math.min(Cn,w*Dn*On*kn);Ln(l,c,f,p,j,M,ee,S,z,B,e,a?Math.max(j,M):void 0),a||(zn(m,c,f,p,j,M,B,w,O,S,Tn,z),Bn(m,B,k,g,_,b,x,Math.min(.85,En*w))),s&&(N.globalCompositeOperation=`lighter`,N.drawImage(Z,0,0),P.globalCompositeOperation=`lighter`,P.drawImage(ar,0,0))}for(let t of T)ir(N,P,i,r,t,j,M,A,e);N.globalCompositeOperation=`source-over`,P.globalCompositeOperation=`source-over`}}var pr=!1,mr=0;function hr(){pr||(pr=!0,typeof requestAnimationFrame<`u`&&requestAnimationFrame(e=>{pr=!1,e-mr<66||(mr=e,fr())}))}var gr=`metal-fx-styles`,_r=`
.metal-fx-root {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
  overflow: visible;
  background: #272727;
  color: #f8f8f8;
}
.metal-fx-root[data-theme='light'] {
  background: #ffffff;
  color: #1d1d1d;
}

.metal-fx-root::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  box-shadow: inset 0 0 50px 0 rgba(255, 255, 255, 0.02);
}
.metal-fx-root[data-theme='light']::before {
  box-shadow: inset 0 0 50px 0 rgba(0, 0, 0, 0.02);
}

.metal-fx-root::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 4;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.metal-fx-root[data-theme='light']::after {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
}
/* Circle variant gets a thicker outer rim than the button variant. */
.metal-fx-root[data-variant='circle']::after {
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.1);
}
.metal-fx-root[data-theme='light'][data-variant='circle']::after {
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.06);
}

.metal-fx-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
}

/* The inner spacer — defines the inset geometry where the metal ring meets
   the interior (3 px for Button, 1-2 px for Circle) and carries the Circle dark
   hairline ('box-shadow: inset' rules below). Intentionally transparent so
   the wrapper's background propagates through to the punched shader centre,
   giving consumers a single surface tone to override. See "Single-surface
   background" in the file header for the rationale. */
.metal-fx-inner {
  position: absolute;
  inset: 3px;
  border-radius: inherit;
  z-index: 1;
  pointer-events: none;
}

.metal-fx-root[data-variant='button'][data-shape='pill'] .metal-fx-inner {
  border-radius: calc(var(--mfx-radius, 20px) - 3px);
}
.metal-fx-root[data-variant='button'][data-shape='circle'] .metal-fx-inner {
  border-radius: calc(var(--mfx-radius, 16px) - 3px);
}
.metal-fx-root[data-variant='circle'][data-shape='pill'] .metal-fx-inner {
  inset: 0;
  border-radius: var(--mfx-radius, 20px);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.45);
}
.metal-fx-root[data-variant='circle'][data-shape='circle'] .metal-fx-inner {
  inset: 0;
  border-radius: var(--mfx-radius, 16px);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.45);
}
/* Circle-variant hairline alpha — light mode.
   Source-of-truth: index.html L2261-2267. The 0.45-alpha black inset that
   reads as a single-pixel frame against the dark interior is too heavy
   on a #ffffff inner: it ends up looking like a hard 2-px black ring
   against the iridescent shader. Suppressed entirely (alpha 0) — the
   shader's own iridescent rim already defines the silhouette in light
   mode, so an extra dark hairline only competes with it. The rule is
   kept (rather than deleted) as a tunable hook in case a future variant
   wants to re-introduce a soft edge. NOTE: we keep the dark-mode inset
   and border-radius values because — unlike index.html — our renderer
   does NOT overscan the canvas in light mode, so there is no 1-px gap
   between inner element and shader to compensate for. */
.metal-fx-root[data-theme='light'][data-variant='circle'][data-shape='pill'] .metal-fx-inner,
.metal-fx-root[data-theme='light'][data-variant='circle'][data-shape='circle'] .metal-fx-inner {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0);
}

/* ─── Combined glow SVG (z=3) ──────────────────────────────────────────────
   Single SVG per instance that holds BOTH the wide-halo group
   (#mfx_haloTravel) and the catch-light group (#mfx_extraTravel), exactly
   mirroring canonical's _buildGlowSvgInner (index.html L8078). One
   mix-blend-mode: screen lifts the combined composite onto the shader
   ring; per-frame opacity attributes on each inner group still drive the
   independent fade-in / fade-out cycles for the halo and the catch-light.

   Why a single SVG: the circle variant anchors halo + catch-light at the same
   perimeter point, so they overlap in the bright zone. Two separately-
   screened SVGs would double-screen the overlap (A + B + C - AB - AC -
   BC + ABC instead of A + B + C - AB - AC once both groups composite
   in source-over inside one SVG and then screen against the host once).
   That overlap looked muted versus canonical specifically on the circle
   variant where both layers travel together.

   Source-of-truth opacity: #btnGlowSvg drops to 0.7 in dark and 0.2746 in
   light (index.html L632/L643). */
.metal-fx-glow-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  z-index: 3;
  pointer-events: none;
  opacity: 0.7;
}
.metal-fx-root[data-theme='light'] .metal-fx-glow-svg {
  /* Light-mode 1-px overscan mirrors .btn-glow-svg in metal.html so the
     halo stays glued to the visible silhouette (the shader ring there sits
     1 px outside the host's padding box). */
  inset: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  mix-blend-mode: multiply;
  /* Source-of-truth: html[data-theme="light"] #btnGlowSvg { opacity: 0.2746 }
     → −35 % from 0.4225 from the original 0.7 dark-mode opacity. */
  opacity: 0.2746;
  filter: saturate(5.355) brightness(0.78);
}
/* Circle light-mode small variants (e.g. 36×36 send button): the geometrically
   shrunk halo loses density when multiplied against #ffffff. Mirror the
   canonical override at index.html L2316 — bump saturation + drop brightness
   so the small glow holds together visually. */
.metal-fx-root[data-variant='circle'][data-shape='circle'][data-theme='light'] .metal-fx-glow-svg {
  filter: saturate(7.5) brightness(0.6);
}

/* The wrapped child — hoisted into z=5 so it sits above every overlay, with
   normalized chrome so consumer button styles don't fight the metal frame. */
.metal-fx-content {
  position: relative;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  pointer-events: none;
}
.metal-fx-content > * {
  pointer-events: auto;
}
.metal-fx-root[data-normalize='true'] .metal-fx-content > * {
  background: transparent !important;
  border: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
  /* Sizing: we deliberately DO NOT force \`width: 100%; height: 100%\` on the
     child here. That used to be the contract ("the wrapper is the visible
     button surface; the child stretches to fill it"), but it created a cyclic
     percentage dependency: the wrapper is \`inline-flex\` with no intrinsic
     size, .metal-fx-content is \`width/height: 100%\` of the wrapper, and the
     child was \`100%\` of .metal-fx-content. With nothing breaking the cycle,
     icon-only / class-sized children collapsed.

     The new contract: the child sizes itself (intrinsic content, CSS class,
     or inline style — all work), and the wrapper's \`inline-flex\` wraps it
     tightly. Consumers who want a metal frame BIGGER than the child (e.g.
     padding around an icon) size <MetalFx style={{ width, height }}> AND
     explicitly set width/height on the child to fill (or accept that the
     child renders at its intrinsic size, centered).

     Typography is intentionally NOT touched. We used to apply
     \`color: inherit; font: inherit;\` here to "match" the wrapper, but
     \`font: inherit\` is a shorthand that overrides font-family, font-size,
     font-weight, AND line-height on the child — which (a) shrank the
     button height (line-height changes propagate through the flex
     content box) and (b) scaled em-based icons / font-icons inside the
     child to whatever the wrapper inherited. The wrapper now stays out
     of the child's typography entirely; consumers who want typographic
     normalization can apply it themselves on the child element. */
}

[data-metal-fx-reflection] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  z-index: 0;
  isolation: isolate;
}
.metal-fx-reflection-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  filter: blur(4px) saturate(1.2) brightness(1.58);
}
.metal-fx-reflection-stroke-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  filter: saturate(1.35) brightness(1.75);
}
/* Hosts that participate as reflection targets need positioning + isolation
   so the wrap composites only against the host (not the parent stack). The
   wrap injects these inline as well, but stating them here keeps reflections
   working on hosts that already have other inline styles applied. */
[data-metal-fx-reflect-host] {
  isolation: isolate;
}
`,vr=!1;function yr(){if(vr||typeof document>`u`)return;if(document.getElementById(gr)){vr=!0;return}let e=document.createElement(`style`);e.id=gr,e.textContent=_r,document.head.appendChild(e),vr=!0}var Q=e(t(),1),$=e(n(),1);yr();var br={position:`absolute`,inset:0,width:`100%`,height:`100%`},xr={position:`absolute`,inset:3},Sr={position:`absolute`,inset:0,pointerEvents:`none`,zIndex:3,borderRadius:`inherit`},Cr={position:`absolute`,inset:0,pointerEvents:`none`,zIndex:4},wr=new Map;function Tr(){let e=globalThis;e.__MFX_DEBUG__&&(e.__mfxGlow=wr)}oe((e,t)=>{let n=wr.get(e);return n?un(n.handles,e,t,e.opacityMul*e.glowGain,n.themeRef.current):!1});function Er(e){let[t,n]=(0,Q.useState)(()=>e===`auto`?typeof window>`u`||!window.matchMedia||window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`:e);return(0,Q.useEffect)(()=>{if(e!==`auto`){n(e);return}if(typeof window>`u`||!window.matchMedia)return;let t=window.matchMedia(`(prefers-color-scheme: dark)`),r=()=>n(t.matches?`dark`:`light`);return r(),t.addEventListener(`change`,r),()=>t.removeEventListener(`change`,r)},[e]),t}var Dr=(0,Q.forwardRef)(function({children:e,variant:t=`button`,preset:n=`chromatic`,theme:r=`auto`,strength:i=1,glowGain:a=1,paused:o=!1,borderRadius:s,normalizeHostStyles:c=!0,reflectionTargets:l,disableGlow:u=!1,innerShadow:d,shaderScale:f,ringCssPx:p,scale:m=1,mask:h,glowMode:g=`mask`,className:v,style:y,...b},x){let S=(0,Q.useRef)(null),C=(0,Q.useRef)(null),w=(0,Q.useRef)(null),T=(0,Q.useRef)(null),E=(0,Q.useRef)(null),D=(0,Q.useRef)(null),O=(0,Q.useRef)(null),k=(0,Q.useRef)(null),A=(0,Q.useRef)(`dark`),j=(0,Q.useRef)(0),[M,N]=(0,Q.useState)(!1),P=Er(r),F=(0,Q.useMemo)(()=>_(),[]);A.current=P;let I=t===`circle`?`circle`:`pill`,L=!u;(0,Q.useImperativeHandle)(x,()=>S.current,[]);let R=(e,t)=>{if(I===`circle`)return Math.min(e,t)/2;let n=typeof s==`number`?s:(()=>{let e=D.current?.firstElementChild;if(e){let t=parseFloat(getComputedStyle(e).borderTopLeftRadius);if(Number.isFinite(t)&&t>0)return t}return j.current})();return Math.min(n,Math.min(e,t)/2)};(0,Q.useEffect)(()=>{F&&ae(n,P)},[n,P,F]),(0,Q.useEffect)(()=>{let e=O.current;e&&V(e,{mask:h??null})},[h]),(0,Q.useEffect)(()=>{let e=O.current;e&&V(e,{paused:o})},[o]),(0,Q.useEffect)(()=>{let e=O.current;if(!e)return;let t={};f!==void 0&&(t.shaderScale=f),p!==void 0&&(t.ringCssPx=p),m!==void 0&&(t.scale=m),Object.keys(t).length>0&&V(e,t)},[f,p,m]),(0,Q.useLayoutEffect)(()=>{let e=C.current,t=S.current,n=w.current;if(!e||!t||!F)return;{let e=getComputedStyle(t),n=parseFloat(e.borderTopLeftRadius);j.current=Number.isFinite(n)?n:0}let r=()=>{let e=t.getBoundingClientRect(),n=Math.max(1,Math.round(e.width)),r=Math.max(1,Math.round(e.height));return{cssWidth:n,cssHeight:r,cornerRadius:R(n,r)}},i=r();O.current=z({onComposite:()=>{let e=O.current,t=k.current;e&&t&&ln(t,e.deform);let n=E.current;e&&n&&vn(n,e.deform)},hostCanvas:e,cssWidth:i.cssWidth,cssHeight:i.cssHeight,cornerRadius:i.cornerRadius,kind:I,paused:o,shaderScale:f,ringCssPx:p,scale:m,mask:h??null,onFirstCopy:()=>N(!0)}),t.style.setProperty(`--mfx-radius`,`${i.cornerRadius}px`),t.style.borderRadius=`${i.cornerRadius}px`;let a=(e,t)=>{if(!h||g===`ring`)return{};let n=window.devicePixelRatio||1,r=document.createElement(`canvas`);r.width=Math.max(1,Math.round(e*n)),r.height=Math.max(1,Math.round(t*n));let i=r.getContext(`2d`);if(!i)return{};i.fillStyle=`#fff`,h(i,r.width,r.height,n);let a=i.getImageData(0,0,r.width,r.height).data,o=[],s=Math.max(1,Math.round(2*n));for(let e=s>>1;e<r.height;e+=s)for(let t=s>>1;t<r.width;t+=s)a[(e*r.width+t)*4+3]>128&&o.push({x:t/n,y:e/n});return{samplePoints:o,maskDataUrl:r.toDataURL(`image/png`)}};n&&(k.current=an(n,{width:i.cssWidth,height:i.cssHeight,cornerRadius:i.cornerRadius,kind:I,scale:m,...a(i.cssWidth,i.cssHeight)}));let s=e=>{if(!n)return;let t=k.current;n.innerHTML=``,k.current=an(n,{width:e.cssWidth,height:e.cssHeight,cornerRadius:e.cornerRadius,kind:I,scale:m,...a(e.cssWidth,e.cssHeight)}),t&&mn(t,k.current);let r=O.current;r&&k.current&&wr.set(r,{handles:k.current,themeRef:A})},c=()=>d?d===!0?hn:{...hn,...d}:null,l=e=>{let t=T.current,n=O.current;yn(E.current),E.current=null;let r=c();t&&n&&r&&(E.current=gn(t,{width:e.cssWidth,height:e.cssHeight,cornerRadius:e.cornerRadius,kind:I,ring:n.ringCssPx},r))};l(i);let u=0,_=i.cssWidth,v=i.cssHeight,y=i.cornerRadius,b=new ResizeObserver(()=>{u===0&&(u=requestAnimationFrame(()=>{u=0;let e=r(),n=O.current;n&&(Math.abs(e.cssWidth-_)<.5&&Math.abs(e.cssHeight-v)<.5&&Math.abs(e.cornerRadius-y)<.5||(_=e.cssWidth,v=e.cssHeight,y=e.cornerRadius,V(n,{cssWidth:e.cssWidth,cssHeight:e.cssHeight,cornerRadius:e.cornerRadius}),t.style.setProperty(`--mfx-radius`,`${e.cornerRadius}px`),t.style.borderRadius=`${e.cornerRadius}px`,s(e),l(e)))}))});b.observe(t);let x=null,D=()=>{let e=O.current;if(e&&re(e)){let e=r();s(e),l(e)}M()},M=()=>{x?.removeEventListener(`change`,D),x=typeof window.matchMedia==`function`?window.matchMedia(`(resolution: ${window.devicePixelRatio||1}dppx)`):null,x?.addEventListener(`change`,D)};M();let P=Te(e=>{e&&O.current&&s(r())}),L=null;return typeof IntersectionObserver<`u`&&(L=new IntersectionObserver(e=>{let t=O.current;if(t)for(let n of e)ne(t,n.isIntersecting)},{rootMargin:`64px`}),L.observe(t)),O.current&&k.current&&(wr.set(O.current,{handles:k.current,themeRef:A}),ee(O.current)),We(),Tr(),()=>{Ge(),yn(E.current),E.current=null,b.disconnect(),x?.removeEventListener(`change`,D),L?.disconnect(),P(),u!==0&&cancelAnimationFrame(u);let e=O.current;e&&(wr.delete(e),te(e),B(e)),O.current=null,k.current=null,n&&(n.innerHTML=``)}},[I]),(0,Q.useEffect)(()=>{let e=O.current;e&&V(e,{opacityMul:Math.max(0,Math.min(1,i)),glowGain:Math.max(0,a)})},[i,a,t]),(0,Q.useEffect)(()=>{let e=O.current,t=S.current;if(!e||!t||!l||P!==`dark`)return;e.onAfterFrame=hr;let n=l.flatMap(e=>{let t=`current`in e?e:e.ref,n=`current`in e?1:e.strength??1;return t.current?[{el:t.current,strength:n}]:[]});for(let{el:r,strength:i}of n)lr(r,e,t,i);return()=>{e.onAfterFrame=void 0;for(let{el:e}of n)ur(e)}},[l,P]),(0,Q.useEffect)(()=>{let e=S.current,t=O.current;if(!e||!t)return;let n=R(t.cssWidth,t.cssHeight);V(t,{cornerRadius:n}),e.style.setProperty(`--mfx-radius`,`${n}px`),e.style.borderRadius=`${n}px`},[s,P,t,I]);let ie=(0,Q.useMemo)(()=>({...y,"--mfx-strength":String(Math.min(1,Math.max(0,i))),opacity:+!!M,visibility:M?`visible`:`hidden`,transition:M?`opacity 0.15s ease-out`:`none`}),[y,i,M]);return F?(0,$.jsxs)(`div`,{...b,ref:S,className:v?`metal-fx-root ${v}`:`metal-fx-root`,"data-variant":t,"data-shape":I,"data-theme":P,"data-paused":o?`true`:void 0,"data-normalize":c?`true`:`false`,style:ie,children:[(0,$.jsx)(`canvas`,{ref:C,className:`metal-fx-canvas`,style:br}),(0,$.jsx)(`div`,{className:`metal-fx-inner`,"aria-hidden":`true`,style:xr}),(0,$.jsx)(`div`,{ref:w,"aria-hidden":`true`,style:{...Sr,display:L?void 0:`none`}}),d?(0,$.jsx)(`div`,{ref:T,"aria-hidden":`true`,style:Cr}):null,(0,$.jsx)(`div`,{ref:D,className:`metal-fx-content`,children:e})]}):(0,$.jsx)(`div`,{...b,ref:S,className:v?`metal-fx-fallback ${v}`:`metal-fx-fallback`,"data-metal-fx-unsupported":``,style:{display:`inline-flex`,...y},children:e})});Dr.displayName=`MetalFx`;function Or(e,t,n,r){let i=getComputedStyle(n),a=t.getBoundingClientRect(),o=document.createRange();o.selectNodeContents(n);let s=o.getBoundingClientRect();o.detach(),e.save(),e.scale(r,r),e.font=`${i.fontStyle} ${i.fontWeight} ${i.fontSize} ${i.fontFamily}`,e.textAlign=`left`,e.textBaseline=`alphabetic`;let c=n.textContent??``,l=e.measureText(c),u=l.fontBoundingBoxAscent??parseFloat(i.fontSize)*.9,d=l.fontBoundingBoxDescent??parseFloat(i.fontSize)*.2,f=s.left-a.left,p=s.top-a.top+(s.height-(u+d))/2+u;e.fillText(c,f,p),e.restore()}var kr={offsetY:1,blur:.5,alpha:.9},Ar=Object.freeze({metalOpacity:.62,shaderScale:2.8,glowGain:2.5,innerShadow:kr});function jr(e,t,n,r){let i=window.devicePixelRatio||1,a=t.getBoundingClientRect(),o=Math.max(1,Math.round(a.width*i)),s=Math.max(1,Math.round(a.height*i)),c=document.createElement(`canvas`);c.width=o,c.height=s;let l=c.getContext(`2d`,{willReadFrequently:!0}),u=e.getContext(`2d`);if(!l||!u)return;l.fillStyle=`#fff`,Or(l,t,n,i);let d=l.getImageData(0,0,o,s).data,f=o*s,p=new Float32Array(f);for(let e=0,t=3;e<f;e++,t+=4)p[e]=d[t]/255;let m=Math.max(1,Math.round(r.offsetY*i))*o,h=new Float32Array(f);for(let e=0;e<f;e++){let t=e>=m?p[e-m]:0;h[e]=Math.max(0,p[e]-t)}let g=Tt(h,o,s,r.blur*i);e.width=o,e.height=s,e.style.width=`${a.width}px`,e.style.height=`${a.height}px`;let _=u.createImageData(o,s),v=_.data;for(let e=0,t=0;e<f;e++,t+=4)v[t]=255,v[t+1]=255,v[t+2]=255,v[t+3]=Math.round(Math.min(1,g[e]*p[e]*r.alpha)*255);u.putImageData(_,0,0)}var Mr=`mfx-bare-style`,Nr=`.metal-fx-root[data-mfx-bare]{background:transparent!important}.metal-fx-root[data-mfx-bare]::before,.metal-fx-root[data-mfx-bare]::after{box-shadow:none!important}.metal-fx-root[data-mfx-bare] .metal-fx-inner{display:none!important}`;function Pr({children:e,font:t,color:n,strength:r=1,theme:i,reflectionTargets:a,className:o,innerShadow:s=kr,glow:c=!1,glowGain:l=Ar.glowGain,metalOpacity:u=Ar.metalOpacity,shaderScale:d=Ar.shaderScale}){let f=(0,Q.useRef)(null),p=(0,Q.useRef)(null);(0,Q.useEffect)(()=>{if(!document.getElementById(Mr)){let e=document.createElement(`style`);e.id=Mr,e.textContent=Nr,document.head.appendChild(e)}f.current?.setAttribute(`data-mfx-bare`,``);let e=f.current?.querySelector(`canvas.metal-fx-canvas`);e&&(e.style.zIndex=`6`);let t=f.current?.querySelector(`.metal-fx-glow-svg`)?.parentElement;t&&(t.style.zIndex=`7`)},[]),(0,Q.useEffect)(()=>{let e=f.current,t=p.current;if(!e||!t||!s)return;let n=document.createElement(`canvas`);n.className=`metal-fx-text-rim`,n.setAttribute(`aria-hidden`,`true`),n.style.cssText=`position:absolute;left:0;top:0;pointer-events:none;z-index:8`,e.appendChild(n);let r=()=>jr(n,e,t,s);r();let i=!0;document.fonts?.ready.then(()=>{i&&r()});let a=new ResizeObserver(r);a.observe(e);let o=null,c=()=>{o?.removeEventListener(`change`,l),o=typeof window.matchMedia==`function`?window.matchMedia(`(resolution: ${window.devicePixelRatio||1}dppx)`):null,o?.addEventListener(`change`,l)},l=()=>{i&&(r(),c())};return c(),()=>{i=!1,a.disconnect(),o?.removeEventListener(`change`,l),n.remove()}},[s]);let m=(0,Q.useCallback)((e,t,n,r)=>{let i=f.current,a=p.current;i&&a&&Or(e,i,a,r)},[]),h={font:t,color:n,letterSpacing:0,whiteSpace:`nowrap`};return(0,$.jsx)(Dr,{ref:f,preset:`chromatic`,theme:i,strength:r*u,glowGain:l,disableGlow:!c,mask:m,reflectionTargets:a,shaderScale:d,borderRadius:4,style:{background:`transparent`,borderRadius:4},children:(0,$.jsx)(`span`,{ref:p,className:o,style:h,"aria-label":e,children:e})})}var Fr=55.556,Ir=45,Lr=25,Rr=18.333/2,zr={position:`absolute`,inset:0,pointerEvents:`none`},Br=(e,t)=>`inset 0px 0px ${8.333*e}px 0px rgba(255,255,255,${t}), inset 0px 0px ${8.333*e}px 0px rgba(255,255,255,${t}), inset 0px 0px 0px ${.833*e}px rgba(255,255,255,0.5), inset 0px ${.833*e}px 0px 0px rgba(255,255,255,0.78)`,Vr=Object.freeze({metalOpacity:.8,shaderScale:1.6,core:Object.freeze({r:46,blur:100,a:.94,size:49}),gradient:0,glow:.41});function Hr({children:e=`New`,strength:t=1,theme:n,scale:r=1,reflectionTargets:i,metalOpacity:a=Vr.metalOpacity,shaderScale:o=Vr.shaderScale,core:s=Vr.core,gradient:c=Vr.gradient,glow:l=Vr.glow,textColor:u=`#323232`}){let d=(0,Q.useRef)(null),f=a,p=(0,Q.useCallback)((e,t,n,r)=>{e.beginPath(),e.roundRect(0,0,t,n,Fr*r),e.fill()},[]);return(0,$.jsx)(Dr,{ref:d,preset:`chromatic`,theme:n,strength:t*f,shaderScale:o,mask:p,glowMode:`ring`,reflectionTargets:i,borderRadius:Fr*r,style:{background:`#ffffff`,borderRadius:Fr*r},children:(0,$.jsxs)(`div`,{style:{position:`relative`,width:Ir*r,height:Lr*r,borderRadius:Fr*r},children:[(0,$.jsx)(`div`,{"aria-hidden":`true`,style:{...zr,borderRadius:Fr*r,background:`radial-gradient(ellipse ${s.size}% ${s.size}% at 50% 50%, rgba(255,255,255,1) ${s.r}%, rgba(255,255,255,0) ${Math.min(100,s.r+s.blur)}%)`,opacity:s.a}}),(0,$.jsx)(`div`,{"aria-hidden":`true`,style:{...zr,borderRadius:Fr*r,background:`linear-gradient(to bottom, rgba(255,255,255,${c}), rgba(255,255,255,0))`,boxShadow:Br(r,l)}}),(0,$.jsx)(`span`,{style:{position:`relative`,display:`flex`,alignItems:`center`,justifyContent:`center`,boxSizing:`border-box`,width:Ir*r,height:Lr*r,paddingLeft:Rr*r,paddingRight:Rr*r,font:`600 ${12.222*r}px/1.4 Inter, sans-serif`,color:u,letterSpacing:0,whiteSpace:`nowrap`},"aria-label":e,children:e})]})})}function Ur(){return(0,$.jsxs)(`div`,{className:`flex w-[660px] flex-col items-center gap-10 rounded-3xl bg-[#08080a] p-10`,children:[(0,$.jsx)(Pr,{preset:`silver`,className:`text-[64px] font-semibold tracking-tight`,children:`Liquid metal`}),(0,$.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,$.jsx)(Hr,{children:`New`}),(0,$.jsx)(Dr,{variant:`button`,preset:`chromatic`,children:(0,$.jsx)(`button`,{className:`rounded-full bg-[#131316] px-6 py-2.5 text-sm font-medium text-white ring-1 ring-white/10`,children:`Upgrade to Pro`})}),(0,$.jsx)(Dr,{variant:`circle`,preset:`gold`,children:(0,$.jsx)(`button`,{"aria-label":`Add`,className:`grid size-10 place-items-center rounded-full bg-[#131316] text-white ring-1 ring-white/10`,children:`+`})})]}),(0,$.jsx)(`div`,{className:`flex items-center gap-4`,children:[`chromatic`,`silver`,`gold`].map(e=>(0,$.jsx)(Dr,{variant:`button`,preset:e,children:(0,$.jsx)(`button`,{className:`rounded-full bg-[#131316] px-6 py-2.5 text-sm font-medium text-white ring-1 ring-white/10`,children:e})},e))})]})}export{Ur as default};