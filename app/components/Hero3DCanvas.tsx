"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCw, Palette, Layers, Box, Globe, Eye } from "lucide-react";
import { playClickSound, playHoverSound } from "../utils/soundFX";

type ShapeMode = "sphere" | "torus" | "cube" | "dna";
type ColorTheme = "violet" | "cyan" | "emerald" | "rose";

const COLOR_MAP: Record<ColorTheme, { primary: number; secondary: number; hex: string }> = {
  violet: { primary: 0x8b5cf6, secondary: 0xa855f7, hex: "#8b5cf6" },
  cyan: { primary: 0x06b6d4, secondary: 0x38bdf8, hex: "#06b6d4" },
  emerald: { primary: 0x10b981, secondary: 0x34d399, hex: "#10b981" },
  rose: { primary: 0xf43f5e, secondary: 0xfb7185, hex: "#f43f5e" },
};

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapeMode, setShapeMode] = useState<ShapeMode>("sphere");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("violet");
  const [isRotating, setIsRotating] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  // References to dynamic Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const currentMeshGroupRef = useRef<THREE.Group | null>(null);
  const coreLightRef = useRef<THREE.PointLight | null>(null);
  const colorThemeRef = useRef(colorTheme);
  const shapeModeRef = useRef(shapeMode);
  const isRotatingRef = useRef(isRotating);

  useEffect(() => {
    colorThemeRef.current = colorTheme;
  }, [colorTheme]);

  useEffect(() => {
    shapeModeRef.current = shapeMode;
  }, [shapeMode]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const coreLight = new THREE.PointLight(COLOR_MAP[colorThemeRef.current].primary, 3, 15);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);
    coreLightRef.current = coreLight;

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Function to build geometric mode
    const buildShape = (mode: ShapeMode, theme: ColorTheme) => {
      if (currentMeshGroupRef.current) {
        rootGroup.remove(currentMeshGroupRef.current);
        // dispose previous
        currentMeshGroupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }

      const colors = COLOR_MAP[theme];
      const group = new THREE.Group();

      if (mode === "sphere") {
        // Inner glowing core
        const coreGeo = new THREE.IcosahedronGeometry(1.2, 3);
        const coreMat = new THREE.MeshStandardMaterial({
          color: colors.primary,
          emissive: colors.secondary,
          emissiveIntensity: 0.6,
          roughness: 0.2,
          metalness: 0.8,
          wireframe: false,
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        group.add(coreMesh);

        // Outer wireframe cage
        const cageGeo = new THREE.IcosahedronGeometry(1.8, 1);
        const cageMat = new THREE.MeshBasicMaterial({
          color: colors.primary,
          wireframe: true,
          transparent: true,
          opacity: 0.45,
        });
        const cageMesh = new THREE.Mesh(cageGeo, cageMat);
        group.add(cageMesh);

        // Orbital Ring 1
        const ringGeo1 = new THREE.TorusGeometry(2.3, 0.03, 16, 100);
        const ringMat1 = new THREE.MeshBasicMaterial({
          color: colors.secondary,
          transparent: true,
          opacity: 0.85,
        });
        const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.rotation.x = Math.PI / 3;
        group.add(ring1);

        // Orbital Ring 2
        const ringGeo2 = new THREE.TorusGeometry(2.6, 0.03, 16, 100);
        const ringMat2 = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.75,
        });
        const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
        ring2.rotation.y = Math.PI / 4;
        group.add(ring2);

        // Floating tech satellite cubes
        for (let i = 0; i < 6; i++) {
          const satGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
          const satMat = new THREE.MeshStandardMaterial({
            color: colors.primary,
            emissive: colors.primary,
            emissiveIntensity: 0.5,
          });
          const sat = new THREE.Mesh(satGeo, satMat);
          const angle = (i / 6) * Math.PI * 2;
          sat.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, (i % 2 === 0 ? 0.3 : -0.3));
          sat.userData = { angle, speed: 0.02 + i * 0.005, radius: 2.3 };
          group.add(sat);
        }
      } else if (mode === "torus") {
        // Futuristic Cyber Donut
        const knotGeo = new THREE.TorusKnotGeometry(1.3, 0.4, 128, 32, 2, 3);
        const knotMat = new THREE.MeshStandardMaterial({
          color: colors.primary,
          roughness: 0.15,
          metalness: 0.9,
          emissive: colors.primary,
          emissiveIntensity: 0.3,
        });
        const knotMesh = new THREE.Mesh(knotGeo, knotMat);
        group.add(knotMesh);

        // Surrounding halo
        const haloGeo = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
        const haloMat = new THREE.MeshBasicMaterial({
          color: colors.secondary,
          transparent: true,
          opacity: 0.7,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.rotation.x = Math.PI / 2;
        group.add(halo);
      } else if (mode === "cube") {
        // Cyber Tesseract / Matrix Cube
        const cubeGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
        const cubeMat = new THREE.MeshStandardMaterial({
          color: colors.primary,
          metalness: 0.9,
          roughness: 0.2,
          emissive: colors.secondary,
          emissiveIntensity: 0.4,
          transparent: true,
          opacity: 0.85,
        });
        const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
        group.add(cubeMesh);

        const outerWireGeo = new THREE.BoxGeometry(2.3, 2.3, 2.3);
        const outerWireMat = new THREE.MeshBasicMaterial({
          color: colors.secondary,
          wireframe: true,
        });
        const outerWire = new THREE.Mesh(outerWireGeo, outerWireMat);
        group.add(outerWire);
      } else if (mode === "dna") {
        // Double helix structure
        const count = 28;
        for (let i = 0; i < count; i++) {
          const t = (i / count) * Math.PI * 4;
          const y = (i / count) * 4 - 2;
          const x1 = Math.cos(t) * 1.2;
          const z1 = Math.sin(t) * 1.2;
          const x2 = Math.cos(t + Math.PI) * 1.2;
          const z2 = Math.sin(t + Math.PI) * 1.2;

          // Node 1
          const nodeGeo = new THREE.SphereGeometry(0.12, 12, 12);
          const nodeMat1 = new THREE.MeshStandardMaterial({
            color: colors.primary,
            emissive: colors.primary,
            emissiveIntensity: 0.5,
          });
          const node1 = new THREE.Mesh(nodeGeo, nodeMat1);
          node1.position.set(x1, y, z1);
          group.add(node1);

          // Node 2
          const nodeMat2 = new THREE.MeshStandardMaterial({
            color: colors.secondary,
            emissive: colors.secondary,
            emissiveIntensity: 0.5,
          });
          const node2 = new THREE.Mesh(nodeGeo, nodeMat2);
          node2.position.set(x2, y, z2);
          group.add(node2);

          // Connector bar
          if (i % 2 === 0) {
            const barGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.4);
            const barMat = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.4,
            });
            const bar = new THREE.Mesh(barGeo, barMat);
            bar.position.set(0, y, 0);
            bar.rotation.z = Math.PI / 2;
            bar.rotation.y = -t;
            group.add(bar);
          }
        }
      }

      rootGroup.add(group);
      currentMeshGroupRef.current = group;
    };

    buildShape(shapeModeRef.current, colorThemeRef.current);

    // Mouse / Touch Drag Interaction
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      playClickSound();
      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointerPosition.x;
      const deltaY = e.clientY - previousPointerPosition.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Render loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (isRotatingRef.current && !isDragging) {
        targetRotationY += 0.4 * delta;
      }

      // Smooth rotation lerp
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.1;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.1;

      // Animate satellites if in sphere mode
      if (currentMeshGroupRef.current && shapeModeRef.current === "sphere") {
        currentMeshGroupRef.current.children.forEach((child) => {
          if (child.userData && child.userData.speed) {
            child.userData.angle += child.userData.speed;
            child.position.x = Math.cos(child.userData.angle) * child.userData.radius;
            child.position.z = Math.sin(child.userData.angle) * child.userData.radius;
            child.position.y = Math.sin(elapsed * 2 + child.userData.angle) * 0.4;
            child.rotation.x += 0.02;
            child.rotation.y += 0.03;
          }
        });
      }

      // Pulse core light
      if (coreLightRef.current) {
        coreLightRef.current.intensity = 2.5 + Math.sin(elapsed * 3) * 1.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Effect to rebuild shape when shapeMode or colorTheme changes
  useEffect(() => {
    if (sceneRef.current && currentMeshGroupRef.current) {
      const colors = COLOR_MAP[colorTheme];
      if (coreLightRef.current) {
        coreLightRef.current.color.setHex(colors.primary);
      }
      // Re-trigger geometry creation
      const container = containerRef.current;
      if (!container) return;

      // Update shape
      const rootGroup = sceneRef.current.children.find(
        (c) => c instanceof THREE.Group && c !== currentMeshGroupRef.current
      ) as THREE.Group | undefined;

      if (rootGroup) {
        // Remove and rebuild
        if (currentMeshGroupRef.current) {
          rootGroup.remove(currentMeshGroupRef.current);
        }
      }
    }
  }, [shapeMode, colorTheme]);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#121629]/90 via-[#0d1020]/90 to-[#080b14]/90 p-5 shadow-2xl backdrop-blur-xl transition hover:border-violet-500/40">
      {/* Top Header with Interactive Badges */}
      <div className="flex w-full items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400" />
          <span className="text-xs font-mono tracking-widest text-violet-300">
            3D HOLOGRAPHIC CORE
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-[11px] text-violet-300">
          <Sparkles className="h-3 w-3 text-violet-400" />
          <span>Interactive WebGL</span>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="relative h-72 w-full cursor-grab active:cursor-grabbing sm:h-80"
        title="Click & Drag to rotate 3D object"
      >
        {/* Interaction Hint Overlay */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] text-slate-300 backdrop-blur-md">
          {isInteracting ? "Rotating 3D Space..." : "🖱️ Drag to rotate in 3D"}
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="mt-3 flex w-full flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
        {/* Shape Switchers */}
        <div className="flex items-center gap-1">
          {(["sphere", "torus", "cube", "dna"] as ShapeMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                playClickSound();
                setShapeMode(mode);
              }}
              onMouseEnter={playHoverSound}
              className={`rounded-lg p-1.5 text-xs font-medium transition ${
                shapeMode === mode
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
              title={`Switch to ${mode}`}
            >
              {mode === "sphere" && <Globe className="h-4 w-4" />}
              {mode === "torus" && <Layers className="h-4 w-4" />}
              {mode === "cube" && <Box className="h-4 w-4" />}
              {mode === "dna" && <Sparkles className="h-4 w-4" />}
            </button>
          ))}
        </div>

        {/* Color Palette Switchers */}
        <div className="flex items-center gap-1.5">
          {(["violet", "cyan", "emerald", "rose"] as ColorTheme[]).map((theme) => (
            <button
              key={theme}
              onClick={() => {
                playClickSound();
                setColorTheme(theme);
              }}
              onMouseEnter={playHoverSound}
              className={`h-5 w-5 rounded-full transition-transform ${
                colorTheme === theme
                  ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: COLOR_MAP[theme].hex }}
              title={`${theme} neon glow`}
            />
          ))}

          {/* Auto rotate toggle */}
          <button
            onClick={() => {
              playClickSound();
              setIsRotating((prev) => !prev);
            }}
            onMouseEnter={playHoverSound}
            className={`ml-1 rounded-lg p-1.5 transition ${
              isRotating
                ? "bg-violet-500/20 text-violet-300"
                : "bg-white/5 text-slate-500"
            }`}
            title={isRotating ? "Pause rotation" : "Resume auto-rotation"}
          >
            <RotateCw className={`h-4 w-4 ${isRotating ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Bottom Live Stats Grid */}
      <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
        <div className="rounded-xl border border-white/5 bg-black/30 p-2.5 transition hover:border-violet-500/30">
          <p className="text-xl font-bold text-violet-300">10+</p>
          <p className="text-[11px] text-slate-400">Core Technologies</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-black/30 p-2.5 transition hover:border-violet-500/30">
          <p className="text-xl font-bold text-cyan-300">3+</p>
          <p className="text-[11px] text-slate-400">Featured Projects</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-black/30 p-2.5 transition hover:border-violet-500/30">
          <p className="text-xl font-bold text-emerald-300">MCA</p>
          <p className="text-[11px] text-slate-400">CS Foundation</p>
        </div>
      </div>
    </div>
  );
}
