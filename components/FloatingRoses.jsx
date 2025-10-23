'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// Component for a single animated Rose
function Rose({ position, rotationFactor }) {
  // Load the GLB file from the public folder
  const { scene } = useGLTF('/rose.glb');
  const ref = useRef();

  // Animation logic for floating and pulsing glow
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Gentle rotation based on time and a unique factor
    ref.current.rotation.y = Math.sin(t * 0.5 * rotationFactor) * 0.5;
    
    // Gentle up/down float
    ref.current.position.y = position[1] + Math.sin(t * 0.3 * rotationFactor) * 0.2;
    
    // Subtle emission/glow effect using a pseudo-light/color change
    if (scene.children[0].material) {
        const material = scene.children[0].material;
        // Pulse the emissive color (faint red glow)
        const pulse = Math.sin(t * 2) * 0.2 + 0.8; 
        material.emissiveIntensity = 0.5 * pulse;
        material.emissive = new THREE.Color(0.8, 0, 0); // Faint red
    }
  });

  return (
    // Float component adds an easy, gentle, randomized float
    <Float 
        speed={0.5 + Math.random()} // Randomize float speed
        rotationIntensity={1} 
        floatIntensity={0.5}
    >
        <primitive 
            ref={ref} 
            object={scene.clone()} // Clone the scene for multiple instances
            position={position} 
            scale={[0.5, 0.5, 0.5]} // Adjust scale to cinematic size
        />
    </Float>
  );
}

// Main component to render the 3D scene
export default function FloatingRoses() {
  // Define positions for multiple roses
  const rosePositions = [
    [-3, 1, -5], // Back left
    [2, -2, -6], // Back right
    [-5, -1, -3], // Far left
    [4, 2, -4], // Far right
    [0, 0, -2], // Center front
  ];

  return (
    <div className="rose-canvas">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        {/* Ambient light for general illumination */}
        <ambientLight intensity={0.5} />
        {/* Subtle spot light to highlight the roses */}
        <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={100} 
            castShadow 
        />
        
        {/* Render multiple roses */}
        {rosePositions.map((pos, index) => (
          <Rose key={index} position={pos} rotationFactor={index + 1} />
        ))}
        
        {/* Environment for soft background lighting/misty feel */}
        <Environment preset="night" blur={0.5} />
      </Canvas>
    </div>
  );
}

// Pre-load the GLTF model to avoid flickering on first load
useGLTF.preload('/rose.glb');
