"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Avatar() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const floatOffset = useRef(0);

  useFrame((state) => {
    if (groupRef.current) {
      floatOffset.current += 0.015;
      groupRef.current.position.y = Math.sin(floatOffset.current) * 0.15;
      groupRef.current.rotation.z = Math.sin(floatOffset.current * 0.5) * 0.02;
    }

    if (headRef.current) {
      const targetX = state.pointer.x * 0.25;
      const targetY = state.pointer.y * 0.15;
      headRef.current.rotation.y += (targetX - headRef.current.rotation.y) * 0.06;
      headRef.current.rotation.x += (-targetY - headRef.current.rotation.x) * 0.06;
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.2 + Math.sin(floatOffset.current * 0.7) * 0.08;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.2 + Math.sin(floatOffset.current * 0.7 + Math.PI) * 0.08;
    }
  });

  const skin = "#f0c8a0";
  const hair = "#1a1a2e";
  const shirt = "#3b82f6";
  const pants = "#1e293b";
  const shoe = "#111827";

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1}>

      {/* ── HEAD ─────────────────────────────── */}
      <group ref={headRef} position={[0, 1.85, 0]}>
        {/* Face */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color={skin} roughness={0.55} />
        </mesh>

        {/* Hair top */}
        <mesh position={[0, 0.1, -0.03]} scale={[1.05, 0.65, 1.05]}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        {/* Hair back */}
        <mesh position={[0, 0.0, -0.12]} scale={[1, 0.85, 0.65]}>
          <sphereGeometry args={[0.4, 24, 24]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>

        {/* Eyes — white */}
        <mesh position={[-0.13, 0.03, 0.35]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.13, 0.03, 0.35]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.13, 0.03, 0.39]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
        <mesh position={[0.13, 0.03, 0.39]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshBasicMaterial color="#111111" />
        </mesh>

        {/* Glasses — left lens */}
        <mesh position={[-0.13, 0.03, 0.36]}>
          <torusGeometry args={[0.085, 0.013, 8, 32]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glasses — right lens */}
        <mesh position={[0.13, 0.03, 0.36]}>
          <torusGeometry args={[0.085, 0.013, 8, 32]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glasses bridge */}
        <mesh position={[0, 0.03, 0.39]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Smile */}
        <mesh position={[0, -0.12, 0.37]} rotation={[0.35, 0, 0]}>
          <torusGeometry args={[0.065, 0.013, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#b5775a" roughness={0.5} />
        </mesh>

        {/* Ears */}
        <mesh position={[-0.38, -0.02, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color={skin} roughness={0.55} />
        </mesh>
        <mesh position={[0.38, -0.02, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color={skin} roughness={0.55} />
        </mesh>
      </group>

      {/* ── NECK ─────────────────────────────── */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />
        <meshStandardMaterial color={skin} roughness={0.55} />
      </mesh>

      {/* ── TORSO ────────────────────────────── */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.72, 0.85, 0.38]} />
        <meshStandardMaterial color={shirt} roughness={0.35} />
      </mesh>
      {/* Collar */}
      <mesh position={[0, 1.32, 0.15]}>
        <boxGeometry args={[0.22, 0.08, 0.1]} />
        <meshStandardMaterial color="#2563eb" roughness={0.3} />
      </mesh>

      {/* ── LEFT ARM ─────────────────────────── */}
      <group position={[-0.46, 1.3, 0]}>
        <mesh ref={leftArmRef} position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.085, 0.075, 0.5, 16]} />
          <meshStandardMaterial color={shirt} roughness={0.35} />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.04, -0.62, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.3, 16]} />
          <meshStandardMaterial color={skin} roughness={0.55} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.04, -0.8, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={skin} roughness={0.55} />
        </mesh>
      </group>

      {/* ── RIGHT ARM ────────────────────────── */}
      <group position={[0.46, 1.3, 0]}>
        <mesh ref={rightArmRef} position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.085, 0.075, 0.5, 16]} />
          <meshStandardMaterial color={shirt} roughness={0.35} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.04, -0.62, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.3, 16]} />
          <meshStandardMaterial color={skin} roughness={0.55} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.04, -0.8, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={skin} roughness={0.55} />
        </mesh>
      </group>

      {/* ── LEGS ─────────────────────────────── */}
      {/* Left leg */}
      <mesh position={[-0.16, 0.25, 0]}>
        <cylinderGeometry args={[0.105, 0.09, 0.55, 16]} />
        <meshStandardMaterial color={pants} roughness={0.5} />
      </mesh>
      <mesh position={[-0.16, -0.1, 0.04]}>
        <boxGeometry args={[0.15, 0.1, 0.24]} />
        <meshStandardMaterial color={shoe} roughness={0.3} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.16, 0.25, 0]}>
        <cylinderGeometry args={[0.105, 0.09, 0.55, 16]} />
        <meshStandardMaterial color={pants} roughness={0.5} />
      </mesh>
      <mesh position={[0.16, -0.1, 0.04]}>
        <boxGeometry args={[0.15, 0.1, 0.24]} />
        <meshStandardMaterial color={shoe} roughness={0.3} />
      </mesh>

      {/* ── FLOATING TECH RINGS ──────────────── */}
      <mesh rotation-x={Math.PI / 2} position={[0, 0.9, 0]}>
        <torusGeometry args={[1.1, 0.007, 8, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} position={[0, 0.9, 0]}>
        <torusGeometry args={[1.25, 0.005, 8, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
      </mesh>

      {/* Tiny orbiting dots */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.1, 0.9 + Math.sin(a * 2) * 0.1, Math.sin(a) * 1.1]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        );
      })}
    </group>
  );
}
