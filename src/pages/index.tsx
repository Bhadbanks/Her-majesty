// src/pages/index.tsx
import Head from 'next/head';
import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Background } from '../components/Background';
import { Rose } from '../components/Rose';
import { CinematicText } from '../components/CinematicText';
import { Footer } from '../components/Footer';
import { Environment } from '@react-three/drei';

const NUM_ROSES = 15; // Number of floating roses

export default function MyQueenPage() {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Function to handle auto-play with a common user-interaction trigger
  const handlePlayMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
        // Fallback for browsers that block initial autoplay:
        // You might add a "Click to Enter" button here.
      });
    }
  };

  useEffect(() => {
    // Attempt to play music immediately
    handlePlayMusic();

    // Add event listener to play on any user interaction (like mouse move/click)
    window.addEventListener('click', handlePlayMusic);
    window.addEventListener('mousemove', handlePlayMusic);

    return () => {
      window.removeEventListener('click', handlePlayMusic);
      window.removeEventListener('mousemove', handlePlayMusic);
    };
  }, []);

  return (
    <>
      <Head>
        <title>My Queen 👑</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="relative min-h-screen flex flex-col justify-center items-center">
        {/* 1. Music (Autoplay & Loop) */}
        <audio
          ref={audioRef}
          src="/her-majesty.mp3"
          autoPlay
          loop
          className="hidden"
          title="Romantic Instrumental Music"
        />

        {/* 2. Background Visuals (CSS) */}
        <Background />

        {/* 3. 3D Roses (R3F Canvas) */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={1.5} color="#FFD700" /> {/* Subtle gold ambient light */}
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF69B4" /> {/* Pink point light */}

            {/* Environment lighting for better realism */}
            <Environment preset="night" />

            {/* Render multiple roses */}
            {Array.from({ length: NUM_ROSES }).map((_, i) => (
              <Rose key={i} index={i} />
            ))}
          </Canvas>
        </div>

        {/* 4. Cinematic Text Overlay */}
        <div className="absolute inset-0 z-10 flex justify-center items-center">
          <CinematicText />
        </div>

        {/* 5. Footer Signature */}
        <Footer />
      </main>
    </>
  );
}
