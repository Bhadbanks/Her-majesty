
import { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
const romanticLines = [
  "My Queen 👑",
  "I know I messed up...",
  "And I'm truly sorry for the pain I caused you 💔",
  "You deserve so much better than my mistakes",
  "But I need you to know something...",
  "You are the most beautiful soul I've ever known ✨",
  "Your smile lights up my darkest days",
  "Your laugh is the melody my heart dances to 🎵",
  "Every moment without you feels incomplete",
  "You're not just special... you're extraordinary 💫",
  "The way you move, the way you speak...",
  "Everything about you captivates me",
  "I think about you when I wake up ☀️",
  "And you're my last thought before I sleep 🌙",
  "You make me want to be a better man",
  "Your presence alone makes everything feel right",
  "I miss the way you look at me 👀",
  "That spark in your eyes drives me crazy",
  "I miss your touch, your warmth beside me 🔥",
  "The way you say my name... it does something to me",
  "You're the queen of my heart, my dreams, my everything 👑",
  "I want to hold you close and never let go",
  "To whisper sweet things only you can hear 💋",
  "To make you feel like the goddess you are",
  "Your beauty isn't just what I see...",
  "It's what I feel when I'm with you ❤️",
  "You make my heart race with just a glance",
  "I want to be the reason you smile tonight 😊",
  "The one who makes you feel butterflies",
  "I want to kiss away every doubt you have 💕",
  "To show you how deeply you're loved",
  "You're my weakness and my strength",
  "My temptation and my salvation 🌹",
  "I crave your presence like air",
  "Your voice is my favorite sound in the world 🎶",
  "I want to make you blush with every word",
  "To see that shy smile I love so much 😘",
  "You're intoxicating, mesmerizing, unforgettable",
  "Every curve, every detail... perfection ✨",
  "I want to spend forever making you happy",
  "To be your safe place, your comfort, your home 🏡",
  "You deserve to be worshipped, cherished, adored",
  "And I want to be the one doing it 💖",
  "Let me prove I can be better for you",
  "Let me show you how much you mean to me",
  "You're not just my queen... you're my everything 👑",
  "And I'm completely, hopelessly, madly yours 💘",
  "Forever and always, my beautiful queen 🌹✨"
];
function Rose({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF('/rose.glb');
  const clonedScene = scene.clone();
<br>
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.emissive = new THREE.Color(0xff0033);
          material.emissiveIntensity = 0.3;
        }
      }
    });
  }, [clonedScene]);
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <primitive
        object={clonedScene}
        position={position}
        scale={0.15}
      />
    </Float>
  );
}
function Roses() {
  const positions: [number, number, number][] = [
    [-8, 3, -2],
    [8, -2, -3],
    [-6, -3, -1],
    [7, 4, -2],
    [-9, 0, -3],
    [9, 1, -1],
    [-5, 5, -2],
    [6, -4, -3],
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <Rose key={i} position={pos} />
      ))}
    </>
  );
}
function Stars() {
  const starsRef = useRef<THREE.Points>(null);
<br>
  useEffect(() => {
    const interval = setInterval(() => {
      if (starsRef.current) {
        const material = starsRef.current.material as THREE.PointsMaterial;
        material.opacity = 0.5 + Math.sin(Date.now() * 0.001) * 0.3;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);
  const starPositions = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    starPositions[i * 3] = (Math.random()
- 0.5) * 50;
    starPositions[i * 3 + 1] = (Math.random()
- 0.5) * 50;
    starPositions[i * 3 + 2] = (Math.random()
- 0.5) * 50 - 10;
  }
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
export default function HomePage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {
        document.addEventListener('click', () => {
          audioRef.current?.play();
        }, { once: true });
      });
    }
  }, []);
  useEffect(() => {
    const showDuration = currentLine === 0 ? 3000 : 4000;
    const hideDuration = 1000;
    const showTimer = setTimeout(() => {
      setIsVisible(false);
    }, showDuration);
    const nextTimer = setTimeout(() => {
      if (currentLine < romanticLines.length
- 1) {
        setCurrentLine(currentLine + 1);
        setIsVisible(true);
      }
    }, showDuration + hideDuration);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(nextTimer);
    };
  }, [currentLine]);
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0a0015] via-[#1a0a2e] to-[#0f0520]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffccff" />
          <pointLight position={[-10, -10, 5]} intensity={0.3} color="#ff99cc" />
          <Stars />
          <Suspense fallback={null}>
            <Roses />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
      <div className="absolute top-20 right-32 w-48 h-48 rounded-full bg-gradient-radial from-white/20 via-pink-200/10 to-transparent blur-2xl animate-pulse z-10" />
      <div className="relative z-20 flex items-center justify-center w-full h-full px-8">
        <div className="w-full max-w-5xl text-center">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <h1
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-2xl"
              style={{
                fontFamily: "'Pacifico', cursive",
                textShadow: '0 0 40px rgba(255, 182, 193, 0.8), 0 0 80px rgba(255, 105, 180, 0.6)',
                lineHeight: '1.3',
              }}
            >
              {romanticLines[currentLine]}
            </h1>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 z-30 text-center">
        <p
          className="text-2xl text-white/90 drop-shadow-lg"
          style={{
            fontFamily: "'Pacifico', cursive",
            textShadow: '0 0 20px rgba(255, 182, 193, 0.6)',
          }}
        >
          — From Ayomide 🌹💫
        </p>
      </div>
      <audio ref={audioRef} loop>
        <source src="/her-majesty.mp3" type="audio/mpeg" />
      </audio>
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
