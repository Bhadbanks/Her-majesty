import { useEffect, useRef, useState } from "react";

/**
 * For Kofoworola 🌹 & Oyindamola 🤍✨️
 * From King Lowkey ⚡️
 */

const LINES = [
  "Under the calm sky, the night remembers your laughter 🌙",
  "Kofoworola 🌹 and Oyindamola 🤍 — my favorite constellation ✨",
  "You both glow differently, yet together you light up everything 💫",
  "Kofoworola — your warmth feels like sunrise after a long storm ☀️",
  "Oyindamola — your calm is the rhythm every heart needs 🎶",
  "You’re the balance of fire and peace, energy and grace ⚖️",
  "Every smile, every look — tiny galaxies forming between us 🌌",
  "You’ve made the ordinary feel like poetry 🥺",
  "Even silence with you two hums like music ❤️",
  "I still replay your laughter when the night feels too long 🎧",
  "Because somehow, you turned friendship into art 🎨",
  "You remind me that real bonds don’t fade, they just glow slower 🌠",
  "Tonight, even the moon looks jealous — it’s not the only light out here 😌",
  "If the stars could whisper, they’d say your names softly 💞",
  "Kofoworola 🌹 and Oyindamola 🤍 — rare souls, timeless hearts 🕊️",
  "May your dreams always meet where peace lives ✨",
  "And may this night carry a piece of my gratitude 🌙",
  "For your laughter, your patience, your hearts 💫",
  "You’re both beautiful stories written in starlight 💕",
  "— King Lowkey ⚡️"
];

function createStars(n: number) {
  const stars = [];
  for (let i = 0; i < n; i++) {
    const size = Math.random() * 2.6 + 0.6;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 3;
    const duration = 2 + Math.random() * 3;
    stars.push({ id: i, size, left, top, delay, duration });
  }
  return stars;
}

function createHearts(n: number) {
  const hearts = [];
  for (let i = 0; i < n; i++) {
    const left = Math.random() * 100;
    const top = 60 + Math.random() * 40;
    const delay = Math.random() * 3;
    const duration = 6 + Math.random() * 6;
    const scale = 0.9 + Math.random() * 0.9;
    hearts.push({ id: i, left, top, delay, duration, scale });
  }
  return hearts;
}

export default function Home() {
  const stars = createStars(60);
  const hearts = createHearts(10);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // autoplay music
  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
      } catch {
        const resume = async () => {
          try {
            await audioRef.current?.play();
          } catch {}
          document.removeEventListener("click", resume);
          document.removeEventListener("touchstart", resume);
        };
        document.addEventListener("click", resume);
        document.addEventListener("touchstart", resume);
      }
    };
    playAudio();
  }, []);

  // text cycling
  useEffect(() => {
    const showDuration = 4500;
    const hideTimer = setTimeout(() => setVisible(false), showDuration);
    const nextTimer = setTimeout(() => {
      setIndex((i) => Math.min(i + 1, LINES.length - 1));
      setVisible(true);
    }, showDuration + 1000);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [index]);

  return (
    <div className="app">
      {/* background gradient */}
      <div className="bg"></div>

      {/* moon */}
      <div className="moon"></div>

      {/* stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            transform: `scale(${h.scale})`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* text */}
      <div className="center">
        <div className="card">
          <h1 className="title">Kofoworola 🌹 &amp; Oyindamola 🤍✨️</h1>
          <p className={`line ${visible ? "visible" : "hidden"}`}>
            {LINES[index]}
          </p>
          <div className="signature">— King Lowkey ⚡️</div>
        </div>
      </div>

      {/* your music */}
      <audio ref={audioRef} src="/her-majesty.mp3" loop preload="auto" />

      <style>{`
        .app {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(ellipse at bottom, #0d0221 0%, #000 100%);
          color: white;
          font-family: 'Poppins', sans-serif;
        }

        .bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #0a0018, #120028);
          animation: skyGlow 8s ease-in-out infinite alternate;
          z-index: 0;
        }

        @keyframes skyGlow {
          from { filter: brightness(0.9); }
          to { filter: brightness(1.2); }
        }

        .moon {
          position: absolute;
          top: 10%;
          right: 20%;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff9e6 20%, #f0e0b0 60%, transparent 80%);
          box-shadow: 0 0 40px 15px rgba(255, 250, 200, 0.5);
          animation: moonFloat 12s ease-in-out infinite alternate;
          z-index: 1;
        }

        @keyframes moonFloat {
          from { transform: translateY(0px); opacity: 0.9; }
          to { transform: translateY(20px); opacity: 1; }
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.7;
          animation: twinkle ease-in-out infinite alternate;
        }

        @keyframes twinkle {
          from { opacity: 0.2; }
          to { opacity: 1; }
        }

        .heart {
          position: absolute;
          font-size: 16px;
          animation: floatUp linear infinite;
          opacity: 0.8;
        }

        @keyframes floatUp {
          from { transform: translateY(0) scale(1); opacity: 0.8; }
          to { transform: translateY(-100vh) scale(1.3); opacity: 0; }
        }

        .center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 5;
          padding: 0 16px;
        }

        .card {
          max-width: 700px;
          background: rgba(255,255,255,0.05);
          padding: 24px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 40px rgba(255,255,255,0.1);
        }

        .title {
          font-size: 1.6rem;
          font-weight: 600;
          color: #ffd6ff;
          text-shadow: 0 0 15px #ff7ce5;
        }

        .line {
          font-size: 1.25rem;
          transition: all 1s ease;
          opacity: 0;
          margin-top: 18px;
          line-height: 1.5;
        }

        .line.visible {
          opacity: 1;
          transform: scale(1);
        }

        .line.hidden {
          opacity: 0;
          transform: scale(0.98);
        }

        .signature {
          margin-top: 24px;
          font-style: italic;
          font-weight: 500;
          color: #ffe6f0;
        }
      `}</style>
    </div>
  );
            }
