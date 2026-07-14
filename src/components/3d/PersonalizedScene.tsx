"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Smile() {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.16, 0, 0),
      new THREE.Vector3(-0.06, -0.05, 0.015),
      new THREE.Vector3(0.06, -0.05, 0.015),
      new THREE.Vector3(0.16, 0, 0),
    ]);
    return new THREE.TubeGeometry(curve, 18, 0.012, 8, false);
  }, []);

  return (
    <mesh geometry={geometry} position={[0, 0.93, 0.39]} rotation={[0.03, 0, 0]}>
      <meshStandardMaterial color="#f8fafc" roughness={0.2} />
    </mesh>
  );
}

function Hair() {
  const clumps = [
    [-0.34, 1.57, 0.03, 0.22, 0.18, 0.22, -0.28],
    [-0.18, 1.68, 0.06, 0.24, 0.2, 0.24, -0.16],
    [0.02, 1.72, 0.07, 0.28, 0.22, 0.24, 0.02],
    [0.22, 1.68, 0.05, 0.25, 0.2, 0.24, 0.24],
    [0.37, 1.55, 0.01, 0.2, 0.16, 0.2, 0.34],
    [0, 1.61, -0.18, 0.46, 0.2, 0.34, 0],
  ] as const;

  return (
    <group>
      {clumps.map(([x, y, z, sx, sy, sz, rz], index) => (
        <mesh key={index} position={[x, y, z]} rotation={[0.1, 0, rz]} scale={[sx, sy, sz]} castShadow>
          <sphereGeometry args={[1, 32, 20]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0.29, 1.67, 0.16]} rotation={[0.12, 0.08, 0.7]} scale={[0.22, 0.08, 0.11]} castShadow>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#172033" roughness={0.48} />
      </mesh>
    </group>
  );
}

function Glasses() {
  return (
    <group position={[0, 1.26, 0.39]}>
      <mesh position={[-0.15, 0, 0]} rotation={[0, 0, 0.03]}>
        <torusGeometry args={[0.115, 0.012, 10, 32]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.55} roughness={0.18} />
      </mesh>
      <mesh position={[0.15, 0, 0]} rotation={[0, 0, -0.03]}>
        <torusGeometry args={[0.115, 0.012, 10, 32]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.55} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.014, 0.014]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.55} roughness={0.18} />
      </mesh>
      <mesh position={[-0.15, 0, 0.006]} scale={[1, 0.74, 1]}>
        <sphereGeometry args={[0.1, 24, 16]} />
        <meshPhysicalMaterial color="#bfdbfe" transmission={0.45} transparent opacity={0.2} roughness={0.03} />
      </mesh>
      <mesh position={[0.15, 0, 0.006]} scale={[1, 0.74, 1]}>
        <sphereGeometry args={[0.1, 24, 16]} />
        <meshPhysicalMaterial color="#bfdbfe" transmission={0.45} transparent opacity={0.2} roughness={0.03} />
      </mesh>
    </group>
  );
}

function Face() {
  return (
    <group>
      <mesh position={[0, 1.24, 0]} scale={[0.45, 0.52, 0.4]} castShadow>
        <sphereGeometry args={[1, 48, 36]} />
        <meshStandardMaterial color="#d9a06f" roughness={0.48} />
      </mesh>
      <mesh position={[-0.15, 1.27, 0.39]} scale={[0.035, 0.045, 0.018]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.25} />
      </mesh>
      <mesh position={[0.15, 1.27, 0.39]} scale={[0.035, 0.045, 0.018]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.25} />
      </mesh>
      <mesh position={[0, 1.13, 0.42]} scale={[0.052, 0.08, 0.035]} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[1, 20, 12]} />
        <meshStandardMaterial color="#c8885f" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.91, 0.33]} scale={[0.3, 0.18, 0.1]} castShadow>
        <sphereGeometry args={[1, 32, 20]} />
        <meshStandardMaterial color="#2b1714" roughness={0.58} />
      </mesh>
      <mesh position={[-0.3, 1.04, 0.22]} scale={[0.08, 0.2, 0.08]} rotation={[0.1, 0.15, -0.42]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#2b1714" roughness={0.58} />
      </mesh>
      <mesh position={[0.3, 1.04, 0.22]} scale={[0.08, 0.2, 0.08]} rotation={[0.1, -0.15, 0.42]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#2b1714" roughness={0.58} />
      </mesh>
      <mesh position={[-0.15, 1.39, 0.405]} rotation={[0, 0, -0.06]} scale={[0.11, 0.02, 0.015]}>
        <sphereGeometry args={[1, 18, 8]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
      <mesh position={[0.15, 1.39, 0.405]} rotation={[0, 0, 0.06]} scale={[0.11, 0.02, 0.015]}>
        <sphereGeometry args={[1, 18, 8]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
      <Smile />
      <Glasses />
      <Hair />
    </group>
  );
}

function Hoodie() {
  const drawstringMaterial = <meshStandardMaterial color="#dbeafe" roughness={0.35} />;

  return (
    <group>
      <mesh position={[0, 0.19, 0]} scale={[0.82, 0.68, 0.45]} castShadow>
        <sphereGeometry args={[1, 48, 28]} />
        <meshStandardMaterial color="#1f4f9c" roughness={0.46} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.78, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.75, 0.38, 0.24]} castShadow>
        <torusGeometry args={[0.52, 0.16, 22, 72]} />
        <meshStandardMaterial color="#265fb8" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.61, 0.2]} scale={[0.34, 0.22, 0.16]}>
        <sphereGeometry args={[1, 32, 18]} />
        <meshStandardMaterial color="#153a79" roughness={0.55} />
      </mesh>
      <mesh position={[-0.17, 0.45, 0.43]} rotation={[0.12, 0, 0.1]}>
        <cylinderGeometry args={[0.01, 0.01, 0.42, 10]} />
        {drawstringMaterial}
      </mesh>
      <mesh position={[0.17, 0.45, 0.43]} rotation={[0.12, 0, -0.1]}>
        <cylinderGeometry args={[0.01, 0.01, 0.42, 10]} />
        {drawstringMaterial}
      </mesh>
      <mesh position={[-0.18, 0.25, 0.45]}>
        <sphereGeometry args={[0.026, 12, 8]} />
        {drawstringMaterial}
      </mesh>
      <mesh position={[0.18, 0.25, 0.45]}>
        <sphereGeometry args={[0.026, 12, 8]} />
        {drawstringMaterial}
      </mesh>
    </group>
  );
}

function PortraitCharacter() {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!root.current || !head.current) return;

    root.current.position.y = Math.sin(t * 1.2) * 0.035;
    root.current.rotation.y = Math.sin(t * 0.45) * 0.035 + state.pointer.x * 0.18;
    head.current.rotation.y = state.pointer.x * 0.22;
    head.current.rotation.x = -state.pointer.y * 0.1 + Math.sin(t * 0.8) * 0.015;
  });

  return (
    <group ref={root} position={[0, -0.78, 0]}>
      <Hoodie />
      <group ref={head}>
        <mesh position={[-0.48, 1.21, 0.03]} scale={[0.09, 0.16, 0.08]} rotation={[0, 0, -0.1]}>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#d9a06f" roughness={0.5} />
        </mesh>
        <mesh position={[0.48, 1.21, 0.03]} scale={[0.09, 0.16, 0.08]} rotation={[0, 0, 0.1]}>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#d9a06f" roughness={0.5} />
        </mesh>
        <Face />
      </group>
    </group>
  );
}

function BackdropGlow() {
  const glow = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!glow.current) return;
    glow.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.9) * 0.035);
  });

  return (
    <group>
      <mesh ref={glow} position={[0, 0.45, -1.25]}>
        <circleGeometry args={[1.85, 96]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.16} />
      </mesh>
      <mesh position={[0, -1.22, -0.45]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.25, 80]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.16} />
      </mesh>
      <pointLight position={[-1.4, 1.25, 1.1]} color="#60a5fa" intensity={1.6} distance={4} />
      <pointLight position={[1.15, 1.3, 0.9]} color="#a78bfa" intensity={1.25} distance={3.5} />
    </group>
  );
}

function FloatingSparkles() {
  const points = useMemo(
    () => [
      [-1.55, 1.55, -0.2],
      [1.55, 1.3, -0.4],
      [-1.25, -0.45, 0.25],
      [1.35, -0.32, 0.15],
      [0.95, 1.85, -0.3],
    ] as const,
    []
  );

  return (
    <group>
      {points.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[index === 0 ? 0.035 : 0.02, 12, 8]} />
          <meshBasicMaterial color={index % 2 ? "#bfdbfe" : "#ffffff"} transparent opacity={0.82} />
        </mesh>
      ))}
    </group>
  );
}

export default function PersonalizedScene() {
  return (
    <>
      <BackdropGlow />
      <PortraitCharacter />
      <FloatingSparkles />
    </>
  );
}
