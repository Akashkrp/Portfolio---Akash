"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function CyberCoreScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    const width = container.clientWidth || 440;
    const height = container.clientHeight || 440;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // CELESTIAL SYSTEM GROUP
    const celestialGroup = new THREE.Group();
    // Tilt the entire planetary system on its axial tilt (approx 26 degrees)
    celestialGroup.rotation.z = THREE.MathUtils.degToRad(24);
    celestialGroup.rotation.x = THREE.MathUtils.degToRad(18);
    scene.add(celestialGroup);

    // 1. CENTRAL CELESTIAL EXOPLANET SPHERE
    const planetGeo = new THREE.SphereGeometry(1.65, 48, 48);

    // Generate procedural celestial topography texture via canvas
    const planetCanvas = document.createElement("canvas");
    planetCanvas.width = 512;
    planetCanvas.height = 256;
    const pCtx = planetCanvas.getContext("2d");
    if (pCtx) {
      // Cosmic gradient base
      const grad = pCtx.createLinearGradient(0, 0, 512, 256);
      grad.addColorStop(0, "#081026");
      grad.addColorStop(0.3, "#0f172a");
      grad.addColorStop(0.6, "#1e293b");
      grad.addColorStop(1, "#030712");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 512, 256);

      // Celestial atmospheric bands
      for (let i = 0; i < 20; i++) {
        pCtx.fillStyle = i % 2 === 0 ? "rgba(56, 189, 248, 0.08)" : "rgba(129, 140, 248, 0.06)";
        pCtx.fillRect(0, i * 13, 512, 6 + Math.random() * 8);
      }

      // Constellation star speckles on surface
      pCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
      for (let i = 0; i < 80; i++) {
        pCtx.beginPath();
        pCtx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 1.5, 0, Math.PI * 2);
        pCtx.fill();
      }
    }
    const planetTexture = new THREE.CanvasTexture(planetCanvas);

    const planetMat = new THREE.MeshStandardMaterial({
      map: planetTexture,
      roughness: 0.7,
      metalness: 0.15,
      color: 0x93c5fd,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    celestialGroup.add(planet);

    // 2. ATMOSPHERIC SHIMMER & CELESTIAL WIREFRAME GRID
    const atmoWireGeo = new THREE.SphereGeometry(1.68, 24, 24);
    const atmoWireMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const atmoWire = new THREE.Mesh(atmoWireGeo, atmoWireMat);
    celestialGroup.add(atmoWire);

    // 3. SATURN-LIKE CELESTIAL DUST RING (ACCRETION DISK)
    const ringParticleCount = 2800;
    const ringGeo = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(ringParticleCount * 3);
    const ringColors = new Float32Array(ringParticleCount * 3);

    const innerRadius = 2.25;
    const outerRadius = 3.8;

    const ringIce = new THREE.Color(0xe0f2fe);
    const ringSky = new THREE.Color(0x38bdf8);
    const ringViolet = new THREE.Color(0x818cf8);
    const ringGold = new THREE.Color(0xfef08a);

    for (let i = 0; i < ringParticleCount; i++) {
      // Clustered bands with a Cassini division gap
      let r = innerRadius + Math.pow(Math.random(), 0.9) * (outerRadius - innerRadius);
      // Cassini Division gap simulation
      if (r > 2.95 && r < 3.12) {
        r = Math.random() > 0.5 ? 2.92 : 3.15;
      }

      const theta = Math.random() * Math.PI * 2;
      const heightDev = (Math.random() - 0.5) * 0.08;

      ringPositions[i * 3] = r * Math.cos(theta);
      ringPositions[i * 3 + 1] = heightDev;
      ringPositions[i * 3 + 2] = r * Math.sin(theta);

      const colRand = Math.random();
      const c = colRand < 0.4 ? ringIce : colRand < 0.75 ? ringSky : colRand < 0.92 ? ringViolet : ringGold;
      ringColors[i * 3] = c.r;
      ringColors[i * 3 + 1] = c.g;
      ringColors[i * 3 + 2] = c.b;
    }

    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));
    ringGeo.setAttribute("color", new THREE.BufferAttribute(ringColors, 3));

    const ringMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const planetaryRing = new THREE.Points(ringGeo, ringMat);
    celestialGroup.add(planetaryRing);

    // 4. ORBITING MOON / SATELLITE
    const moonGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.9,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    celestialGroup.add(moon);

    // Moon 2 (Smaller Outer Orbiter)
    const moon2Geo = new THREE.SphereGeometry(0.1, 12, 12);
    const moon2Mat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      roughness: 0.8,
    });
    const moon2 = new THREE.Mesh(moon2Geo, moon2Mat);
    celestialGroup.add(moon2);

    // 5. SUPERNOVA SHOCKWAVE PULSE RING
    const pulseRingGeo = new THREE.RingGeometry(1.65, 1.72, 64);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
    pulseRing.rotation.x = Math.PI / 2;
    celestialGroup.add(pulseRing);

    // LIGHTING (Distant Sun illumination)
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(5, 4, 6);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    // MOUSE TILT PHYSICS
    let targetRotY = 0;
    let targetRotX = 0;
    let pulseScale = 1.0;
    let pulseActive = false;
    let pulseOpacity = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.6;
      targetRotX = -y * 0.4;
    };

    const handleClick = () => {
      pulseActive = true;
      pulseScale = 1.0;
      pulseOpacity = 0.9;
      setPulseCount((c) => c + 1);
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handleClick);

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // ANIMATION LOOP
    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth mouse tilt lerp
      celestialGroup.rotation.y += (targetRotY - (celestialGroup.rotation.y - 0.2)) * 0.04 + 0.003;
      celestialGroup.rotation.x += (targetRotX + THREE.MathUtils.degToRad(18) - celestialGroup.rotation.x) * 0.04;

      // Planet axial rotation
      planet.rotation.y = elapsed * 0.12;
      atmoWire.rotation.y = elapsed * 0.08;

      // Ring rotation
      planetaryRing.rotation.y = elapsed * 0.04;

      // Moon 1 elliptical orbit
      const moonAngle = elapsed * 0.6;
      moon.position.x = Math.cos(moonAngle) * 4.2;
      moon.position.z = Math.sin(moonAngle) * 4.2;
      moon.position.y = Math.sin(moonAngle * 1.5) * 0.7;

      // Moon 2 faster reverse orbit
      const moon2Angle = -elapsed * 0.9 + 1.5;
      moon2.position.x = Math.cos(moon2Angle) * 3.1;
      moon2.position.z = Math.sin(moon2Angle) * 3.1;
      moon2.position.y = Math.cos(moon2Angle) * 0.4;

      // Shockwave pulse expansion on click
      if (pulseActive) {
        pulseScale += 0.06;
        pulseOpacity -= 0.02;
        pulseRing.scale.set(pulseScale, pulseScale, pulseScale);
        pulseRingMat.opacity = Math.max(0, pulseOpacity);

        if (pulseOpacity <= 0) {
          pulseActive = false;
        }
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("click", handleClick);
      resizeObserver.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      planetGeo.dispose();
      planetMat.dispose();
      planetTexture.dispose();
      atmoWireGeo.dispose();
      atmoWireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      moon2Geo.dispose();
      moon2Mat.dispose();
      pulseRingGeo.dispose();
      pulseRingMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center select-none group">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-pointer relative z-10"
        title="Interactive 3D Celestial Body: Orbit with mouse, click to trigger cosmic shockwave"
      />

      {/* Cosmic Deep Starlight Ambient Glow */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-sky-500/10 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10 group-hover:from-sky-500/20 group-hover:via-indigo-600/20 transition-all duration-700" />

      {/* Subtle Orbital Orbit Path Rings */}
      <div className="absolute inset-8 rounded-full border border-sky-400/10 pointer-events-none" />
      <div className="absolute inset-16 rounded-full border border-indigo-400/10 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none" />

      {/* Celestial HUD Status Pills */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 border border-sky-500/30 text-[11px] font-mono text-sky-300 backdrop-blur-md shadow-lg shadow-black/60">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>COSMOS SYSTEM // 3D EXOPLANET</span>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 border border-indigo-500/30 text-[11px] font-mono text-slate-300 backdrop-blur-md">
          <span>{pulseCount > 0 ? `SHOCKWAVE #${pulseCount}` : "CLICK TO PULSE"}</span>
        </div>
      </div>
    </div>
  );
}
