import { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
const romanticLines = [
  "My Queen 👑",
  "I know I’ve messed up...",
  "I’m truly sorry for the pain I caused you 💔",
  "You didn’t deserve any of it, my love",
  "You deserve peace, happiness, and someone who never hurts you",
  "And I promise, I’m working every day to be that man for you 🙏",
  "all I ever wanted was to make you smile",
  "You mean too much to me to ever lose 💔",
  "But please hear this from my heart...",
  "You are the most beautiful soul I’ve ever known ✨",
  "My omalicha, my lovebug, my cute little coconut head girl 💞",
  "Even from miles away, your energy pulls me in",
  "Your smile could light up my whole world",
  "Your laugh? It’s my favorite sound ever 🎵",
  "You make my heart race even through a screen",
  "And your stubbornness… oh, it just makes you more adorable 😅",
  "You’ve got this magic that keeps me thinking of you all day",
  "I dream of the moment I finally hold you close",
  "To look into your eyes and say, ‘You’re my everything’ 💫",
  "lovebug🌚",
  "You know how crazy you make me, right?",
  "The way you talk, the way you tease me… you’re too good at this 😌",
  "You’ve got me wrapped around your little finger, coconut head 💕",
  "Every time you call me ‘babe,’ my whole mood changes",
  "And that cute attitude of yours? It’s dangerous,loml 🌝",
  "You make me weak and addicted at the same time",
  "Stop making me fall harder every day — it’s not fair 😅",
  "I swear, you’ve got me smiling like a fool every time we talk",
  "..but always try to let go of the past, so it won't affect the present and our future🥺🌹",
  "But let’s be real for a second…",
  "If your lips were near mine right now 🫦",
  "I’d forget every word I just said",
  "I’d pull you close, whisper your name, and let you feel every heartbeat",
  "I’d kiss you until you forget what distance even means 💋",
  "Your voice, your laugh, your everything — it drives me insane",
  "You’re intoxicating, mesmerizing, irresistible",
  "I want to make you blush till you hide your face in your hands 😘",
  "I want to be the reason you smile before bed and wake up grinning in the morning ☀️🌙",
  "You’re not just my queen… you’re my craving, my weakness, my desire 🔥",
  "And I’m completely, hopelessly, madly yours — forever and always 🌹✨",
  "I love you babe🥺🌹"
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
