"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const DEPTH = 2400;

const starVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uTravel;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.z = mod(p.z + uTravel, ${DEPTH.toFixed(1)}) - ${(DEPTH - 50).toFixed(1)};
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float twinkle = 0.65 + 0.35 * sin(uTime * (0.6 + aPhase) + aPhase * 40.0);
    float fadeIn = smoothstep(${(-DEPTH + 50).toFixed(1)}, ${(-DEPTH + 600).toFixed(1)}, p.z);
    vAlpha = twinkle * fadeIn;
    vColor = aColor;
    gl_PointSize = aSize * uPixelRatio * (420.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const starFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.5, 0.0, d);
    core = pow(core, 2.6);
    // faint diffraction spikes for the brighter stars
    float spikes = max(0.0, 1.0 - abs(uv.x) * 28.0) * max(0.0, 1.0 - abs(uv.y) * 2.2)
                 + max(0.0, 1.0 - abs(uv.y) * 28.0) * max(0.0, 1.0 - abs(uv.x) * 2.2);
    float a = (core + spikes * 0.35) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

const streakVertex = /* glsl */ `
  attribute float aEnd;
  attribute vec3 aColor;
  uniform float uTravel;
  uniform float uVelocity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.z = mod(p.z + uTravel, ${DEPTH.toFixed(1)}) - ${(DEPTH - 50).toFixed(1)};
    p.z -= aEnd * uVelocity * 9.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vColor = aColor;
    vAlpha = (1.0 - aEnd) * clamp(abs(uVelocity) / 30.0, 0.0, 0.9);
    gl_Position = projectionMatrix * mv;
  }
`;

const streakFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

const nebulaVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

const nebulaFragment = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uRes.x / uRes.y;
    vec2 p = uv * 1.6 + vec2(uTime * 0.008, -uScroll * 0.00018) + uMouse * 0.04;
    float n = fbm(p + fbm(p * 1.3 + uTime * 0.01));
    float band = smoothstep(0.42, 0.95, n);
    vec3 violet = vec3(0.36, 0.25, 0.75);
    vec3 ion = vec3(0.16, 0.45, 0.70);
    vec3 dust = vec3(0.70, 0.42, 0.20);
    float shift = fbm(p * 0.7 + 3.0);
    vec3 col = mix(violet, ion, smoothstep(0.3, 0.7, shift));
    col = mix(col, dust, smoothstep(0.62, 0.85, fbm(p * 0.5 - 7.0)) * 0.5);
    float vignette = smoothstep(1.25, 0.2, length(vUv - 0.5) * 1.6);
    gl_FragColor = vec4(col * band * 0.22 * vignette, 1.0);
  }
`;

export default function Starfield() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the CSS background still shows
    }
    const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x05040b, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, DEPTH + 200);

    // Nebula backdrop
    const nebulaUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2() },
    };
    const nebula = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader: nebulaVertex,
        fragmentShader: nebulaFragment,
        uniforms: nebulaUniforms,
        depthWrite: false,
        depthTest: false,
      })
    );
    nebula.frustumCulled = false;
    nebula.renderOrder = -1;
    scene.add(nebula);

    // Stars
    const count = isSmall ? 1400 : 3200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#e8f7ff"),
      new THREE.Color("#9fdcff"),
      new THREE.Color("#c3b3ff"),
      new THREE.Color("#ffd9a8"),
    ];
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.sqrt(Math.random()) * 1500;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r * (window.innerWidth / window.innerHeight);
      positions[i * 3 + 1] = Math.sin(a) * r;
      positions[i * 3 + 2] = Math.random() * DEPTH;
      const roll = Math.random();
      const c = palette[roll < 0.45 ? 0 : roll < 0.7 ? 1 : roll < 0.85 ? 2 : roll < 0.94 ? 3 : 4];
      colors.set([c.r, c.g, c.b], i * 3);
      sizes[i] = roll > 0.985 ? 9 + Math.random() * 6 : 2 + Math.random() * 3.5;
      phases[i] = Math.random();
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    starGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    starGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    const starUniforms = {
      uTime: { value: 0 },
      uTravel: { value: 0 },
      uPixelRatio: { value: pixelRatio },
    };
    const starMat = new THREE.ShaderMaterial({
      vertexShader: starVertex,
      fragmentShader: starFragment,
      uniforms: starUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    stars.frustumCulled = false;
    scene.add(stars);

    // Warp streaks: two vertices per star, the tail vertex trails by scroll velocity
    const streakCount = Math.floor(count / 2);
    const sPos = new Float32Array(streakCount * 6);
    const sCol = new Float32Array(streakCount * 6);
    const sEnd = new Float32Array(streakCount * 2);
    for (let i = 0; i < streakCount; i++) {
      for (let k = 0; k < 2; k++) {
        sPos.set(positions.subarray(i * 3, i * 3 + 3), (i * 2 + k) * 3);
        sCol.set(colors.subarray(i * 3, i * 3 + 3), (i * 2 + k) * 3);
        sEnd[i * 2 + k] = k;
      }
    }
    const streakGeo = new THREE.BufferGeometry();
    streakGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    streakGeo.setAttribute("aColor", new THREE.BufferAttribute(sCol, 3));
    streakGeo.setAttribute("aEnd", new THREE.BufferAttribute(sEnd, 1));
    const streakUniforms = { uTravel: starUniforms.uTravel, uVelocity: { value: 0 } };
    const streakMat = new THREE.ShaderMaterial({
      vertexShader: streakVertex,
      fragmentShader: streakFragment,
      uniforms: streakUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const streaks = new THREE.LineSegments(streakGeo, streakMat);
    streaks.frustumCulled = false;
    scene.add(streaks);

    // Input
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      nebulaUniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", onResize);

    let lastScroll = window.scrollY;
    let velocity = 0;
    let travel = 0;
    let raf = 0;
    let visible = true;
    const clock = new THREE.Clock();

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) {
        clock.getDelta();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    function tick() {
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      const scroll = window.scrollY;
      const dScroll = scroll - lastScroll;
      lastScroll = scroll;
      velocity += (dScroll - velocity) * 0.12;

      if (!reduceMotion) {
        travel += dt * 18 + dScroll * 0.9;
      }
      starUniforms.uTime.value = t;
      starUniforms.uTravel.value = travel;
      streakUniforms.uVelocity.value = reduceMotion ? 0 : velocity;
      nebulaUniforms.uTime.value = reduceMotion ? 0 : t;
      nebulaUniforms.uScroll.value = scroll;

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      nebulaUniforms.uMouse.value.set(mouse.x, -mouse.y);
      camera.rotation.y = -mouse.x * 0.12;
      camera.rotation.x = -mouse.y * 0.08;
      camera.rotation.z = reduceMotion ? 0 : Math.sin(t * 0.05) * 0.04 + velocity * 0.0004;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      starGeo.dispose();
      starMat.dispose();
      streakGeo.dispose();
      streakMat.dispose();
      nebula.geometry.dispose();
      (nebula.material as THREE.Material).dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none bg-void" aria-hidden="true" />;
}
