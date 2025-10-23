import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// --- CONFIGURATION: Emotional Flow & Timing ---

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
  { text: "Just say the word, and I'll make sure you forget your name by morning.", duration: 10000, fadeDuration: 3000 }, 
  { text: "Ready to let me worship you? 😉", duration: 12000, fadeDuration: 4000 },
];

// --- Dynamic Import for Client-Side Rendering ---
// This is the fix: it ensures the WebGL-dependent component only runs in the browser.
const DynamicThreeScene = dynamic(
  () => import('../components/ThreeScene'),
  { ssr: false } // Crucial: Disable Server-Side Rendering
);

// --- PAGE LOGIC (Text and Audio) ---

export default function MyQueenPage() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const audioRef = useRef(null);
  
  const currentLine = EMOTIONAL_FLOW[currentLineIndex];
  const isFinished = currentLineIndex >= EMOTIONAL_FLOW.length;
  
  // Get the fade duration for smooth animation timing
  const textAnimationDuration = currentLine ? currentLine.fadeDuration : 2000;

  // Manages the sequential text and fade effects
  useEffect(() => {
    if (isFinished) {
      setOpacity(0.9); // Keep the final line visible
      return;
    }

    let holdTimeout;
    let nextLineTimeout;
    
    // 1. Fade In
    setOpacity(1);

    // 2. Hold, then start Fade Out
    const holdTime = currentLine.duration - currentLine.fadeDuration;
    holdTimeout = setTimeout(() => {
      setOpacity(0);
    }, holdTime);

    // 3. Move to Next Line (after total duration)
    nextLineTimeout = setTimeout(() => {
      setCurrentLineIndex((prevIndex) => prevIndex + 1);
    }, currentLine.duration);

    return () => {
      clearTimeout(holdTimeout);
      clearTimeout(nextLineTimeout);
    };
  }, [currentLineIndex, isFinished]);
  
  // Auto-play audio handler with fallback for browser restrictions
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = 0.7;
        audioRef.current.play().catch(error => {
          // console.log("Autoplay blocked. User interaction needed to play music.", error);
        });
      }
    };

    // Fallback: Play audio on first user interaction
    const handleInteraction = () => {
      playAudio();
      // Remove listeners once audio successfully starts playing
      if (audioRef.current && !audioRef.current.paused) {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchend', handleInteraction);
      }
    };

    // Attach event listeners for user interaction
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchend', handleInteraction);

    // Initial attempt to play immediately (might fail, hence the fallback)
    playAudio();

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
      
      {/* 3D Canvas Background - Dynamically rendered for client-side safety */}
      <DynamicThreeScene />

      {/* Content Overlay: Centered, almost full screen, cinematic feel */}
      <div className="relative z-10 flex flex-col h-screen w-full justify-center items-center p-4">
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

        {/* Cinematic Text Card/Container */}
        <main className="text-center font-cursive p-10 max-w-4xl w-[90%] mx-auto bg-black/10 rounded-2xl border border-pink-glow/20 shadow-2xl shadow-pink-glow/10">
          <h1 
            style={{ 
              opacity: opacity,
              // Smooth fade in/out animation synchronized with text timing
              transition: `opacity ${textAnimationDuration / 1000}s ease-in-out`
            }}
            className="text-8xl md:text-9xl text-white text-glowing animate-pulseSubtle"
          >
            {isFinished 
              ? EMOTIONAL_FLOW[EMOTIONAL_FLOW.length - 1].text 
              : currentLine?.text || ''
            }
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
