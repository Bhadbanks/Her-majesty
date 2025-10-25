import { useEffect, useRef, useState } from "react";

/**
 * For Kofoworola 🌹 & Oyindamola 🤍✨️
 * From King Lowkey ⚡️
 *
 * Music is generated in-browser (WebAudio) so no external file required.
 * Autoplay tries to start immediately, and also starts on first tap for mobile.
 */

/* --- long affectionate + playful lines --- */
const LINES = [
  "Hey you two… 🌙",
  "Kofoworola 🌹 & Oyindamola 🤍✨️",
  "My favorite duo since laughter became a language 😄",
  "You both bring energy, light, and a kind of peace I can’t explain 💫",
  "Kofoworola, your warmth feels like sunshine on a tired day ☀️",
  "Oyindamola, your calm chaos is quietly powerful 🤍",
  "Together you’re unstoppable — like stars that refuse to fade ✨",
  "You turn ordinary moments into something golden 💛",
  "Even silence with you feels like a cozy song 🎶",
  "I’m grateful for every laugh, every random midnight plan, every honest chat ❤️",
  "Distance? Nah — this bond doesn’t know how to be small 💫",
  "So here’s a tiny corner of the night — made just for you 🌌",
  "Let the stars glow for your friendship ✨",
  "May your hearts always find reasons to smile ❤️",
  "You’re both rare — together, legendary 🫶",
  "With all love and respect,",
  "— King Lowkey ⚡️"
];

/* Utility: create n DOM stars (random positions + sizes) */
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

/* Utility: floating hearts */
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

/* In-browser ambient generator (basic pad + gentle pulses) */
function useAmbientAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        try { ctxRef.current.close(); } catch {}
      }
    };
  }, []);

  const start = async () => {
    if (runningRef.current) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    ctxRef.current = ctx;

    // master
    const master = ctx.createGain();
    master.gain.value = 0.0001; // start near silence for gentle fade-in
    master.connect(ctx.destination);
    masterRef.current = master;

    // slow pad: two detuned oscillators through lowpass
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    o1.type = "sine"; o2.type = "sine";
    o1.frequency.value = 110; // A2-ish
    o2.frequency.value = 110 * 1.01; // slight detune
    const padGain = ctx.createGain(); padGain.gain.value = 0.2;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 800;
    o1.connect(padGain); o2.connect(padGain); padGain.connect(lp); lp.connect(master);
    o1.start(); o2.start();

    // slow LFO to gently modulate pad gain (breathing)
    const lfo = ctx.createOscillator(); lfo.type = "sine"; lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.15;
    lfo.connect(lfoGain);
    lfoGain.connect(padGain.gain);
    lfo.start();

    // soft rhythmic pulse with noise burst
    const pulse = ctx.createOscillator(); pulse.type = "sine"; pulse.frequency.value = 2.0;
    const pulseGain = ctx.createGain(); pulseGain.gain.value = 0.0;
    pulse.connect(pulseGain); pulseGain.connect(master);
    pulse.start();

    // schedule gentle pulse increases
    let t = ctx.currentTime;
    const schedulePulse = () => {
      const now = ctx.currentTime;
      pulseGain.gain.cancelScheduledValues(now);
      pulseGain.gain.setValueAtTime(0, now);
      pulseGain.gain.linearRampToValueAtTime(0.14, now + 0.02);
      pulseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
      setTimeout(schedulePulse, 1200 + Math.random() * 400);
    };
    schedulePulse();

    // tiny stereo width via delay
    const delay = ctx.createDelay(2.0); delay.delayTime.value = 0.18;
    const feedback = ctx.createGain(); feedback.gain.value = 0.18;
    master.connect(delay); delay.connect(feedback); feedback.connect(master);

    // gentle fade in
    master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 2.5);

    // mark running
    runningRef.current = true;
    // store refs so stop could be implemented
  };

  return { start };
}

export default function Home() {
  const stars = createStars(60);
  const hearts = createHearts(10);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const ambient = useAmbientAudio();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // attempt to start ambient immediately (autoplay), fallback to user interaction
  useEffect(() => {
    const tryStart = async () => {
      try {
        await ambient.start();
      } catch {
        // ignore, will start on user interaction
      }
    };
    tryStart();

    const onFirst = async () => {
      try { await ambient.start(); } catch {}
      // remove handlers after first interaction
      document.removeEventListener("click", onFirst);
      document.removeEventListener("touchstart", onFirst);
    };
    document.addEventListener("click", onFirst, { once: true });
    document.addEventListener("touchstart", onFirst, { once: true });

    return () => {
      document.removeEventListener("click", onFirst);
      document.removeEventListener("touchstart", onFirst);
    };
  }, []);

  // line rotation + visibility
  useEffect(() => {
    const showDuration = index === 0 ? 3200 : 4200;
    const hideAfter = setTimeout(() => setVisible(false), showDuration);
    const nextTimer = setTimeout(() => {
      setIndex((i) => Math.min(i + 1, LINES.length - 1));
      setVisible(true);
    }, showDuration + 900);
    return () => {
      clearTimeout(hideAfter);
      clearTimeout(nextTimer);
    };
  }, [index]);

  return (
    <div className="app" ref={containerRef}>
      {/* dynamic DOM stars */}
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
            zIndex: 1
          }}
        />
      ))}

      {/* floating hearts */}
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
            zIndex: 6
          }}
        >
          ❤️
        </div>
      ))}

      {/* central content card */}
      <div className="center">
        <div className="card" role="main" aria-live="polite">
          <h1 className="title">Kofoworola 🌹 &amp; Oyindamola 🤍✨️</h1>

          <div style={{ minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 8px" }}>
            <p className={`line ${visible ? "visible" : "hidden"}`} style={{ fontSize: 18, margin: 0 }}>
              {LINES[index]}
            </p>
          </div>

          <div className="signature">— King Lowkey ⚡️</div>
        </div>
      </div>
    </div>
  );
}
