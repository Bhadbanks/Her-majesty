import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";

// Lines for apology → romance → seductive tease
const lines = [
  // 💔 Apology
  "My Queen… I know I’ve faltered sometimes, and I wish I could take back every moment I wasn’t there for you.",
  "I hope you can forgive me, because my heart beats only for you and every second apart feels heavy.",
  "You deserve all the love, warmth, and care in this world, and I promise to always strive to give you that.",
  // ❤️ Romantic
  "Even across screens, even when distance stretches between us, my thoughts are wrapped around you.",
  "Every smile you share, every quiet moment, every laugh I imagine belongs to you and only you.",
  "No one else could ever light up my world the way you do; every heartbeat whispers your name.",
  "I dream of the day we meet, the moment I can finally hold you close and never let go.",
  // 🔥 Seductive tease
  "If only you knew what your presence does to me each night… how every thought of you sets my heart on fire.",
  "I long for the warmth of your touch and the way your voice sends shivers down my spine.",
  "My Queen, you are my everything, my desire, my endless inspiration… and I ache for the moments just with you."
];

// 3D Rose
function Rose({ position, scale = 0.8 }) {
  const { scene } = useGLTF("/rose.glb");
  return <primitive object={scene} scale={scale} position={position} />;
}

// Pulse for stars & moon synchronized with text
function StarMoonPulse({ moonRef, starsRef, currentLine }) {
  useFrame(() => {
    const pulse = 1 + 0.05 * Math.sin(currentLine * 0.5);
    if (moonRef.current) moonRef.current.scale.set(pulse, pulse, pulse);
    if (starsRef.current) starsRef.current.material.size = 1 + 0.5 * Math.sin(currentLine * 0.5);
  });
  return null;
}

export default function Home() {
  const [currentLine, setCurrentLine] = useState(0);
  const moonRef = useRef();
  const starsRef = useRef();
  const audioRef = useRef();

  // Sequential line transitions (~1.5 min total)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => (prev < lines.length - 1 ? prev + 1 : prev));
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // Set audio volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.5;
  }, []);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      {/* Background music */}
      <audio ref={audioRef} autoPlay loop src="/her-majesty.mp3" className="hidden" />

      {/* 3D Scene */}
      <Canvas className="absolute top-0 left-0 w-full h-full">
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />

        {/* Stars */}
        <Stars ref={starsRef} radius={120} depth={50} count={8000} factor={4} saturation={0} fade />

        {/* Floating roses */}
        <Suspense fallback={null}>
          {[...Array(5)].map((_, i) => (
            <motion.mesh
              key={i}
              position={[Math.random() * 20 - 10, Math.random() * 10 - 5, -i * 5]}
              animate={{ y: ["-0.5", "0.5"], scale: [1, 1.05, 1] }}
              transition={{ duration: 6 + i, repeat: Infinity, yoyo: Infinity }}
            >
              <Rose position={[0, 0, 0]} scale={0.8 + Math.random() * 0.4} />
            </motion.mesh>
          ))}
        </Suspense>

        {/* Misty Moon */}
        <mesh ref={moonRef} position={[5, 7, -20]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial color="#fef9e8" emissive="#fff5cc" emissiveIntensity={0.5} roughness={0.5} />
        </mesh>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

        {/* Pulse synced with text */}
        <StarMoonPulse moonRef={moonRef} starsRef={starsRef} currentLine={currentLine} />
      </Canvas>

      {/* Text overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 40, textShadow: "0px 0px 20px #ff99cc" }}
            animate={{
              opacity: index === currentLine ? 1 : 0,
              y: index === currentLine ? 0 : 40,
              textShadow: index === currentLine
                ? "0px 0px 30px #ff99cc, 0px 0px 40px #ff66aa"
                : "0px 0px 20px #ff99cc"
            }}
            transition={{ duration: 2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-cursive text-pink-200 my-4 drop-shadow-xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-10 w-full text-center text-pink-200 font-cursive text-2xl drop-shadow-lg animate-pulse">
        — From Ayomide 🌹💫
      </div>
    </div>
  );
          }
