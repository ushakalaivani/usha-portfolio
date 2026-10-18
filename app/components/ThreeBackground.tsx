"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080b14, 0.0015);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Particles system
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      scales[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture generator
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.3, "rgba(168,85,247,0.7)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.8,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Floating 3D Geometric shapes
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // 1. Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(12, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-35, 15, -20);
    shapesGroup.add(ico);

    // 2. Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(8, 1.5, 64, 16);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    knot.position.set(40, -18, -30);
    shapesGroup.add(knot);

    // 3. Octahedron
    const octGeo = new THREE.OctahedronGeometry(9, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const oct = new THREE.Mesh(octGeo, octMat);
    oct.position.set(-25, -30, -15);
    shapesGroup.add(oct);

    // Mouse tracking with lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow (lerp)
      targetX += (mouseX * 12 - targetX) * 0.05;
      targetY += (mouseY * 12 - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(scene.position);

      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      // Animate floating shapes
      ico.rotation.x = elapsedTime * 0.2;
      ico.rotation.y = elapsedTime * 0.3;
      ico.position.y = 15 + Math.sin(elapsedTime * 0.8) * 3;

      knot.rotation.x = elapsedTime * 0.15;
      knot.rotation.z = elapsedTime * 0.25;
      knot.position.y = -18 + Math.cos(elapsedTime * 0.6) * 4;

      oct.rotation.y = elapsedTime * 0.25;
      oct.rotation.z = elapsedTime * 0.15;
      oct.position.y = -30 + Math.sin(elapsedTime * 0.9) * 2.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
}
