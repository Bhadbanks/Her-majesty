import { useEffect, useRef, useState } from "react";

/**
 * For Kofoworola 🌹 & Oyindamola 🤍✨️
 * From King Lowkey ⚡️
 * Cinematic Night Edition ✨
 */

const LINES = [
  "Hey you two… 🌙",
  "Kofoworola 🌹 & Oyindamola 🤍✨️",
  "My favorite duo since chaos found its rhythm 😌",
  "You both have this magic — loud enough to fill silence, soft enough to calm storms 💫",
  "Kofoworola… short queen with the legendary forehead 😅👑",
  "That forehead’s got more shine than the moon itself 🌝",
  "You walk in with attitude — but your laughter always betrays you 😄",
  "And behind that sass is a heart that forgives too easily, loves too deeply 💞",
  "Church girl, but still the reason trouble looks fun 😇🔥",
  "Oyindamola 🤍 — your calmness is golden, but don’t push her buttons 😌",
  "Caring, thoughtful, hardworking… like she’s got a heart that doesn’t rest 💪",
  "You see the good in everyone — but you’ll fight for what’s right too ⚔️",
  "You’ve both been friends since forever — laughter, tears, secrets, all woven tight 🪶",
  "The kind of friendship that time only polishes, never fades ✨",
  "Every talk, every joke, every moment — I see light in it 🌌",
  "You both remind me that kindness can be loud, and love can be playful 💛",
  "Sometimes I just stop and think — how lucky am I to know you two? 😔❤️",
  "Because when I say I appreciate you, I mean it — from the deepest part 💫",
  "You’re both stars — and even the sky feels jealous tonight 🌠",
  "So if this moment feels warm, it’s just my gratitude finding its way to you 💭",
  "Keep being sunshine and spark — both of you 🌞✨",
  "This world’s too cold for your kind of warmth, don’t ever dim 🔥",
  "To my forever favorites — with love, laughter, and a smile I can’t hide 😌",
  "With all respect and chaos,",
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

  // autoplay your music
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

  // cinematic fade + slide transitions
  useEffect(() => {
    const showDuration = 5500;
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
      <div className="bg" />
      <div className="moon" />

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
            animationDuration: `${s.duration}s`
          }}
        />
      ))}

      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            transform: `scale(${h.scale})`
          }}
        >
          ❤️
        </div>
      ))}

      <div className="center">
        <div className="card">
          <h1 className="title">Kofoworola 🌹 &amp; Oyindamola 🤍✨️</h1>
          <p className={`line ${visible ? "visible" : "hidden"}`}>
            {LINES[index]}
          </p>
          <div className="signature">— King Lowkey ⚡️</div>
        </div>
      </div>

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
          background: linear-gradient(to top, #080011, #140030);
          animation: skyGlow 8s ease-in-out infinite alternate;
          z-index: 0;
        }

        @keyframes skyGlow {
          from { filter: brightness(0.9); }
          to { filter: brightness(1.2); }
        }

        .moon {
          position: absolute;
          top: 12%;
          right: 20%;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff8d8 25%, #e6c888 60%, transparent 90%);
          box-shadow: 0 0 60px 25px rgba(255, 245, 200, 0.4);
          animation: moonPulse 8s ease-in-out infinite alternate;
          z-index: 1;
        }

        @keyframes moonPulse {
          from { transform: translateY(0px) scale(1); opacity: 0.9; }
          to { transform: translateY(15px) scale(1.03); opacity: 1; }
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
          padding: 26px;
          border-radius: 22px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 50px rgba(255,255,255,0.08);
          transition: all 1s ease;
        }

        .title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #ffd6ff;
          text-shadow: 0 0 20px #ff7ce5;
          margin-bottom: 12px;
        }

        .line {
          font-size: 1.25rem;
          transition: all 1.2s ease;
          opacity: 0;
          margin-top: 10px;
          line-height: 1.6;
          transform: translateY(20px);
        }

        .line.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .line.hidden {
          opacity: 0;
          transform: translateY(-20px);
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
