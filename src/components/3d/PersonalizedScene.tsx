"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Text, Float } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/character.glb");

// ── Tech nodes that orbit the character ─────────────
const TECH_NODES = [
  { label: "Python",      color: "#3b82f6", r: 2.2, speed: 0.28, y: 0.6,  phase: 0            },
  { label: "TensorFlow",  color: "#f97316", r: 2.0, speed: 0.22, y: 1.4,  phase: Math.PI * 0.5 },
  { label: "OpenCV",      color: "#10b981", r: 2.4, speed: 0.19, y: 0.2,  phase: Math.PI       },
  { label: "LangChain",   color: "#8b5cf6", r: 1.9, speed: 0.31, y: 1.0,  phase: Math.PI * 1.5 },
  { label: "PyTorch",     color: "#ef4444", r: 2.3, speed: 0.25, y: 1.8,  phase: Math.PI * 0.8 },
  { label: "FastAPI",     color: "#06b6d4", r: 2.1, speed: 0.20, y: 0.0,  phase: Math.PI * 1.2 },
];

function TechNode({ label, color, r, speed, y, phase }: typeof TECH_NODES[0]) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.x = Math.cos(t) * r;
    ref.current.position.z = Math.sin(t) * r;
    ref.current.position.y = y + Math.sin(clock.elapsedTime * 0.8 + phase) * 0.12;
    // Always face camera
    ref.current.rotation.y = -t;
  });

  return (
    <group ref={ref}>
      {/* Glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 0.22, 0]}
        fontSize={0.12}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"
      >
        {label}
      </Text>
    </group>
  );
}

// ── Glowing platform ────────────────────────────────
function Platform() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      (ringRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.4 + Math.sin(clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={[0, -2.05, 0]}>
      {/* Base disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.4, 64]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#1d4ed8"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Outer ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.35, 1.4, 80]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Inner ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.65, 60]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={0.6}
          roughness={0.1}
        />
      </mesh>
      {/* Platform glow light */}
      <pointLight position={[0, 0.3, 0]} intensity={1.5} color="#3b82f6" distance={3.5} />
    </group>
  );
}

// ── Connection lines from character to tech nodes ───
function ConnectionLines() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    TECH_NODES.forEach((node, i) => {
      const t = clock.elapsedTime * node.speed + node.phase;
      const child = ref.current!.children[i] as THREE.Line;
      if (!child) return;
      const geom = child.geometry as THREE.BufferGeometry;
      const posAttr = geom.attributes.position as THREE.BufferAttribute;
      posAttr.setXYZ(0, 0, 1.0, 0);
      posAttr.setXYZ(1, Math.cos(t) * node.r, node.y, Math.sin(t) * node.r);
      posAttr.needsUpdate = true;
    });
  });

  return (
    <group ref={ref}>
      {TECH_NODES.map((node, i) => {
        const positions = new Float32Array([0, 1.0, 0, 0, 0, 0]);
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[positions, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={node.color}
              transparent
              opacity={0.18}
            />
          </line>
        );
      })}
    </group>
  );
}

// ── Main character model ─────────────────────────────
function CharacterModel() {
  const group  = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/character.glb");
  const { actions, names }    = useAnimations(animations, group);

  useEffect(() => {
    // Enable shadows on the original scene meshes
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!actions || names.length === 0) return;
    // CesiumMan has: unnamed walk anim (names[0])
    // Soldier has: Idle, Walk, Run, TPose
    const anim =
      actions["Idle"] ?? actions["idle"] ??
      actions["Walk"] ?? actions["walk"] ??
      actions["mixamo.com"] ??
      actions[names[0]];
    if (anim) {
      anim.setLoop(THREE.LoopRepeat, Infinity);
      anim.reset().fadeIn(0.5).play();
    }
    return () => { anim?.fadeOut(0.5); };
  }, [actions, names]);

  const yRot   = useRef(0);
  const floatT = useRef(0);
  useFrame((state, delta) => {
    floatT.current += delta;
    if (group.current) {
      const target = state.pointer.x * 0.28;
      yRot.current += (target - yRot.current) * 0.04;
      group.current.rotation.y = yRot.current;
      group.current.position.y = -2.0 + Math.sin(floatT.current * 1.1) * 0.05;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={1.65} position={[0, -2.0, 0]} />
    </group>
  );
}

// ── Full personalized scene ──────────────────────────
export default function PersonalizedScene() {
  return (
    <>
      {/* ── Name + Title ── */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
        <Text
          position={[0, 3.4, 0]}
          fontSize={0.42}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"
          maxWidth={5}
          textAlign="center"
          outlineWidth={0.008}
          outlineColor="#3b82f6"
        >
          ANUNEET GUPTA
        </Text>
        <Text
          position={[0, 2.88, 0]}
          fontSize={0.17}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"
          letterSpacing={0.08}
        >
          AI / ML ENGINEER  ·  IDEATHON WINNER 2026
        </Text>
      </Float>

      {/* ── Glowing platform ── */}
      <Platform />

      {/* ── Character ── */}
      <CharacterModel />

      {/* ── Orbiting tech nodes ── */}
      {TECH_NODES.map((node) => (
        <TechNode key={node.label} {...node} />
      ))}

      {/* ── Connection lines ── */}
      <ConnectionLines />

      {/* ── Stat badges in 3D ── */}
      {[
        { text: "CGPA 8.4",  pos: [-2.4, -0.5, 0] as [number,number,number], color: "#a78bfa" },
        { text: "25+ Projects", pos: [2.4, -0.5, 0] as [number,number,number], color: "#34d399" },
        { text: "Kanpur, IN", pos: [0, -0.5, 2.4] as [number,number,number], color: "#fb923c" },
      ].map(({ text, pos, color }) => (
        <Float key={text} speed={1.2} floatIntensity={0.4} rotationIntensity={0}>
          <Text
            position={pos}
            fontSize={0.13}
            color={color}
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"
            backgroundColor="#0f172a"
            padding={0.06}
          >
            {text}
          </Text>
        </Float>
      ))}
    </>
  );
}
