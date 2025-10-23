import Head from 'next/head';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

// --- 1. CONFIGURATION ---

const EMOTIONAL_FLOW = [
  // 💔 Start: Heartfelt apology & emotion
  { text: "My Queen, please let me start with a sincere, raw apology.", duration: 7000, fadeDuration: 1500 },
  { text: "The thought of my actions hurting you has been a crushing weight.", duration: 6000, fadeDuration: 1500 },
  { text: "I messed up, and there's no excuse. My heart aches when you're sad.", duration: 7000, fadeDuration: 1500 },
  { text: "You deserve the world, and I promise to be the man who gives it to you.", duration: 8000, fadeDuration: 2000 },
  
  // ❤️ Middle: Builds warmth & romantic pull
  { text: "But beyond that moment, there's you. The light in my entire life.", duration: 7000, fadeDuration: 2000 },
  { text: "When you smile, it’s like the whole universe holds its breath.", duration: 7000, fadeDuration: 2000 },
  { text: "I see forever in your eyes, a future bathed in starlight.", duration: 8000, fadeDuration: 2500 },
  { text: "You are my favorite melody, my most precious secret, my everything.", duration: 9000, fadeDuration: 2500 },
  
  // 🔥 End: Soft, seductive lines that leave her blushing
  { text: "Now, let’s leave the world behind for a moment, just you and I.", duration: 7000, fadeDuration: 2000 },
  { text: "I want to trace every curve of your smile with my fingertips.", duration: 8000, fadeDuration: 2000 },
  { text: "You have no idea the things I imagine when I look at you like this...", duration: 9000, fadeDuration: 2500 },
  { text: "Just say the word, and I'll make sure you forget your name by morning.", duration: 10000, fadeDuration: 3000 }, // Smooth, confident, extreme flirt
  { text: "Ready to let me worship you? 😉", duration: 12000, fadeDuration: 4000 },
];

const TOTAL_DURATION = EMOTIONAL_FLOW.reduce((acc, line) => acc + line.duration, 0) / 1000;
console.log(`Total text duration: ~${Math.round(TOTAL_DURATION)} seconds (~${(TOTAL_DURATION / 60).toFixed(1)} min)`);


// --- 2. 3D COMPONENTS ---

/**
 * Rose Component: Loads and animates the 3D rose model
 */
function Rose({ position, speed = 0.5, scale = 0.5, rotationSpeed = 0.005 }) {
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
          if (child.material.emissive) {
            child.material.emissiveIntensity = 0.5 * pulseScale;
          }
        }
      });
    }
  });

  return (
    <primitive 
      ref={ref} 
      object={scene.clone()} // Clone scene for multiple roses
      position={position} 
      scale={[scale, scale, scale]} 
    />
  );
}

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
    // Subtle moon/light pulse synchronized with text
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    state.scene.traverse(child => {
      if (child.isLight) {
        child.intensity = 1 * pulse;
      }
    });
  });

  return (
    <>
      {/* Ambient Light for overall scene */}
      <ambientLight intensity={0.5} color="#FBEAEB" /> 
      {/* Main Moon Light: Soft, misty glow */}
      <pointLight position={[5, 5, 5]} intensity={1} color="#b3d9ff" distance={50} decay={2} /> 
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ffb3d9" distance={30} decay={2} />
      
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

// --- 3. PAGE LOGIC (Text and Audio) ---

export default function MyQueenPage() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const audioRef = useRef(null);
  
  const currentLine = EMOTIONAL_FLOW[currentLineIndex];
  const isFinished = currentLineIndex >= EMOTIONAL_FLOW.length;
  
  const textAnimationDuration = currentLine ? currentLine.fadeDuration : 2000;

  // Manages the sequential text and fade effects
  useEffect(() => {
    if (isFinished) {
      setOpacity(0.9); // Keep the final line visible
      return;
    }

    let currentTimeout;
    
    // 1. Fade In
    setOpacity(1);

    // 2. Hold, then start Fade Out
    const holdTime = currentLine.duration - currentLine.fadeDuration;
    currentTimeout = setTimeout(() => {
      setOpacity(0);
    }, holdTime);

    // 3. Move to Next Line (after total duration)
    const nextLineTimeout = setTimeout(() => {
      setCurrentLineIndex((prevIndex) => prevIndex + 1);
    }, currentLine.duration);

    return () => {
      clearTimeout(currentTimeout);
      clearTimeout(nextLineTimeout);
    };
  }, [currentLineIndex, isFinished]);
  
  // Auto-play audio handler
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch(error => {
          // Auto-play blocked, prompt user interaction
          console.log("Autoplay blocked. User interaction needed to play music.", error);
        });
      }
    };

    // Attempt to play immediately on mount
    playAudio();

    // Attach event listener for user interaction as a fallback
    const handleInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchend', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchend', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchend', handleInteraction);
    };
  }, []);

  return (
    <>
      <Head>
        <title>My Queen 👑</title>
      </Head>

      <audio ref={audioRef} src="/her-majesty.mp3" loop />
      
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0 bg-black">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <StarryNight />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-screen w-full justify-center items-center p-4">
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

        {/* Cinematic Text Card */}
        <main className="text-center font-cursive p-10 max-w-4xl w-[90%] mx-auto bg-black/10 rounded-2xl border border-pink-glow/20 shadow-2xl shadow-pink-glow/10">
          <h1 
            style={{ 
              opacity: opacity,
              transition: `opacity ${textAnimationDuration / 1000}s ease-in-out`
            }}
            className="text-8xl md:text-9xl text-white text-glowing animate-pulseSubtle"
          >
            {isFinished ? EMOTIONAL_FLOW[EMOTIONAL_FLOW.length - 1].text : currentLine?.text || ''}
          </h1>
        </main>
        
        {/* Footer */}
        <footer className="absolute bottom-10 text-xl text-white/80 font-sans tracking-widest text-glowing">
          — From Ayomide 🌹💫
        </footer>
      </div>
    </>
  );
}

// Preload the GLTF model outside the component to prevent flickering
useGLTF.preload('/rose.glb');
