import { useEffect, useState, useRef } from "react";

const romanticLines = [
  "To Kofoworola 🌹 & Oyindamola 🤍✨️",
  "Two souls who make the night feel softer...",
  "You both bring light even to the darkest skies 💫",
  "Your laughter — it’s a melody I never want to forget 🎵",
  "Your kindness and warmth inspire everything around you",
  "The way you both glow… it’s impossible not to notice 🌌",
  "Some people just have that magic — and you’re both made of it ✨",
  "If the stars could talk, they’d speak your names",
  "Thank you for being my peace, my joy, my friends 🫶",
  "The world’s a lot more beautiful with you two in it 🌹🤍",
  "Never stop shining, never stop smiling",
  "And if you ever forget how special you are —",
  "Look at the stars… they’ll remind you 🌠",
  "You’re loved more than you know 💞",
  "Always — King Lowkey ⚡️🌹"
];

export default function Home() {
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🔊 Auto play (safe for mobile)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    const playAudio = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };
    document.addEventListener("click", playAudio);
    document.addEventListener("touchstart", playAudio);
    audio.play().catch(() => {});
  }, []);

  // ⏳ Text transitions
  useEffect(() => {
    const showDuration = 7000;
    const hideDuration = 1000;
    const showTimer = setTimeout(() => setVisible(false), showDuration);
    const nextTimer = setTimeout(() => {
      if (currentLine < romanticLines.length - 1) {
        setCurrentLine((c) => c + 1);
        setVisible(true);
      }
    }, showDuration + hideDuration);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(nextTimer);
    };
  }, [currentLine]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#070011] via-[#120625] to-[#000010]">
      {/* 🌙 Glowing moon */}
      <div className="absolute top-10 right-16 z-10">
        <div className="w-28 h-28 bg-gradient-to-br from-yellow-100 to-yellow-400 rounded-full shadow-[0_0_60px_20px_rgba(255,255,150,0.4)] animate-moon" />
      </div>

      {/* 🌟 Background stars */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-pulse"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* ❤️ Floating hearts */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 text-lg animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 6}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* ✨ Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-shimmer z-10" />

      {/* 💬 Main text */}
      <div className="relative z-20 flex items-center justify-center w-full h-full px-8">
        <div className="w-full max-w-4xl text-center">
          <h1
            className={`transition-all duration-1000 transform ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-300 via-pink-200 to-white bg-clip-text text-transparent animate-softfloat`}
            style={{
              fontFamily: "'Pacifico', cursive",
              textShadow:
                "0 0 40px rgba(255, 182, 193, 0.8), 0 0 80px rgba(255, 105, 180, 0.6)",
              lineHeight: "1.4"
            }}
          >
            {romanticLines[currentLine]}
          </h1>
        </div>
      </div>

      {/* 🖋 Signature */}
      <div className="absolute bottom-8 left-0 right-0 z-30 text-center">
        <p
          className="text-2xl text-white/90 drop-shadow-lg"
          style={{
            fontFamily: "'Pacifico', cursive",
            textShadow: "0 0 20px rgba(255, 182, 193, 0.6)"
          }}
        >
          — With heart ❤️ From King Lowkey ⚡️🌹
        </p>
      </div>

      {/* 🎵 Music */}
      <audio ref={audioRef} src="/her-majesty.mp3" loop></audio>

      {/* 🌸 Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}

/* 🌌 Custom Animations */
const style = document.createElement("style");
style.innerHTML = `
@keyframes float {
  0% { transform: translateY(0) scale(1); opacity: 0.9; }
  50% { transform: translateY(-60vh) scale(1.2); opacity: 1; }
  100% { transform: translateY(-100vh) scale(0.8); opacity: 0; }
}
.animate-float { animation: float linear infinite; }

@keyframes shimmer {
  0%,100% { opacity: 0.05; }
  50% { opacity: 0.15; }
}
.animate-shimmer { animation: shimmer 3s ease-in-out infinite; }

@keyframes softfloat {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-6px) scale(1.02); }
}
.animate-softfloat { animation: softfloat 4s ease-in-out infinite; }

@keyframes moonmove {
  0%, 100% { transform: translateY(0px); filter: brightness(1); }
  50% { transform: translateY(8px); filter: brightness(1.2); }
}
.animate-moon { animation: moonmove 6s ease-in-out infinite; }
`;
document.head.appendChild(style);
