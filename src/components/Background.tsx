// src/components/Background.tsx
import React from 'react';

export function Background() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Night Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-indigo-900 opacity-90" />

      {/* Misty Moon Glow (Large radial gradient) */}
      <div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #ADD8E6, transparent 70%)', // Light Blue/Misty
          opacity: 0.3,
          filter: 'blur(100px)',
          animation: 'moonPulse 4s infinite alternate',
        }}
      />

      {/* Subtle Star effect (using multiple box shadows for "stars") */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(2px 2px at 20px 30px, #fff, transparent),
            radial-gradient(2px 2px at 100px 200px, #fff, transparent),
            /* Add many more lines for a dense star field... */
            radial-gradient(1.5px 1.5px at 150px 350px, #ccc, transparent),
            radial-gradient(1px 1px at 300px 50px, #eee, transparent),
            radial-gradient(2px 2px at 500px 400px, #fff, transparent),
            radial-gradient(1.5px 1.5px at 700px 150px, #ccc, transparent),
            radial-gradient(2px 2px at 900px 250px, #fff, transparent),
            radial-gradient(1px 1px at 1100px 50px, #eee, transparent)
          `,
          backgroundSize: '1200px 100%',
          opacity: 0.7,
        }}
      />

      {/* Custom Keyframe for the pulsing moon/stars effect */}
      <style jsx global>{`
        @keyframes moonPulse {
          0% {
            opacity: 0.3;
            transform: scale(1) translate(-50%, -50%);
          }
          100% {
            opacity: 0.45;
            transform: scale(1.05) translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
}
