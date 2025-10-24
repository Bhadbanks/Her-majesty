import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* === romantic lines (kept exactly) === */
const romanticLines = [
  "My Queen 🥺🌹",
  "I know I’ve messed up...",
  "I’m truly sorry for the pain I caused you 💔",
  "You didn’t deserve any of it, my love",
  "You deserve peace, happiness, and someone who never hurts you",
  "And I promise, I’m working every day to be that man for you 🙏",
  "All I ever wanted was to make you smile",
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
  "And that cute attitude of yours? It’s dangerous, loml 🌝",
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

/* ====== Procedural "rose" mesh: stylized using torus + petals ====== */
function StylizedRose({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null!);

  // gentle sway animation
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.1 * delta;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05 * scale;
    }
  });

  // materials
  const petalMat = new THREE.MeshStandardMaterial({ color: 0xff4d9e, roughness: 0.4, metalness: 0.1, emissive: 0x220011, emissiveIntensity: 0.06 });
  const coreMat = new THREE.MeshStandardMaterial({ color: 0xff9acc, roughness: 0.3, metalness: 0.2, emissive: 0x330011, emissiveIntensity: 0.08 });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* core */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial {...coreMat} />
      </mesh>

      {/* petals: layered torus-ish */}
      {[0, 0.5, 1].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, i * 0.6, 0]} position={[0, 0.05 - i * 0.02, 0]} castShadow>
          <torusGeometry args={[0.3 - i * 0.07, 0.12 + i * 0.02, 12, 40]} />
          <meshStandardMaterial {...petalMat} />
        </mesh>
      ))}

      {/* little stem */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color={0x186a3b} />
      </mesh>
    </group>
  );
}

/* ====== Many roses arranged in the scene ====== */
function RosesField() {
  const positions: [number, number, number][] = [
    [-3.5, -1.3, -2],
    [2.7, -0.8, -3],
    [4.5, 0.5, -4],
    [-5, 0.8, -3.5],
    [1.2, 2.3, -5],
    [-1.7, 1.5, -3],
    [3.8, -2.1, -2.5]
  ];

  return (
    <>
      {positions.map((p, i) => (
        <Float key={i} speed={1 + i * 0.12} rotationIntensity={0.6} floatIntensity={1.2}>
          <StylizedRose position={p} scale={0.9 + (i % 3) * 0.25} />
        </Float>
      ))}
    </>
  );
}

/* ====== Stars particle field (points) ====== */
function StarsField() {
  const ref = useRef<THREE.Points>(null);

  useFrame(() => {
    if (ref.current) {
      const mat = ref.current.material as THREE.PointsMaterial;
      mat.size = 0.09 + Math.sin(Date.now() * 0.002) * 0.03;
    }
  });

  const count = 400;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 40;
    pos[i * 3 + 1] = (Math.random() - 0.8) * 30 + 2;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10;
  }

  return (
    <points ref={ref} position={[0, 0, -5]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={pos} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.09} color={"#ffffff"} transparent opacity={0.9} />
    </points>
  );
}

/* ====== Mild fog/atmosphere and soft lights are set in the Canvas parent ====== */

export default function HomePage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* audio autoplay with fallback to user interaction */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.38;

    const tryPlay = () => {
      audio.play().catch(() => {
        /* will wait for a real interaction */
      });
    };

    tryPlay();
    document.addEventListener("click", tryPlay);
    document.addEventListener("touchstart", tryPlay);

    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  /* lines cycle */
  useEffect(() => {
    const showDuration = currentLine === 0 ? 3000 : 4200;
    const hideDuration = 900;
    const t1 = setTimeout(() => setIsVisible(false), showDuration);
    const t2 = setTimeout(() => {
      if (currentLine < romanticLines.length - 1) {
        setCurrentLine((s) => s + 1);
        setIsVisible(true);
      } else {
        // optionally loop:
        // setCurrentLine(0);
        // setIsVisible(true);
      }
    }, showDuration + hideDuration);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentLine]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* 3D canvas */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <fog attach="fog" args={["#0f0520", 2, 18]} />
          <ambientLight intensity={0.25} />
          <directionalLight position={[5, 10, 5]} intensity={0.6} />
          <pointLight position={[-6, -4, 4]} color={"#ff9acc"} intensity={0.25} />
          <StarsField />
          <Suspense fallback={null}>
            <RosesField />
          </Suspense>
          {/* Nice camera controls for desktop (no pan) */}
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} autoRotate={false} />
        </Canvas>
      </div>

      {/* subtle particle shimmer overlay (DOM) */}
      <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
        {[...Array(28)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              filter: "blur(6px)",
              transform: `translate(-50%, -50%)`,
              animation: `float ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0) scale(1); opacity:0.6; }
          50% { transform: translateY(-20px) translateX(6px) scale(1.1); opacity:1; }
          100% { transform: translateY(0) translateX(0) scale(1); opacity:0.6; }
        }
      `}</style>

      {/* center text */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: 1100, textAlign: "center", pointerEvents: "auto" }}>
          <div style={{ transition: "all 1000ms", transform: isVisible ? "scale(1)" : "scale(.96)", opacity: isVisible ? 1 : 0 }}>
            <h1 className="shimmer" style={{ fontFamily: "'Pacifico', cursive", fontSize: "3.6rem", lineHeight: 1.05, margin: 0, textShadow: "0 0 40px rgba(255,182,193,0.8)" }}>
              {romanticLines[currentLine]}
            </h1>
          </div>
        </div>
      </div>

      {/* footer credit */}
      <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center", zIndex: 20 }}>
        <p style={{ margin: 0, fontFamily: "'Pacifico', cursive", fontSize: 18, color: "rgba(255,255,255,0.92)", textShadow: "0 0 12px rgba(0,0,0,0.5)" }}>
          — With heart ❤️ From Ayomide 🌹💫
        </p>
      </div>

      {/* audio element (must be in public/her-majesty.mp3) */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/her-majesty.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
        }
