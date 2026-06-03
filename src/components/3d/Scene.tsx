"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import NeuralNetwork from "./NeuralNetwork";
import { Preload } from "@react-three/drei";

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <NeuralNetwork />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
