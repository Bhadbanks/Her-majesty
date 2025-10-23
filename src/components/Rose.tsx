// src/components/Rose.tsx
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Define the type for the GLTF loaded object
interface GLTFResult {
  nodes: { [key: string]: THREE.Mesh };
  materials: { [key: string]: THREE.Material };
}

// Function to generate a random number within a range
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// Initial random positions for a floating effect
const initialPositions = Array.from({ length: 15 }, () => ({
  x: rand(-10, 10),
  y: rand(-10, 10),
  z: rand(-10, 10),
  scale: rand(0.5, 1.5),
  rotationSpeed: rand(0.005, 0.02),
  floatSpeed: rand(0.001, 0.005),
}));

export function Rose({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  // Load the 3D model from the public directory
  const { scene } = useGLTF('/rose.glb') as unknown as GLTFResult;

  const { x, y, z, scale, rotationSpeed, floatSpeed } = initialPositions[index];

  // Animation loop for floating, rotation, and pulsing
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.5 + index * 10;

    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.set(
        x + Math.sin(t * floatSpeed * 2) * 0.5,
        y + Math.cos(t * floatSpeed * 1.5) * 0.5,
        z + Math.sin(t * floatSpeed * 1.8) * 0.5
      );

      // Slow rotation
      meshRef.current.rotation.x += rotationSpeed / 2;
      meshRef.current.rotation.y += rotationSpeed;

      // Gentle pulsing scale (synchronized with text pulse via ambient light)
      const pulse = 1 + Math.sin(t * 3) * 0.02;
      meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
    }
  });

  return (
    // The primitive component renders the loaded scene
    <primitive
      object={scene.clone()} // Use .clone() to ensure each instance is unique
      ref={meshRef}
      position={[x, y, z]}
      scale={[scale, scale, scale]}
      rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
    >
      {/* Optional: Add a subtle emissive glow to the rose material */}
      <meshStandardMaterial
        attach="material"
        color="red"
        emissive="red"
        emissiveIntensity={0.2}
      />
    </primitive>
  );
}

// Preload the model to prevent a delay on the first render
useGLTF.preload('/rose.glb');
