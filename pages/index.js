import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
// ... rest of the imports

// --- 1. CONFIGURATION (Keep this the same) ---
const EMOTIONAL_FLOW = [
  // ... (Your text array here)
];
// ...

// --- 2. Dynamic Import for Client-Side Rendering ---
// This prevents Next.js from rendering the WebGL components on the server
const DynamicThreeScene = dynamic(
  () => import('../components/ThreeScene'),
  { ssr: false } // Crucial: Disable Server-Side Rendering
);

// --- 3. PAGE LOGIC (Text and Audio) ---

export default function MyQueenPage() {
  // ... (Keep state, effects, and logic the same) ...
  
  // ... (inside the return statement) ...
  
  return (
    <>
      <Head>
        <title>My Queen 👑</title>
      </Head>

      <audio ref={audioRef} src="/her-majesty.mp3" loop />
      
      {/* 3D Canvas Background - NOW DYNAMICALLY IMPORTED */}
      <DynamicThreeScene />

      {/* Content Overlay (Keep the same) */}
      <div className="relative z-10 flex flex-col h-screen w-full justify-center items-center p-4">
        {/* ... rest of the HTML content and logic ... */}
      </div>
    </>
  );
}
// Note: useGLTF.preload('/rose.glb') moves to ThreeScene.js
