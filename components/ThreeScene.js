import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// This constant is used to synchronize the subtle light pulse with the overall emotional flow
const EMOTIONAL_FLOW_LENGTH = 15; 

/**
 * Rose Component: Loads and animates the 3D rose model
 */
function Rose({ position, speed = 0.5, scale = 0.5, rotationSpeed = 0.005 }) {
  // useGLTF handles loading 'rose.glb' from the public folder
  const { scene } = useGLTF('/rose.glb');
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      // Floating motion
      ref.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.005;
      ref.current.rotation.x += rotationSpeed;
      ref.current.rotation.y += rotationSpeed * 0.5;

      // Gentle pulsing effect for glow
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      scene.traverse(child => {
        if (child.isMesh) {
          // Apply pulsing glow and faint coloring
          if (child.material.emissive) {
            child.material.emissiveIntensity = 0.5 * pulseScale;
            child.material.emissive.set(new THREE.Color('#ff0000')); // Red glow
          }
        }
      });
    }
  });

  // Clone scene for multiple, independent rose instances
  return (
    <primitive 
      ref={ref} 
      object={scene.clone()}
      position={position} 
      scale={[scale, scale, scale]} 
    />
  );
}

useGLTF.preload('/rose.glb');

/**
 * StarryNight Component: Creates the subtle background and ambient glow
 */
function StarryNight() {
  const meshRef = useRef();
  
  // Create thousands of stars
  const positions = useMemo(() => {
    const p = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 200; // x
      p[i * 3 + 1] = (Math.random() - 0.5) * 200; // y
      p[i * 3 + 2] = (Math.random() - 0.5) * 200; // z
    }
    return p;
  }, []);

  useFrame((state) => {
    // Subtle rotation and movement for an ambient vibe
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.00005;
      meshRef.current.rotation.x += 0.00001;
    }
    
    // Subtle moon/light pulse synchronized with text flow
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    state.scene.traverse(child => {
      if (child.isLight && child.userData.isPulsing) {
        child.intensity = child.userData.initialIntensity * pulse;
      }
    });
  });

  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.5} color="#FBEAEB" /> 
      {/* Main Moon Light: Soft, misty glow & subtle pulse */}
      <pointLight 
        position={[5, 5, 5]} 
        intensity={1} 
        color="#b3d9ff" 
        distance={50} 
        decay={2} 
        userData={{ initialIntensity: 1, isPulsing: true }} 
      /> 
      <pointLight 
        position={[-5, -5, -5]} 
        intensity={0.8} 
        color="#ffb3d9" 
        distance={30} 
        decay={2} 
        userData={{ initialIntensity: 0.8, isPulsing: true }} 
      />
      
      {/* Stars */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.3} sizeAttenuation={true} color="#ffffff" transparent opacity={0.8} />
      </points>
      
      {/* Multiple floating roses */}
      <Rose position={[3, 0, -5]} speed={0.4} scale={0.6} rotationSpeed={0.003} />
      <Rose position={[-4, 2, 0]} speed={0.6} scale={0.5} rotationSpeed={0.005} />
      <Rose position={[0, -3, 4]} speed={0.7} scale={0.4} rotationSpeed={0.007} />
      <Rose position={[5, -5, 5]} speed={0.5} scale={0.7} rotationSpeed={0.004} />
      <Rose position={[-2, 4, -2]} speed={0.3} scale={0.55} rotationSpeed={0.006} />
    </>
  );
}

// Full Three.js Scene wrapper
export default function ThreeScene() {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <StarryNight />
            </Canvas>
        </div>
    );
}
