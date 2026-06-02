"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Icosahedron } from "@react-three/drei";

export default function Avatar() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const floatOffset = useRef(0);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly track mouse cursor
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;

      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.1;
      
      // Manual float animation
      floatOffset.current += 0.02;
      groupRef.current.position.y = 1.5 + Math.sin(floatOffset.current) * 0.2;
    }
    
    if (coreRef.current) {
      // Continuous slow rotation for the core
      coreRef.current.rotation.y += 0.01;
      coreRef.current.rotation.x += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.5, -1]} scale={1.5}>
      
      {/* Core Geometry - using BasicMaterial so it doesn't rely on lighting */}
      <Icosahedron ref={coreRef} args={[1, 1]}>
        <meshBasicMaterial 
          color="#3b82f6" 
          wireframe={true} 
        />
      </Icosahedron>

      {/* Solid inner core to guarantee visibility */}
      <Sphere args={[0.5, 16, 16]}>
         <meshBasicMaterial color="#60a5fa" />
      </Sphere>

      {/* Orbiting Ring */}
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#93c5fd" />
      </mesh>
      
      <mesh rotation-y={Math.PI / 2} rotation-x={Math.PI / 4}>
        <torusGeometry args={[1.7, 0.02, 16, 100]} />
        <meshBasicMaterial color="#bfdbfe" />
      </mesh>
      
    </group>
  );
}
