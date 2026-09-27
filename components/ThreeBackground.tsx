"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03050e, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. MULTI-TIER STARFIELD (Deep Cosmos)
    const starCount = 2200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const whiteStar = new THREE.Color(0xffffff);
    const skyStar = new THREE.Color(0x93c5fd);
    const violetStar = new THREE.Color(0xc4b5fd);
    const goldStar = new THREE.Color(0xfef08a);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 2200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 2200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 2200;

      const rand = Math.random();
      const col = rand < 0.55 ? whiteStar : rand < 0.8 ? skyStar : rand < 0.93 ? violetStar : goldStar;
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;

      // Realistic magnitude variance
      starSizes[i] = rand < 0.08 ? 3.5 : rand < 0.3 ? 2.2 : 1.2;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    // Star particle texture
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 32;
    starCanvas.height = 32;
    const sCtx = starCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.2, "rgba(224,242,254,0.9)");
      grad.addColorStop(0.5, "rgba(186,230,253,0.3)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 32, 32);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starMaterial = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMaterial);
    scene.add(starField);

    // 2. COSMIC NEBULA CLOUD PARTICLES
    const nebulaCount = 200;
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaCols = new Float32Array(nebulaCount * 3);

    const deepIndigo = new THREE.Color(0x312e81);
    const twilightBlue = new THREE.Color(0x1e3a8a);
    const stellarAmethyst = new THREE.Color(0x4c1d95);

    for (let i = 0; i < nebulaCount; i++) {
      nebulaPos[i * 3] = (Math.random() - 0.5) * 1400;
      nebulaPos[i * 3 + 1] = (Math.random() - 0.5) * 1400;
      nebulaPos[i * 3 + 2] = (Math.random() - 0.5) * 1000 - 200;

      const nRand = Math.random();
      const nCol = nRand < 0.4 ? deepIndigo : nRand < 0.7 ? twilightBlue : stellarAmethyst;
      nebulaCols[i * 3] = nCol.r;
      nebulaCols[i * 3 + 1] = nCol.g;
      nebulaCols[i * 3 + 2] = nCol.b;
    }

    nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute("color", new THREE.BufferAttribute(nebulaCols, 3));

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 38,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nebulaCloud = new THREE.Points(nebulaGeo, nebulaMaterial);
    scene.add(nebulaCloud);

    // 3. SHOOTING STARS / METEORS ENGINE
    const maxMeteors = 5;
    const meteors: Array<{
      line: THREE.Line;
      geo: THREE.BufferGeometry;
      positions: Float32Array;
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      len: number;
      life: number;
      active: boolean;
    }> = [];

    const meteorMat = new THREE.LineBasicMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < maxMeteors; i++) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(6);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const line = new THREE.Line(geo, meteorMat);
      line.visible = false;
      scene.add(line);

      meteors.push({
        line,
        geo,
        positions: pos,
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        len: 40 + Math.random() * 40,
        life: 0,
        active: false,
      });
    }

    const resetMeteor = (m: (typeof meteors)[0]) => {
      m.x = (Math.random() - 0.5) * 1000 + 200;
      m.y = Math.random() * 500 + 100;
      m.z = (Math.random() - 0.5) * 400;

      // Diagonal streak downward
      const speed = 12 + Math.random() * 10;
      m.vx = -speed;
      m.vy = -speed * (0.6 + Math.random() * 0.4);
      m.vz = (Math.random() - 0.5) * 3;
      m.life = 1.0;
      m.active = true;
      m.line.visible = true;
    };

    // MOUSE PARALLAX
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX - window.innerWidth / 2) * 0.15;
      targetMouseY = (event.clientY - window.innerHeight / 2) * 0.15;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let nextMeteorTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.025;
      currentMouseY += (targetMouseY - currentMouseY) * 0.025;

      camera.position.x = currentMouseX;
      camera.position.y = -currentMouseY + 20;
      camera.lookAt(0, 0, 0);

      // Deep space celestial drift
      starField.rotation.y = elapsedTime * 0.012;
      starField.rotation.x = Math.sin(elapsedTime * 0.008) * 0.05;

      nebulaCloud.rotation.y = -elapsedTime * 0.008;
      nebulaCloud.rotation.z = Math.cos(elapsedTime * 0.006) * 0.03;

      // Spawn shooting stars periodically
      nextMeteorTimer += delta;
      if (nextMeteorTimer > 2.2) {
        nextMeteorTimer = 0;
        const idleMeteor = meteors.find((m) => !m.active);
        if (idleMeteor) {
          resetMeteor(idleMeteor);
        }
      }

      // Update meteors
      meteors.forEach((m) => {
        if (!m.active) return;

        m.x += m.vx;
        m.y += m.vy;
        m.z += m.vz;
        m.life -= delta * 1.2;

        const tailX = m.x - m.vx * 2.5;
        const tailY = m.y - m.vy * 2.5;
        const tailZ = m.z - m.vz * 2.5;

        m.positions[0] = m.x;
        m.positions[1] = m.y;
        m.positions[2] = m.z;
        m.positions[3] = tailX;
        m.positions[4] = tailY;
        m.positions[5] = tailZ;

        m.geo.attributes.position.needsUpdate = true;
        (m.line.material as THREE.LineBasicMaterial).opacity = Math.max(0, m.life * 0.9);

        if (m.life <= 0 || m.y < -600 || m.x < -800) {
          m.active = false;
          m.line.visible = false;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      starGeo.dispose();
      starMaterial.dispose();
      starTexture.dispose();
      nebulaGeo.dispose();
      nebulaMaterial.dispose();
      meteorMat.dispose();
      meteors.forEach((m) => m.geo.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
