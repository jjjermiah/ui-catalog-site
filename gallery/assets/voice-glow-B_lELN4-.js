import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{n as t,t as n}from"./jsx-runtime-C3cWAN_r.js";function r(e){let t=e.trim(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(n){let e=n[1].length===3?n[1].split(``).map(e=>e+e).join(``):n[1];return[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]}let r=t.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);return r?[Math.round(+r[1]),Math.round(+r[2]),Math.round(+r[3])]:null}function i(e){let t=r(e);return t?`rgb(${t[0]}, ${t[1]}, ${t[2]})`:null}function a(e){let t=r(e);return t?`${t[0]}, ${t[1]}, ${t[2]}`:null}var o={dark:{strokeOpacity:1.16,innerOpacity:.47,bloomOpacity:.89,innerShadow:`rgba(255, 255, 255, 0.1)`,saturation:1.2,brightness:1.1},light:{strokeOpacity:1.2,innerOpacity:.85,bloomOpacity:.5,innerShadow:`rgba(0, 0, 0, 0.08)`,saturation:1.6,brightness:.95,hueRange:40,hueDuration:8.5,hueBase:5,strength:.8,bandStrength:1.7}},s=[{x:0,w:74,h:46,band:0},{x:-36,w:54,h:40,band:1},{x:36,w:54,h:40,band:1},{x:-72,w:48,h:32,band:2},{x:72,w:48,h:32,band:2},{x:-108,w:42,h:26,band:1},{x:108,w:42,h:26,band:1}],c=36*s.length,l={colorful:{dark:[`rgb(255, 70, 120)`,`rgb(60, 190, 255)`,`rgb(175, 70, 255)`,`rgb(60, 220, 130)`,`rgb(255, 150, 40)`,`rgb(90, 100, 255)`,`rgb(40, 200, 190)`],light:[`rgb(255, 201, 21)`,`rgb(126, 196, 255)`,`rgb(180, 40, 230)`,`rgb(235, 100, 160)`,`rgb(255, 176, 122)`,`rgb(154, 160, 255)`,`rgb(127, 217, 238)`]},mono:{dark:[`rgb(215, 215, 215)`,`rgb(180, 180, 180)`,`rgb(190, 190, 190)`,`rgb(160, 160, 160)`,`rgb(170, 170, 170)`,`rgb(150, 150, 150)`,`rgb(155, 155, 155)`],light:[`rgb(60, 60, 60)`,`rgb(90, 90, 90)`,`rgb(85, 85, 85)`,`rgb(110, 110, 110)`,`rgb(105, 105, 105)`,`rgb(125, 125, 125)`,`rgb(120, 120, 120)`]},ocean:{dark:[`rgb(80, 140, 255)`,`rgb(40, 200, 230)`,`rgb(120, 90, 255)`,`rgb(30, 170, 210)`,`rgb(160, 80, 240)`,`rgb(60, 110, 255)`,`rgb(40, 190, 180)`],light:[`rgb(40, 100, 240)`,`rgb(20, 160, 200)`,`rgb(90, 60, 230)`,`rgb(20, 130, 180)`,`rgb(130, 50, 220)`,`rgb(40, 80, 230)`,`rgb(20, 150, 150)`]},sunset:{dark:[`rgb(255, 110, 60)`,`rgb(255, 180, 40)`,`rgb(255, 60, 90)`,`rgb(255, 210, 80)`,`rgb(240, 70, 140)`,`rgb(255, 140, 50)`,`rgb(230, 50, 110)`],light:[`rgb(235, 80, 30)`,`rgb(230, 150, 10)`,`rgb(230, 30, 70)`,`rgb(225, 175, 30)`,`rgb(215, 40, 110)`,`rgb(235, 110, 20)`,`rgb(205, 30, 90)`]},forest:{dark:[`rgb(70, 220, 120)`,`rgb(40, 200, 180)`,`rgb(140, 230, 80)`,`rgb(30, 170, 140)`,`rgb(190, 235, 70)`,`rgb(50, 190, 110)`,`rgb(30, 150, 120)`],light:[`rgb(30, 170, 80)`,`rgb(20, 150, 130)`,`rgb(90, 180, 30)`,`rgb(20, 130, 100)`,`rgb(130, 180, 20)`,`rgb(30, 150, 80)`,`rgb(20, 120, 90)`]},candy:{dark:[`rgb(255, 90, 170)`,`rgb(255, 120, 220)`,`rgb(210, 80, 255)`,`rgb(255, 150, 190)`,`rgb(180, 110, 255)`,`rgb(255, 70, 140)`,`rgb(230, 100, 240)`],light:[`rgb(235, 40, 140)`,`rgb(230, 70, 190)`,`rgb(180, 40, 230)`,`rgb(235, 100, 160)`,`rgb(150, 70, 230)`,`rgb(230, 30, 110)`,`rgb(200, 60, 210)`]},ice:{dark:[`rgb(150, 230, 255)`,`rgb(90, 200, 255)`,`rgb(190, 240, 255)`,`rgb(120, 190, 255)`,`rgb(160, 220, 250)`,`rgb(80, 170, 255)`,`rgb(200, 235, 255)`],light:[`rgb(30, 160, 220)`,`rgb(20, 130, 210)`,`rgb(60, 180, 230)`,`rgb(40, 120, 220)`,`rgb(50, 160, 220)`,`rgb(20, 110, 220)`,`rgb(70, 170, 230)`]},gold:{dark:[`rgb(255, 200, 70)`,`rgb(255, 170, 40)`,`rgb(255, 220, 110)`,`rgb(240, 150, 30)`,`rgb(255, 235, 140)`,`rgb(230, 160, 40)`,`rgb(250, 210, 90)`],light:[`rgb(200, 140, 10)`,`rgb(190, 120, 0)`,`rgb(210, 160, 30)`,`rgb(180, 110, 0)`,`rgb(205, 170, 40)`,`rgb(175, 115, 5)`,`rgb(195, 150, 20)`]}};function u(e,t){let n=e.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);return n?`rgba(${n[1]}, ${n[2]}, ${n[3]}, ${t.toFixed(2)})`:e}function d(e,t=1){return Math.max(.5,Math.round(e*t*100)/100)}function f(e,t){return`calc(50% + (var(--vb-cx-${t}) + var(--vb-x${e}-${t})) * var(--vb-w-${t}) * var(--vb-z-${t}, 1))`}function p({id:e,colors:t,alpha:n,sw:r,sh:i,y:a,fade:o,count:c}){return(c?s.slice(0,c):s).map((s,c)=>{let l=n>=1?t[c%t.length]:u(t[c%t.length],n),d=`calc(${Math.round(s.w*r)}px * var(--vb-w-${e}) * var(--vb-z-${e}, 1))`,p=`calc(${Math.round(s.h*i)}px * var(--vb-h-${e}) * var(--vb-l${c}-${e}) * var(--vb-z-${e}, 1))`,m=`calc(100% + (${a}px + var(--vb-y${c}-${e})) * var(--vb-z-${e}, 1))`;return`radial-gradient(ellipse ${d} ${p} at ${f(c,e)} ${m}, ${l} 0%, transparent ${o}%)`}).join(`,
    `)}function m(e){let{id:t,borderRadius:n,borderWidth:r,strokeOpacity:a,innerOpacity:o,bloomOpacity:c,innerShadow:u,colorVariant:f,colors:m,brightness:h,saturation:g,theme:_,hueBase:v=0,glowSize:y=1,glowWidth:b=1,glowHeight:x=1,strokeScale:S=1,innerScale:C=1,innerHeight:w=1,bloomScale:T=1,bloomHeight:E=1,coreSize:D=1,coreLight:O=0,coreLightWidth:k=1,coreLightHeight:ee=1,rangeWidth:te=1,rangeHeight:A=1,softness:j=1,distortion:M=!1,scale:N=1}=e,P=Math.round(28*N*10)/10,F=Math.round(9*N*10)/10,ne=Math.max(0,n-r),I=Math.round(Math.max(40,Math.min(95,70*j))),re=e=>b*e,L=e=>x*e,R=e=>Math.round(e*10)/10,z=`var(--vb-z-${t}, 1)`,B=e=>`calc(${R(e)}px * ${z})`,V=_===`dark`,ie=l[f][V?`dark`:`light`].map((e,t)=>{let n=m?.[t];return n&&i(n)||e}),ae=f===`mono`?.6:1,oe=(a*ae).toFixed(2),se=(o*ae).toFixed(2),ce=(c*ae).toFixed(2),H=h.toFixed(2),U=g.toFixed(2),W=`hue-rotate(calc(var(--voice-hue-base, ${v}deg) + var(--vb-hue-${t})))`,le=M?` url(#vb-distort-${t})`:``,ue=`filter: ${W} brightness(${H}) saturate(${U});`,de=`filter: ${W} brightness(${H}) saturate(${U})${le};`,fe=`filter: blur(${B(d(10,y))}) ${W} brightness(${H}) saturate(${U});`,pe=`filter: blur(${B(d(10,y))}) ${W} brightness(${H}) saturate(${U})${le};`,me=`calc(50% + var(--vb-cx-${t}) * var(--vb-w-${t}) * ${z})`,he=`calc(100% + (2px + var(--vb-cy-${t})) * ${z})`,ge=V?`radial-gradient(ellipse calc(${R(30*D)}px * var(--vb-w-${t}) * ${z}) calc(${R(30*D)}px * var(--vb-h-${t}) * ${z}) at ${me} ${he}, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.14) 30%, transparent 65%)`:`radial-gradient(ellipse calc(${R(40*D)}px * var(--vb-w-${t}) * ${z}) calc(${R(30*D)}px * var(--vb-h-${t}) * ${z}) at ${me} ${he}, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.22) 35%, transparent 70%)`,_e=p({id:t,colors:ie,alpha:1,sw:re(S),sh:L(S),y:2,fade:I}),ve=p({id:t,colors:ie,alpha:.46,sw:re(.9*C),sh:L(.9*C*w),y:0,fade:I}),ye=p({id:t,colors:ie,alpha:V?.9:.7,sw:re(1.15*T),sh:L(1.5*T*E),y:0,fade:Math.min(95,I+2)}),G=(e,n,r,i=0)=>`radial-gradient(ellipse calc(${R(e*te)}px * var(--vb-w-${t}) * var(--vb-mw-${t}) * ${z}) calc((${R(n*A)}px * var(--vb-h-${t}) + var(--vb-bh-${t})) * ${z}) at ${me} calc(100% + var(--vb-cy-${t}) * ${z}), white 0%, rgba(255, 255, 255, 0.5) ${r}%${i>0?`, rgba(255, 255, 255, ${i}) 85%`:``}, transparent 100%)`,be=(e,n)=>`opacity: calc(var(--vb-opacity-${t}, 1) * var(--vb-glow-${t}) * ${n} * var(--voice-${e}-opacity, 1) * var(--voice-strength, 1));`,xe=(e,t,r,i)=>`${e} {
  ${t}
  position: absolute;
  inset: 0;
  border-radius: ${B(n)};
  background: ${ve};
  box-shadow: inset 0 0 ${B(F)} 1px ${u};
  -webkit-mask-image:
    ${G(170,64,45,.3)},
    linear-gradient(white, transparent ${B(P)}, transparent calc(100% - ${P}px * ${z}), white),
    linear-gradient(to right, white, transparent ${B(P)}, transparent calc(100% - ${P}px * ${z}), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    ${G(170,64,45,.3)},
    linear-gradient(white, transparent ${B(P)}, transparent calc(100% - ${P}px * ${z}), white),
    linear-gradient(to right, white, transparent ${B(P)}, transparent calc(100% - ${P}px * ${z}), white);
  mask-composite: intersect, add;
  pointer-events: none;
  /* Its own compositing layer: WebKit otherwise re-rasterizes the
     filtered layer into the parent every frame on the CPU (a phone-sized
     host runs at a sixth of the frame rate without this). */
  will-change: transform;
  z-index: 1;
  ${r}
  ${be(`inner`,se)}
  ${i}
}`;return`
@property --vb-opacity-${t} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-voice-beam="${t}"] {
  position: relative;
  border-radius: ${n}px;
  overflow: hidden;
  --vb-h-${t}: 0.8;
  --vb-w-${t}: 1;
${s.map((e,n)=>`  --vb-x${n}-${t}: ${e.x}px;
  --vb-l${n}-${t}: 1;
  --vb-y${n}-${t}: 0px;`).join(`
`)}
  --vb-glow-${t}: 0.4;
  --vb-z-${t}: 1;
  --vb-cx-${t}: 0px;
  --vb-cy-${t}: 0px;
  --vb-bh-${t}: 0px;
  --vb-bendA-${t}: 0;
  --vb-mw-${t}: 1;
  --vb-hue-${t}: 0deg;
  --vb-level-${t}: 0;
}

[data-voice-beam="${t}"][data-active] {
  animation: vb-fade-in-${t} 0.6s ease forwards;
}

[data-voice-beam="${t}"][data-fading] {
  animation: vb-fade-out-${t} 0.5s ease forwards;
}

/* Stroke — the colours painted into the 1px edge ring, masked to the centred ellipse. */
[data-voice-beam="${t}"][data-active]::after,
[data-voice-beam="${t}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${B(ne)};
  padding: ${B(r)};
  clip-path: inset(0 round ${B(n)});
  background:
    ${ge},
    ${_e};
  -webkit-mask:
    ${G(170,64,45)},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    ${G(170,64,45)},
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  /* Its own compositing layer: WebKit otherwise re-rasterizes the
     filtered layer into the parent every frame on the CPU (a phone-sized
     host runs at a sixth of the frame rate without this). */
  will-change: transform;
  z-index: 2;
  ${be(`stroke`,oe)}
  ${ue}
}

/* Inner glow — soft light inside the element, faded off at the corners.
   With distortion on, this copy is clipped to ABOVE the band line (the
   polygon the driver writes each frame) and a mirror layer below carries
   the displacement filter, so only the glow under the line warps. */
${xe(`[data-voice-beam="${t}"][data-active]::before,\n[data-voice-beam="${t}"][data-fading]::before`,`content: "";`,M?`clip-path: var(--vb-clip-above-${t}, inset(0 round ${n}px));`:`clip-path: inset(0 round ${n}px);`,ue)}
${M?xe(`[data-voice-beam="${t}"][data-active] [data-voice-beam-warp="inner"],\n[data-voice-beam="${t}"][data-fading] [data-voice-beam-warp="inner"]`,`display: block;`,`clip-path: var(--vb-clip-below-${t}, inset(0 round ${n}px));`,de):``}

/* Bloom — the blurred halo, tallest of the three, above the content. */
[data-voice-beam="${t}"] [data-voice-beam-bloom],
[data-voice-beam="${t}"] [data-voice-beam-warp] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${B(ne)};
  pointer-events: none;
  /* Its own compositing layer: WebKit otherwise re-rasterizes the
     filtered layer into the parent every frame on the CPU (a phone-sized
     host runs at a sixth of the frame rate without this). */
  will-change: transform;
  opacity: 0;
}

[data-voice-beam="${t}"] [data-voice-beam-bloom],
[data-voice-beam="${t}"] [data-voice-beam-warp="bloom"] {
  -webkit-mask: ${G(200,130,35)};
  mask: ${G(200,130,35)};
  background: ${ye};
  z-index: 3;
}

[data-voice-beam="${t}"][data-active] [data-voice-beam-bloom],
[data-voice-beam="${t}"][data-fading] [data-voice-beam-bloom] {
  display: block;
  clip-path: ${M?`var(--vb-clip-above-${t}, inset(0 round ${n}px))`:`inset(0 round ${n}px)`};
  ${be(`bloom`,ce)}
  ${fe}
}
${M?`
[data-voice-beam="${t}"][data-active] [data-voice-beam-warp="bloom"],
[data-voice-beam="${t}"][data-fading] [data-voice-beam-warp="bloom"] {
  display: block;
  clip-path: var(--vb-clip-below-${t}, inset(0 round ${n}px));
  ${be(`bloom`,ce)}
  ${pe}
}

/* Processing drops the distortion: the driver marks the wrapper once the
   warp has faded out, the warp layers leave the paint and the base layers
   give up their split at the band line. */
[data-voice-beam="${t}"][data-voice-warp="off"]::before,
[data-voice-beam="${t}"][data-voice-warp="off"] [data-voice-beam-bloom] {
  clip-path: inset(0 round ${n}px);
}

[data-voice-beam="${t}"][data-voice-warp="off"] [data-voice-beam-warp] {
  display: none;
}`:``}

/* Epicentre — a soft white wash at the source, under the band line (the
   driver's clip; unclipped when no line is drawn), sitting above every
   glow layer and the band's halo so the centre reads lighter than the
   band (same z as the band canvases, painted after them). Sized by the voice like the
   other layers; off unless \`coreLight\` is set (the light theme sets it).
   Up to 1 it is the wash's opacity; past 1 the solid white core widens
   too, for a centre that stays lighter than a strong band. It follows the
   glow's presence but not \`strength\`, which would only dim it. */
${O>0?(()=>{let e=Math.max(0,Math.min(2,O-1)),n=Math.min(1,e),r=Math.max(0,e-1),i=1+.3*e,a=R(45*n+27*r),o=R(40+25*n+15*r),s=Math.min(1,.55+.35*n+.1*r).toFixed(2),c=R(72+14*n+8*r);return`[data-voice-beam="${t}"] [data-voice-beam-core] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${B(ne)};
  overflow: hidden;
  pointer-events: none;
  /* Its own compositing layer: WebKit otherwise re-rasterizes the
     filtered layer into the parent every frame on the CPU (a phone-sized
     host runs at a sixth of the frame rate without this). */
  will-change: transform;
  /* The blur sits on this wrapper and the band-line clip on the child,
     so the cut edge is blurred too rather than left hard. */
  filter: blur(${B(d(8,y))});
  z-index: 4;
}

[data-voice-beam="${t}"] [data-voice-beam-core] > div {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse calc(${R(120*k*i*N)}px * var(--vb-w-${t}) * ${z}) calc((${R(70*ee*i*N)}px * var(--vb-h-${t}) + var(--vb-bh-${t})) * ${z}) at ${me} calc(100% + var(--vb-cy-${t}) * ${z}), white 0%, white ${a}%, rgba(255, 255, 255, ${s}) ${o}%, transparent ${c}%);
  clip-path: var(--vb-clip-below-${t}, none);
}

[data-voice-beam="${t}"][data-active] [data-voice-beam-core],
[data-voice-beam="${t}"][data-fading] [data-voice-beam-core] {
  display: block;
  opacity: calc(var(--vb-opacity-${t}, 1) * min(1, var(--vb-glow-${t}) * ${Math.min(1,O).toFixed(2)} * ${(1.6+1.4*e).toFixed(2)}) * var(--voice-core-light-opacity, 1));
}
`})():``}
/* Band — the canvas the driver draws the bend's contour on: an organic
   bell with chromatic fringes. Fades with the root, follows the strength
   and turns with the hue drift like the other layers. */
[data-voice-beam="${t}"] [data-voice-beam-band],
[data-voice-beam="${t}"] [data-voice-beam-band-halo] {
  display: none;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* Its own compositing layer: WebKit otherwise re-rasterizes the
     filtered layer into the parent every frame on the CPU (a phone-sized
     host runs at a sixth of the frame rate without this). */
  will-change: transform;
  z-index: 4;
}

[data-voice-beam="${t}"][data-active] [data-voice-beam-band],
[data-voice-beam="${t}"][data-fading] [data-voice-beam-band],
[data-voice-beam="${t}"][data-active] [data-voice-beam-band-halo],
[data-voice-beam="${t}"][data-fading] [data-voice-beam-band-halo] {
  display: block;
  opacity: calc(var(--vb-opacity-${t}, 1) * var(--voice-band-opacity, 1) * var(--voice-strength, 1));
  /* The blur vars are 0 where the canvas blurs its own strokes; where the
     2D context has no filter (WebKit) the driver sets them and the layers
     are blurred here instead — the ridge on the band canvas, its wider
     halo on the canvas beneath. */
  filter: blur(var(--vb-band-blur-${t}, 0px)) ${W} brightness(${H}) saturate(${U});
}

[data-voice-beam="${t}"][data-active] [data-voice-beam-band-halo],
[data-voice-beam="${t}"][data-fading] [data-voice-beam-band-halo] {
  filter: blur(var(--vb-band-halo-blur-${t}, 0px)) ${W} brightness(${H}) saturate(${U});
}

/* Resolution. The soft layers — inner light and its warp mirror, bloom and
   its mirror, the epicentre — are rastered at half size and scaled back
   up by the compositor: the box is halved, every length inside rides the
   layer's factor \`--vb-z\` at 0.5 (the driver also writes the band-line
   clips at half scale), and the will-change transform is rastered
   pre-scale where the engine does that (Chromium, Safari 18). For blurred
   gradients that is the same picture at a quarter of the raster and
   filter work, which is what a phone at 3x runs out of. The 1px stroke
   stays full-res on every screen: at half size it is half a CSS pixel,
   which a 3x phone rasters into a faint smear instead of the hairline,
   and the layer is cheap (no blur). The component sets
   \`data-voice-halfres\`. */
[data-voice-beam="${t}"][data-voice-halfres]::before,
[data-voice-beam="${t}"][data-voice-halfres] [data-voice-beam-warp],
[data-voice-beam="${t}"][data-voice-halfres] [data-voice-beam-bloom],
[data-voice-beam="${t}"][data-voice-halfres] [data-voice-beam-core] {
  --vb-z-${t}: 0.5;
  inset: auto;
  left: 0;
  top: 0;
  width: 50%;
  height: 50%;
  transform: translateZ(0) scale(2);
  transform-origin: 0 0;
}
${M?`[data-voice-beam="${t}"][data-voice-halfres][data-active]::before,
[data-voice-beam="${t}"][data-voice-halfres][data-fading]::before,
[data-voice-beam="${t}"][data-voice-halfres][data-active] [data-voice-beam-bloom],
[data-voice-beam="${t}"][data-voice-halfres][data-fading] [data-voice-beam-bloom] {
  clip-path: var(--vb-clip-above-z-${t}, inset(0 round ${B(n)}));
}
[data-voice-beam="${t}"][data-voice-halfres][data-active] [data-voice-beam-warp],
[data-voice-beam="${t}"][data-voice-halfres][data-fading] [data-voice-beam-warp] {
  clip-path: var(--vb-clip-below-z-${t}, inset(0 round ${B(n)}));
}
/* Processing (warp off): the mirrors are gone, so the base layers paint
   the whole box again — this must outweigh the split above. */
[data-voice-beam="${t}"][data-voice-halfres][data-voice-warp="off"]::before,
[data-voice-beam="${t}"][data-voice-halfres][data-voice-warp="off"] [data-voice-beam-bloom] {
  clip-path: inset(0 round ${B(n)});
}`:`[data-voice-beam="${t}"][data-voice-halfres][data-active]::before,
[data-voice-beam="${t}"][data-voice-halfres][data-fading]::before,
[data-voice-beam="${t}"][data-voice-halfres][data-active] [data-voice-beam-bloom],
[data-voice-beam="${t}"][data-voice-halfres][data-fading] [data-voice-beam-bloom] {
  clip-path: inset(0 round ${B(n)});
}`}
[data-voice-beam="${t}"][data-voice-halfres] [data-voice-beam-core] > div {
  clip-path: var(--vb-clip-below-z-${t}, none);
}
@keyframes vb-fade-in-${t} {
  to { --vb-opacity-${t}: 1; }
}

@keyframes vb-fade-out-${t} {
  from { --vb-opacity-${t}: 1; }
  to { --vb-opacity-${t}: 0; }
}

[data-voice-beam="${t}"][data-paused],
[data-voice-beam="${t}"][data-paused]::after,
[data-voice-beam="${t}"][data-paused]::before,
[data-voice-beam="${t}"][data-paused] [data-voice-beam-bloom] {
  animation-play-state: paused !important;
}
`}var h=null;function g(){if(typeof window>`u`)return null;let e=window;return e.AudioContext??e.webkitAudioContext??null}function _(){let e=g();return e?(h||=new e,h.state===`suspended`&&h.resume().catch(()=>{}),h):null}var v=new WeakMap;function y(e){let t=_();if(!t||e.getAudioTracks().length===0)return null;let n=v.get(e);n||(n={node:t.createMediaStreamSource(e),refs:0},v.set(e,n)),n.refs+=1;let r=t.createAnalyser();r.fftSize=1024,r.smoothingTimeConstant=.5,n.node.connect(r);let i=!1;return{analyser:r,release:()=>{if(!i){i=!0;try{n.node.disconnect(r)}catch{}if(--n.refs,n.refs<=0){try{n.node.disconnect()}catch{}v.delete(e)}}}}}var b=20;Math.sqrt(Math.PI)/2,(()=>{let e=new Float32Array(4096),t=625341585;for(let n=0;n<e.length;n++)t^=t<<13,t^=t>>>17,t^=t<<5,e[n]=(t>>>0)/4294967296;return e})();var x=s.length;new Float32Array(x),new Float32Array(x),new Float32Array(x),new Int32Array(b),new Int32Array(b),Array(b),b/.97;var S={gather:0,offset:0,stretch:0,heldLevel:0,cornerFollow:0},C=new WeakMap;function w(e){let t=C.get(e);return t||(t={level:0,bands:[0,0,0],phase:0,motion:{...S},t:0,lastTs:0,warp:1,drift:0,fast:0,fastBands:[0,0,0]},C.set(e,t)),t}var T=new Set;new Float32Array(s.length),new Float32Array(s.length);var E=null,D=0,O=1e3/60-2,k=22,ee=500,te=4e3,A=0,j=!1,M=!1,N=0,P=0,F=Math.PI*2,ne=5,I=1.7,re=[[80,300],[300,2e3],[2e3,6e3]];function L(e){return e<0?0:e>1?1:e}function R(e,t){let n=t/2;return((e+n)%t+t)%t-n}function z(e,t){let n=e/(t/2+4);return Math.max(0,1-n*n)}function B(e,t){if(e<=t)return 0;let n=(e-t)/Math.max(.001,1-t);return L((1-Math.exp(-3*n))/(1-Math.exp(-3)))}function V(e,t,n,r,i){let a=t>e?r:i,o=1-Math.exp(-n/Math.max(.001,a));return e+(t-e)*o}var ie=2,ae=.06,oe=.35,se=.03,ce=.03,H=!(typeof navigator<`u`&&/AppleWebKit/.test(navigator.userAgent)&&!/Chrome\/|Chromium\/|Edg\/|OPR\//.test(navigator.userAgent)),U=.05,W=6,le=12,ue=.1,de=170,fe=64,pe=56;function me(e,t,n,r){let i=e<0?1-r:1+r,a=Math.max(.05,n*i),o=Math.exp(-((Math.abs(e)/a)**+t)),s=Math.exp(-((1/a)**t));return Math.max(0,(o-s)/(1-s))}function he(e,t,n,r,i){if(n<=0||t<=0)return 0;let a=t*Math.max(0,Math.min(.98,r));return e<=a?0:n*Math.min(1,(e-a)/Math.max(1,t-a))**+Math.max(.5,i)}function ge(e,t,n){return Math.max(0,Math.min(e,t/2,n/2))}function _e(e,t,n,r=0){if(n<=0)return 0;let i=Math.min(e,t-e)-r;if(i>=n)return 0;if(i<=0)return n;let a=n-i;return n-Math.sqrt(Math.max(0,n*n-a*a))}function ve(e,t,n,r){let i=n/2+t.cx*t.w,a=de*e.rangeWidth*t.w*t.mw,o=r*.82*Math.min(1,e.scale),s=Math.min(o,(fe*e.rangeHeight*t.h+t.lift)*e.bandPosition),c=r-e.bandOffset,l=Math.min(1,t.corner*4),u=e.bandTail*(1-l*l*(3-2*l)),d=u>.001,f=d?e.bandTailOverflow:0,p=d?-f:i-a,m=d?n+f:i+a,h=[];for(let o=0;o<=pe;o++){let l=p+(m-p)*o/pe,d=Math.max(-1,Math.min(1,(l-i)/Math.max(1,a))),g=(l<i?i:n-i)+f,_=me(d,e.bandCurve,e.bandSpread,e.bandSkew)+he(Math.abs(l-i),g,u,e.bandTailPosition,e.bandTailCurve),v=t.corner>0?_e(l,n,ge(e.radius,n,r))*t.corner:0;h.push([l,c-s*_-v])}return h}function ye(e,t,n,r,i){for(let[a,o]of[[``,1],[`-z`,.5]]){let s=e=>(e*o).toFixed(1)+`px`,c=n.map(([e,t])=>`${s(e)} ${s(t)}`),l=`polygon(0 ${s(i)}, ${c.join(`, `)}, ${s(r)} ${s(i)})`,u=`polygon(0 0, ${s(r)} 0, ${s(r)} ${s(i)}, ${c.slice().reverse().join(`, `)}, 0 ${s(i)})`;e.style.setProperty(`--vb-clip-below${a}-${t}`,l),e.style.setProperty(`--vb-clip-above${a}-${t}`,u)}}function G(e,t,n){let r=n;for(let e=0;e<t.length;e++)t[e][1]<r&&(r=t[e][1]);let i=Math.max(0,Math.min(.9,Math.floor((r-W)/n/U)*U));if(i===e.filterTop)return;e.filterTop=i;let a=1+Math.max(ue,le/n),o=e.filter;o.setAttribute(`x`,`-10%`),o.setAttribute(`width`,`120%`),o.setAttribute(`y`,`${(i*100).toFixed(0)}%`),o.setAttribute(`height`,`${((a-i)*100).toFixed(1)}%`)}function be(e,t,n){let{canvas:r,ctx:i,el:a,config:o}=e;if(!r||!i)return;let s=a.clientWidth,c=a.clientHeight;if(!s||!c)return;let l=Math.min(ie,typeof window<`u`&&window.devicePixelRatio||1),u=Math.round(s*l),d=Math.round(c*l);(r.width!==u||r.height!==d)&&(r.width=u,r.height=d),i.setTransform(l,0,0,l,0,0),i.clearRect(0,0,s,c);let f=e.haloCanvas,p=e.haloCtx;f&&p&&((f.width!==u||f.height!==d)&&(f.width=u,f.height=d),p.setTransform(l,0,0,l,0,0),p.clearRect(0,0,s,c));let m=Math.min(1,.6*o.bandStrength*t.strength);if(m<.005||o.bandWidth<=0)return;let h=o.theme===`dark`,g=o.bandWidth*(1+.35*t.level),_=o.bandAberration*(.35+.65*t.level),v=(4+12*_)*o.scale,y=4*_*o.scale,b=(e,t)=>{i.beginPath(),i.moveTo(n[0][0]+e,n[0][1]+t);for(let r=1;r<n.length;r++)i.lineTo(n[r][0]+e,n[r][1]+t)},x={r:o.bandColors.above,g:o.bandColors.mid,c:o.bandColors.core,b:o.bandColors.below},S=(h?.42:.4)*m,C=14*g,w=3.5*o.bandWidth/2,T=w*l,E=typeof i.filter==`string`,D=E?`0px`:`${w.toFixed(2)}px`;e.cssBlur!==D&&(a.style.setProperty(`--vb-band-blur-${o.id}`,D),a.style.setProperty(`--vb-band-halo-blur-${o.id}`,E?`0px`:`${(w*3).toFixed(2)}px`),e.cssBlur=D);let O=[[1,.16],[.72,.2],[.46,.26],[.22,.34]],k=[{rgb:x.r,a:1,ox:y,oy:-v},{rgb:x.g,a:.55,ox:y*.35,oy:-v*.35},{rgb:x.b,a:1,ox:-y,oy:v},{rgb:x.c,a:.9,ox:0,oy:0}];i.lineCap=`round`,i.lineJoin=`round`,i.globalCompositeOperation=`source-over`;let ee=n[0][0],te=n[n.length-1][0],A=(e,t)=>{let n=i.createLinearGradient(ee,0,te,0),r=o.bandTail>0?.015:.18;return n.addColorStop(0,`rgba(${e}, 0)`),n.addColorStop(r,`rgba(${e}, ${t.toFixed(3)})`),n.addColorStop(1-r,`rgba(${e}, ${t.toFixed(3)})`),n.addColorStop(1,`rgba(${e}, 0)`),n},j=!E&&p?p:i;E&&(i.filter=`blur(${(T*3).toFixed(1)}px)`),j.lineCap=`round`,j.lineJoin=`round`,j.strokeStyle=A(x.c,S*.3),j.lineWidth=C*2.2,j.beginPath(),j.moveTo(n[0][0],n[0][1]);for(let e=1;e<n.length;e++)j.lineTo(n[e][0],n[e][1]);j.stroke(),E&&(i.filter=`blur(${T.toFixed(1)}px)`);for(let e of k)for(let[t,n]of O)i.strokeStyle=A(e.rgb,S*e.a*n),i.lineWidth=Math.max(.6,C*t),b(e.ox,e.oy),i.stroke();E&&(i.filter=`none`),i.globalCompositeOperation=`source-over`}function xe(e){return(1-Math.cos(F*e))/2}function Se(e,t){let n=e.analyser,r=e.time,i=e.freq;n.getFloatTimeDomainData(r);let a=0;for(let e=0;e<r.length;e++)a+=r[e]*r[e];t.level=Math.sqrt(a/r.length)*ne*e.config.sensitivity,n.getByteFrequencyData(i);let o=n.context.sampleRate/n.fftSize;for(let n=0;n<3;n++){let[r,a]=re[n],s=Math.max(0,Math.floor(r/o)),c=Math.min(i.length-1,Math.ceil(a/o)),l=0;for(let e=s;e<=c;e++)l+=i[e];let u=c>=s?l/(c-s+1)/255:0;t.bands[n]=u*I*e.config.sensitivity}}var K={level:0,bands:[0,0,0]};function Ce(e){E=requestAnimationFrame(Ce);let t=A?e-A:0;if(A=e,j){if(M=!M,M)return;e>=P&&(j=!1,N=0)}else t>k?N?e-N>ee&&(j=!0,M=!1,P=e+te):N=e:N=0;e-D<O||(D=e,T.forEach(t=>{let{el:n,config:r,source:i,s:a}=t,o=r.paused;if(o&&t.paintedConfig===r)return;let l=o?0:a.lastTs?Math.min(.05,(e-a.lastTs)/1e3):1/60;a.lastTs=e,a.t+=l;let u=a.t;if(!o){if(t.analyser)Se(t,K);else{let e=i.getLevel?L(i.getLevel()):0;K.level=e,K.bands[0]=e,K.bands[1]=e*(.72+.28*Math.sin(u*9.1)),K.bands[2]=e*(.6+.4*Math.sin(u*13.7+2))}}let d=B(K.level,r.threshold);a.level=V(a.level,d,l,r.attack,r.release);for(let e=0;e<3;e++){let n=B(K.bands[e],r.threshold*.6);a.bands[e]=V(a.bands[e],n,l,r.attack,r.release*1.15),t.surface&&(a.fastBands[e]=V(a.fastBands[e],n,l,r.attack*.6,ce))}t.surface&&(a.fast=V(a.fast,d,l,r.attack*.6,ce));let f=c*r.lobeSpacing;if(!o){let e=i.getMotion?.();a.motion=e?{gather:L(e.gather),offset:e.offset??0,stretch:L(e.stretch??0),heldLevel:L(e.heldLevel??0),cornerFollow:L(e.cornerFollow??0)}:S}let p=a.motion,m=p.gather,h=n.clientWidth,g=n.clientHeight,_=r.reducedMotion?0:p.offset*f/2,v=1-m*.6,y=1-m*.45,b=1+m*.3*p.stretch,x=r.reducedMotion?.5:.5+.5*Math.sin(F*u/r.breatheDuration),C=a.level+(1-a.level)*r.idle*x,w=Math.max(0,Math.min(1,(m-.25)/.75)),T=w*w*(3-2*w),E=Math.max(C,p.heldLevel*T),D=.15+.85*E,O=.5+r.reach*E,k=(.85+r.spread*E)*b;r.flow!==0&&!r.reducedMotion&&(a.phase=((a.phase+r.flow*E*l)%f+f)%f,a.drift+=r.flow*E*l),n.style.setProperty(`--vb-level-${r.id}`,a.level.toFixed(3)),n.style.setProperty(`--vb-cx-${r.id}`,`${_.toFixed(1)}px`),n.style.setProperty(`--vb-mw-${r.id}`,y.toFixed(3));let ee=r.bend*E;n.style.setProperty(`--vb-bh-${r.id}`,`${Math.max(0,ee).toFixed(1)}px`);let te=r.bend>0?Math.min(1,ee/r.bend):0;n.style.setProperty(`--vb-bendA-${r.id}`,te.toFixed(3));let A={cx:_,w:k,h:O,mw:y,lift:ee,strength:te,level:a.level,corner:m},j=h/2+_*k,M=30*r.scale*k,N=ge(r.radius,h,g),P=m*p.cornerFollow;n.style.setProperty(`--vb-cy-${r.id}`,`${(-_e(j,h,N,M*1.4)*P).toFixed(1)}px`),a.warp=V(a.warp,m>.02?0:1,l,oe,ae);let ne=a.warp,I=t.displace!=null&&ne<se;if(I!==t.warpOff&&(t.warpOff=I,I?n.setAttribute(`data-voice-warp`,`off`):n.removeAttribute(`data-voice-warp`)),h&&g&&(t.ctx||t.displace)){let e=ve(r,A,h,g);(t.displace&&!I||r.coreLight>0)&&ye(n,r.id,e,h,g),t.filter&&!I&&H&&G(t,e,g),t.ctx&&be(t,A,e)}if(t.displace&&!I){let e=r.reducedMotion?0:r.distortion*120*r.scale*(.15+.85*E)*ne;t.displace.scale.baseVal=e,t.noiseShift&&(t.noiseShift.dx.baseVal=8*r.scale*Math.sin(u*.9),t.noiseShift.dy.baseVal=4*r.scale*Math.sin(u*.6+1.3))}n.style.setProperty(`--vb-glow-${r.id}`,D.toFixed(3)),n.style.setProperty(`--vb-h-${r.id}`,O.toFixed(3)),n.style.setProperty(`--vb-w-${r.id}`,k.toFixed(3));for(let e=0;e<s.length;e++){let t=s[e],i=R(t.x*r.lobeSpacing+a.phase,f),o=r.bands?.6+.7*a.bands[t.band]:1;n.style.setProperty(`--vb-x${e}-${r.id}`,`${(i*v).toFixed(1)}px`),n.style.setProperty(`--vb-l${e}-${r.id}`,(o*z(i,f)).toFixed(3));let c=h/2+(_+i*v)*k;n.style.setProperty(`--vb-y${e}-${r.id}`,`${(-_e(c,h,N,M)*P).toFixed(1)}px`)}let re=r.staticColors||r.reducedMotion||r.hueRange===0?0:-r.hueRange+2*r.hueRange*xe(u/r.hueDuration);n.style.setProperty(`--vb-hue-${r.id}`,`${re.toFixed(2)}deg`),t.onLevel?.(a.level),t.paintedConfig=r}))}function we(){E??=(D=0,A=0,N=0,requestAnimationFrame(Ce))}function Te(){T.size===0&&E!=null&&(cancelAnimationFrame(E),E=null)}function Ee(e,t,n,r){let i={el:e,config:t,source:n,onLevel:r,analyser:null,releaseAnalyser:null,time:null,freq:null,canvas:null,ctx:null,haloCanvas:null,haloCtx:null,displace:null,noiseShift:null,filter:null,filterTop:-1,s:w(e),paintedConfig:null,cssBlur:null,warpOff:e.hasAttribute(`data-voice-warp`),surface:null};t.distortion>0&&(i.displace=e.querySelector(`:scope > svg feDisplacementMap`),i.noiseShift=e.querySelector(`:scope > svg feOffset`),i.filter=e.querySelector(`:scope > svg filter`));let a=e.querySelector(`:scope > [data-voice-beam-band]`);if(a){i.canvas=a,i.ctx=a.getContext(`2d`);let t=e.querySelector(`:scope > [data-voice-beam-band-halo]`);t&&(i.haloCanvas=t,i.haloCtx=t.getContext(`2d`))}if(i.s.lastTs=0,n.stream){let e=y(n.stream);e&&(i.analyser=e.analyser,i.releaseAnalyser=e.release,i.time=new Float32Array(e.analyser.fftSize),i.freq=new Uint8Array(e.analyser.frequencyBinCount))}return T.add(i),we(),()=>{T.delete(i),i.releaseAnalyser?.(),Te()}}var De={scale:1,glowSize:1,strokeOpacity:1,innerOpacity:1,bloomOpacity:1,idle:.18,reach:1.2,spread:1.05,flow:48,bend:60,bandStrength:1.55,bandWidth:2.15,bandPosition:.35,bandCurve:1.75,bandSpread:.87,bandSkew:.12,bandOffset:-27,bandTail:.59,bandTailPosition:.67,bandTailCurve:2.4,bandTailOverflow:15,bandAberration:.89,distortion:.62,distortionDetail:2.3,glowWidth:.65,glowHeight:1.25,lobeSpacing:.85,rangeWidth:.75,rangeHeight:1,softness:1.07,coreSize:1,coreLight:0,coreLightWidth:1,coreLightHeight:1,strokeScale:1,innerScale:1,innerHeight:1,bloomScale:1,bloomHeight:1},Oe={default:{},pill:{scale:.45,glowSize:.95,strokeOpacity:1.2,innerOpacity:.85,reach:1.35,spread:1.1,flow:0,bend:23,bandStrength:1.55,bandWidth:1.85,bandCurve:1.95,bandSpread:.38,bandOffset:-16,bandTail:0,distortion:.45,distortionDetail:3,glowWidth:.65,glowHeight:.95,lobeSpacing:.45,rangeWidth:.8,rangeHeight:.7,softness:.88,coreSize:.25,strokeScale:1.25,innerScale:.95,bloomScale:1.05,bloomHeight:2.25},mobile:{scale:1.25,spread:.45,reach:3,flow:60,bend:70,bandWidth:2.4,bandCurve:1.55,bandSpread:.9,bandOffset:-50,bandTail:.62,bandTailPosition:.42,bandTailCurve:2.7,bandTailOverflow:22,bandStrength:1.8,distortionDetail:2,glowWidth:1.15,glowHeight:2.1,lobeSpacing:1.35,rangeWidth:1.25,rangeHeight:1.2,softness:1.1}},ke={default:{brightness:1.15},pill:{brightness:1.35,saturation:1.5},mobile:{strength:1,brightness:1.2,saturation:1.5}},Ae={default:{},pill:{},mobile:{strength:1}};function je(e=`default`,t=`dark`){return(t===`light`?Ae[e]:void 0)??ke[e]}var Me={default:{bandStrength:1.7},pill:{bandStrength:2},mobile:{bandStrength:1.7}};function Ne(e=`default`,t=`dark`){let n=Oe[e],r={};return t===`light`&&(n.reach===void 0&&(r.reach=1.8),n.spread===void 0&&(r.spread=.8),n.coreLight===void 0&&(r.coreLight=1.8)),{...De,...r,...n,...t===`light`?Me[e]:void 0}}var q=e(t(),1),J=e(n(),1),Pe={dark:{core:`255, 255, 255`,above:`255, 70, 80`,mid:`90, 255, 150`,below:`80, 140, 255`},light:{core:`197, 139, 255`,above:`255, 122, 182`,mid:`126, 196, 255`,below:`45, 255, 171`}},Fe=1,Ie=16,Le=6e4,Re=typeof navigator<`u`&&/AppleWebKit/.test(navigator.userAgent)&&!/Chrome\/|Chromium\/|Edg\/|OPR\//.test(navigator.userAgent),ze=(()=>{if(typeof document>`u`)return!0;let e=document.createElement(`canvas`).getContext(`2d`);return!!e&&typeof e.filter==`string`})();function Be(){let[e,t]=(0,q.useState)(()=>typeof window>`u`||window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`);return(0,q.useEffect)(()=>{if(typeof window>`u`)return;let e=window.matchMedia(`(prefers-color-scheme: dark)`),n=e=>t(e.matches?`dark`:`light`);return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[]),e}function Ve(){let[e,t]=(0,q.useState)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches);return(0,q.useEffect)(()=>{if(typeof window>`u`||!window.matchMedia)return;let e=window.matchMedia(`(prefers-reduced-motion: reduce)`),n=e=>t(e.matches);return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[]),e}function He(e,t){return e===`auto`?t:e}var Ue=(0,q.forwardRef)(function({children:e,type:t=`default`,look:n=`glow`,dotSize:r=1,dotGap:i=1,dotShape:s=`round`,lineWidth:c=1,lineGap:l=1,linePattern:u=`rows`,seeThrough:d=!1,texture:f=.6,gravity:p=1,surfaceHeight:h=1,surfaceCurve:g=1,surfaceTail:_=0,surfaceTailPosition:v=.6,surfaceTailCurve:y=2.4,surfaceFade:b=.2,scale:x,stream:S=null,level:C=0,sensitivity:w=3.1,threshold:T=.015,attack:E=.325,release:D=.86,idle:O,breatheDuration:k=5.2,reach:ee,spread:te,bands:A=!0,flow:j,motion:M=null,colorVariant:N=`colorful`,colors:P,bandColors:F,theme:ne=`dark`,staticColors:I=!1,hueRange:re,hueDuration:L,active:R=!0,paused:z=!1,borderRadius:B,brightness:V,saturation:ie,glowSize:ae,strokeOpacity:oe,innerOpacity:se,bloomOpacity:ce,bend:H,bandStrength:U,bandWidth:W,bandPosition:le,bandCurve:ue,bandSpread:de,bandSkew:fe,bandOffset:pe,bandTail:me,bandTailPosition:he,bandTailCurve:ge,bandTailOverflow:_e,bandAberration:ve,distortion:ye,distortionDetail:G,glowWidth:be,glowHeight:xe,lobeSpacing:Se,rangeWidth:K,rangeHeight:Ce,softness:we,coreSize:Te,coreLight:De,coreLightWidth:Oe,coreLightHeight:ke,strokeScale:Ae,innerScale:Me,innerHeight:Ue,bloomScale:We,bloomHeight:Ge,strength:Ke,className:qe,style:Je,css:Ye,onLevel:Xe,onActivate:Ze,onDeactivate:Qe,onAnimationEnd:$e,...et},tt){let nt=(0,q.useId)().replace(/:/g,`-`),Y=He(ne,Be()),rt=P?P.join(`|`):``,it=F?[F.core,F.above,F.mid,F.below].join(`|`):``,X=Ne(t,Y),Z=Math.max(.05,x??X.scale),at=ae??X.glowSize,ot=oe??X.strokeOpacity,st=se??X.innerOpacity,ct=ce??X.bloomOpacity,lt=O??X.idle,ut=ee??X.reach,dt=te??X.spread,ft=(j??X.flow)*Z,pt=(H??X.bend)*Z,mt=U??X.bandStrength,ht=(W??X.bandWidth)*Z,gt=le??X.bandPosition,_t=ue??X.bandCurve,vt=de??X.bandSpread,yt=fe??X.bandSkew,bt=(pe??X.bandOffset)*Z,xt=me??X.bandTail,St=he??X.bandTailPosition,Ct=ge??X.bandTailCurve,wt=(_e??X.bandTailOverflow)*Z,Tt=ve??X.bandAberration,Et=ye??X.distortion,Dt=(G??X.distortionDetail)/Z,Ot=(be??X.glowWidth)*Z,kt=(xe??X.glowHeight)*Z,At=(Se??X.lobeSpacing)*Z,jt=(K??X.rangeWidth)*Z,Mt=(Ce??X.rangeHeight)*Z,Nt=we??X.softness,Pt=(Te??X.coreSize)*Z,Ft=Math.max(0,Math.min(3,De??X.coreLight)),It=Oe??X.coreLightWidth,Lt=ke??X.coreLightHeight,Rt=Ae??X.strokeScale,zt=Me??X.innerScale,Bt=Ue??X.innerHeight,Vt=We??X.bloomScale,Ht=Ge??X.bloomHeight,Ut=Ve(),Wt=(0,q.useRef)(null),[Gt,Kt]=(0,q.useState)(R),[Q,qt]=(0,q.useState)(!1),[Jt,Yt]=(0,q.useState)(!0),[Xt,Zt]=(0,q.useState)(null),[Qt,$t]=(0,q.useState)(0);(0,q.useEffect)(()=>{if(!Re)return;let e=Wt.current;if(!e)return;let t=()=>$t(e.clientWidth*e.clientHeight);if(t(),typeof ResizeObserver>`u`)return;let n=new ResizeObserver(t);return n.observe(e),()=>n.disconnect()},[]);let en=`glow`,tn=Re&&Qt>Le?0:Et;(0,q.useEffect)(()=>{if(B!=null)return;let e=Wt.current;if(!e)return;let t=()=>{let t=e.firstElementChild;if(!t)return;let n=getComputedStyle(t),r=parseFloat(n.borderTopLeftRadius);!isNaN(r)&&r>0&&Zt(r)};t();let n=new MutationObserver(t);return n.observe(e,{childList:!0,subtree:!1}),()=>n.disconnect()},[B,e]),(0,q.useEffect)(()=>{R&&!Gt&&!Q?Kt(!0):!R&&Gt&&!Q&&qt(!0)},[R,Gt,Q]),(0,q.useEffect)(()=>{let e=Wt.current;if(!e||typeof IntersectionObserver>`u`)return;let t=new IntersectionObserver(e=>{for(let t of e)Yt(t.isIntersecting)},{rootMargin:`256px`});return t.observe(e),()=>t.disconnect()},[]);let nn=(0,q.useCallback)(e=>{let t=e.animationName;t.includes(`fade-out`)?(Kt(!1),qt(!1),Qe?.()):t.includes(`fade-in`)&&Ze?.(),$e?.(e)},[Ze,Qe,$e]),$=o[Y],rn=B??Xt??Ie,an=je(t,Y),on=Ke??an.strength??$.strength??1,sn=re??$.hueRange??24,cn=L??$.hueDuration??12,ln=V??an.brightness??$.brightness,un=ie??an.saturation??$.saturation,dn=(0,q.useMemo)(()=>m({id:nt,borderRadius:rn,borderWidth:Fe,strokeOpacity:$.strokeOpacity*ot,innerOpacity:$.innerOpacity*st,bloomOpacity:$.bloomOpacity*ct,innerShadow:$.innerShadow,colorVariant:N,colors:P,brightness:ln,saturation:un,theme:Y,hueBase:$.hueBase??0,glowSize:at*Z,glowWidth:Ot,glowHeight:kt,strokeScale:Rt,innerScale:zt,innerHeight:Bt,bloomScale:Vt,bloomHeight:Ht,coreSize:Pt,coreLight:Ft,coreLightWidth:It,coreLightHeight:Lt,rangeWidth:jt,rangeHeight:Mt,softness:Nt,distortion:tn>0,scale:Z,look:en}),[nt,rn,$,N,rt,ln,un,Y,X,at,ot,st,ct,Z,Ot,kt,Rt,zt,Bt,Vt,Ht,Pt,Ft,It,Lt,jt,Mt,Nt,tn>0,en]),fn=(0,q.useMemo)(()=>({id:nt,sensitivity:Math.max(0,w),threshold:Math.max(0,Math.min(.95,T)),attack:Math.max(0,E),release:Math.max(0,D),idle:Math.max(0,Math.min(1,lt)),breatheDuration:Math.max(.2,k),reach:Math.max(0,ut),spread:Math.max(0,dt),bands:A,flow:ft,lobeSpacing:Math.max(.1,At),bend:Math.max(0,pt),bandStrength:Math.max(0,mt),bandWidth:Math.max(0,ht),bandPosition:Math.max(0,gt),bandCurve:Math.max(.3,_t),bandSpread:Math.max(.05,vt),bandSkew:Math.max(-.9,Math.min(.9,yt)),bandOffset:bt,bandTail:Math.max(0,Math.min(1.5,xt)),bandTailPosition:Math.max(0,Math.min(.98,St)),bandTailCurve:Math.max(.5,Ct),bandTailOverflow:Math.max(0,wt),bandAberration:Math.max(0,Math.min(1,Tt)),rangeWidth:jt,rangeHeight:Mt,theme:Y,bandColors:{core:F?.core&&a(F.core)||Pe[Y].core,above:F?.above&&a(F.above)||Pe[Y].above,mid:F?.mid&&a(F.mid)||Pe[Y].mid,below:F?.below&&a(F.below)||Pe[Y].below},distortion:Math.max(0,Math.min(1,tn)),coreLight:Ft,scale:Z,radius:rn,hueRange:Math.max(0,sn),hueDuration:Math.max(.5,cn),staticColors:N===`mono`||I,reducedMotion:Ut,paused:z,look:en,dotSize:Math.max(.1,r),dotGap:Math.max(.3,i),dotShape:s===`square`?`square`:`round`,lineWidth:Math.max(.05,c),lineGap:Math.max(.3,l),linePattern:u===`columns`||u===`grid`?u:`rows`,seeThrough:d,texture:Math.max(0,Math.min(1,f)),gravity:Math.max(.05,p),surfaceHeight:Math.max(.1,h),surfaceCurve:Math.max(-3,Math.min(5,g)),surfaceTail:Math.max(-2,Math.min(3,_)),surfaceTailPosition:Math.max(0,Math.min(.98,v)),surfaceTailCurve:Math.max(.5,y),surfaceFade:Math.max(0,Math.min(1,b)),layers:{glowWidth:Ot,glowHeight:kt,innerScale:zt,innerHeight:Bt,bloomScale:Vt,bloomHeight:Ht,strokeScale:Rt,softness:Nt,coreSize:Pt,innerOpacity:st,bloomOpacity:ct,strokeOpacity:ot,brightness:ln}}),[nt,w,T,E,D,lt,k,ut,dt,A,ft,At,pt,mt,ht,gt,_t,vt,yt,bt,xt,St,Ct,wt,Tt,jt,Mt,Y,it,tn,Ft,Z,rn,sn,cn,I,N,Ut,z,en,r,i,s,c,l,u,d,f,p,h,g,_,v,y,b,Ot,kt,zt,Bt,Vt,Ht,Rt,Nt,Pt,st,ct,ot,ln]),pn=(0,q.useRef)(C);pn.current=C;let mn=(0,q.useRef)(Xe);mn.current=Xe;let hn=(0,q.useRef)(M);hn.current=M,(0,q.useEffect)(()=>{if(!(Gt||Q)||!Jt)return;let e=Wt.current;return e?Ee(e,fn,{stream:S,getLevel:()=>{let e=pn.current;return typeof e==`function`?e():e},getMotion:()=>{let e=hn.current;return typeof e==`function`?e():e}},e=>mn.current?.(e)):void 0},[fn,S,Gt,Q,Jt]);let gn=(0,q.useCallback)(e=>{Wt.current=e,typeof tt==`function`?tt(e):tt&&(tt.current=e)},[tt]),_n={...Je??{},"--voice-strength":Math.max(0,Math.min(1,on))};return(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(`style`,{children:Ye?`${dn}\n${Ye.split(`{id}`).join(nt)}`:dn}),(0,J.jsxs)(`div`,{...et,ref:gn,"data-voice-beam":nt,"data-voice-type":t,"data-voice-look":en,"data-voice-halfres":``,"data-active":Gt&&!Q?``:void 0,"data-fading":Q?``:void 0,"data-paused":Gt&&!Q&&(!Jt||z)?``:void 0,"data-listening":S?``:void 0,className:qe,style:_n,onAnimationEnd:nn,children:[e,!1,(0,J.jsx)(`div`,{"data-voice-beam-bloom":!0}),tn>0&&(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(`div`,{"data-voice-beam-warp":`inner`}),(0,J.jsx)(`div`,{"data-voice-beam-warp":`bloom`})]}),!ze&&(0,J.jsx)(`canvas`,{"data-voice-beam-band-halo":!0,"aria-hidden":`true`}),(0,J.jsx)(`canvas`,{"data-voice-beam-band":!0,"aria-hidden":`true`}),Ft>0&&(0,J.jsx)(`div`,{"data-voice-beam-core":!0,children:(0,J.jsx)(`div`,{})}),tn>0&&(0,J.jsx)(`svg`,{"aria-hidden":`true`,width:`0`,height:`0`,style:{position:`absolute`,pointerEvents:`none`},children:(0,J.jsxs)(`filter`,{id:`vb-distort-${nt}`,x:`-20%`,y:`-20%`,width:`140%`,height:`140%`,colorInterpolationFilters:`sRGB`,children:[(0,J.jsx)(`feTurbulence`,{type:`fractalNoise`,baseFrequency:`${(.012*Dt).toFixed(4)} ${(.05*Dt).toFixed(4)}`,numOctaves:2,seed:7,result:`noise`}),(0,J.jsx)(`feOffset`,{in:`noise`,dx:`0`,dy:`0`,result:`moved`}),(0,J.jsx)(`feColorMatrix`,{in:`moved`,type:`matrix`,values:`1 0 0 0 0  0 0 0 0 0.5  0 0 0 0 0  0 0 0 0 1`,result:`map`}),(0,J.jsx)(`feDisplacementMap`,{in:`SourceGraphic`,in2:`map`,scale:0,xChannelSelector:`R`,yChannelSelector:`G`})]})})]})]})}),We=[{from:`me`,text:`How is the migration going?`,time:`10:24`},{from:`agent`,text:`Ahead of schedule. Two of the four tables are copied, and the checksums match.`,time:`10:24`}];function Ge(){return(0,J.jsxs)(`div`,{className:`w-[600px] rounded-3xl bg-[#08080a] p-8`,children:[(0,J.jsx)(`div`,{className:`flex flex-col gap-3`,children:We.map(e=>(0,J.jsxs)(`div`,{className:e.from===`me`?`ms-auto max-w-[72%] rounded-2xl rounded-br-md bg-[#1b1b21] px-4 py-2.5`:`max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-2.5`,children:[(0,J.jsx)(`p`,{className:`text-[13.5px] leading-relaxed text-white/85`,children:e.text}),(0,J.jsx)(`p`,{className:`mt-1 text-[10px] text-white/30`,children:e.time})]},e.text))}),(0,J.jsxs)(`div`,{className:`mt-6`,children:[(0,J.jsx)(Ue,{type:`default`,level:.62,theme:`dark`,children:(0,J.jsxs)(`div`,{className:`flex items-center gap-3 rounded-2xl bg-[#101014] px-4 py-3.5 ring-1 ring-white/10`,children:[(0,J.jsx)(`span`,{className:`grid size-8 place-items-center rounded-full bg-white/[0.06] text-white/60`,children:`●`}),(0,J.jsx)(`span`,{className:`text-[13.5px] text-white/50`,children:`Listening — speak your next message`}),(0,J.jsx)(`span`,{className:`ms-auto grid size-8 place-items-center rounded-full bg-[#2a1030] text-[13px] text-pink-300`,children:`↑`})]})}),(0,J.jsx)(`p`,{className:`mt-2 px-1 text-[11px] text-white/30`,children:`level 0.62, driven by hand — the same beam follows a microphone stream through useMicrophone().`})]})]})}export{Ge as default};