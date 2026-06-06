"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/character.glb");

export default function Avatar() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/character.glb");
  const { actions, names }    = useAnimations(animations, group);

  // Deep-clone so multiple renders don't conflict
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow    = true;
        child.receiveShadow = true;
        // Fix material issues on clone
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => m.clone());
        } else if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
      }
    });
    return clone;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play Idle animation (Soldier.glb has: Idle, Walk, Run, TPose)
  useEffect(() => {
    if (!actions || names.length === 0) return;
    const anim =
      actions["Idle"] ??
      actions["idle"] ??
      actions["Walk"] ??
      actions[names[0]];

    if (anim) {
      anim.reset().fadeIn(0.5).play();
    }
    return () => { anim?.fadeOut(0.5); };
  }, [actions, names]);

  // Gentle: float + mouse-track rotation
  const yRot   = useRef(0);
  const floatT = useRef(0);

  useFrame((state, delta) => {
    floatT.current += delta;
    if (group.current) {
      // Subtle mouse-follow Y rotation
      const target = state.pointer.x * 0.3;
      yRot.current += (target - yRot.current) * 0.04;
      group.current.rotation.y = yRot.current;

      // Very subtle up-down float (looks alive)
      group.current.position.y = -2.0 + Math.sin(floatT.current * 1.2) * 0.04;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive
        object={model}
        scale={1.6}
        position={[0, -2.0, 0]}
      />
    </group>
  );
}
