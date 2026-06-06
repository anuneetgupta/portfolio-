/* eslint-disable */
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Helpers ──────────────────────────────────────────
function rnd(lo: number, hi: number) {
  return lo + Math.random() * (hi - lo);
}

// ── Constants ────────────────────────────────────────
const PARTICLE_COUNT  = 1400;
const CONNECT_COUNT   = 160;   // subset used for constellation edges
const CONNECT_RADIUS  = 1.8;   // max distance between connected stars
const DEPTH           = 8;

export default function NeuralNetwork() {
  const starsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const clock    = useRef(0);

  // ── Particle positions + colors ──
  const [starPositions, starColors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r     = DEPTH * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Blues / purples / cyans
      const hue = 0.55 + Math.random() * 0.2;
      const sat = 0.7 + Math.random() * 0.3;
      const lit = 0.45 + Math.random() * 0.45;
      const c   = new THREE.Color().setHSL(hue, sat, lit);
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  // ── Constellation edges (static geometry, first CONNECT_COUNT particles) ──
  const [linePositions, lineColors] = useMemo(() => {
    const subset: [number, number, number][] = [];
    for (let i = 0; i < CONNECT_COUNT; i++) {
      subset.push([
        starPositions[i * 3],
        starPositions[i * 3 + 1],
        starPositions[i * 3 + 2],
      ]);
    }

    const linePos: number[] = [];
    const lineCol: number[] = [];

    for (let a = 0; a < subset.length; a++) {
      for (let b = a + 1; b < subset.length; b++) {
        const dx = subset[a][0] - subset[b][0];
        const dy = subset[a][1] - subset[b][1];
        const dz = subset[a][2] - subset[b][2];
        const d  = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < CONNECT_RADIUS) {
          // fade alpha by distance
          const alpha = 1 - d / CONNECT_RADIUS;
          linePos.push(...subset[a], ...subset[b]);
          // colour from blue → cyan by distance
          const hue = 0.58 + (1 - alpha) * 0.1;
          const c   = new THREE.Color().setHSL(hue, 0.85, 0.55);
          lineCol.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }
      }
    }

    return [new Float32Array(linePos), new Float32Array(lineCol)];
  }, [starPositions]);

  // ── Animation ──
  useFrame((state) => {
    clock.current += 0.001;

    const mx = state.pointer.x * 0.3;
    const my = state.pointer.y * 0.3;

    if (starsRef.current) {
      starsRef.current.rotation.y += (mx - starsRef.current.rotation.y) * 0.04 + 0.0008;
      starsRef.current.rotation.x += (-my - starsRef.current.rotation.x) * 0.04 + 0.0003;
    }
    if (linesRef.current) {
      // sync to star rotation
      linesRef.current.rotation.y = starsRef.current?.rotation.y ?? 0;
      linesRef.current.rotation.x = starsRef.current?.rotation.x ?? 0;

      // Pulse opacity
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.12 + Math.sin(clock.current * 4) * 0.04;
    }
  });

  return (
    <>
      {/* Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>

      {/* Constellation lines */}
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[lineColors, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.14}
            linewidth={1}
          />
        </lineSegments>
      )}
    </>
  );
}
