import { useEffect, useState, useRef } from "react";

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

export default function HomePage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // audio autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    const attemptPlay = () => {
      audio.play().catch(() => {});
    };
    attemptPlay();
    document.addEventListener("click", attemptPlay, { once: true });
    document.addEventListener("touchstart", attemptPlay, { once: true });
  }, []);

  // text transition
  useEffect(() => {
    const showTime = 3000;
    const hideTime = 1000;
    const showTimer = setTimeout(() => setVisible(false), showTime);
    const nextTimer = setTimeout(() => {
      setCurrentLine((i) => (i + 1) % romanticLines.length);
      setVisible(true);
    }, showTime + hideTime);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(nextTimer);
    };
  }, [currentLine]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0a0015] via-[#1a0a2e] to-[#0f0520]">
      {/* stars */}
      <div className="absolute inset-0 z-0 pointer-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.5 + Math.random() * 0.5,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* floating roses */}
      <div className="absolute inset-0 z-5 pointer-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl text-pink-300 opacity-70 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "drop-shadow(0 0 10px pink)",
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            🌹
          </div>
        ))}
      </div>

      {/* romantic line */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-none">
        <h1
          className={`text-center px-6 text-4xl md:text-6xl font-bold bg-clip-text text-transparent transition-all duration-1000 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff, #ffc0cb, #ff69b4)",
            textShadow:
              "0 0 40px rgba(255,182,193,0.8), 0 0 80px rgba(255,105,180,0.6)",
            fontFamily: "'Pacifico', cursive",
            lineHeight: 1.1,
          }}
        >
          {romanticLines[currentLine]}
        </h1>
      </div>

      {/* footer */}
      <div className="absolute bottom-8 w-full text-center z-20 pointer-none">
        <p style={{ fontFamily: "'Pacifico', cursive", fontSize: "1.2rem", color: "rgba(255,255,255,0.9)" }}>
          — With heart ❤️ From Ayomide 🌹💫
        </p>
      </div>

      {/* music */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/her-majesty.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
            }
