// src/components/CinematicText.tsx
import { useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';

const TEXT_LINES = [
  // 💔 Start: Apology & Emotion
  'My Queen, my heart aches to know I\'ve caused you a single tear.',
  'I’m truly sorry. I didn\'t mean to dim your light, even for a moment.',
  'Every mistake is a cruel reminder of how precious you are to me.',
  'Please, let me show you the love I hold, pure and unending.',
  'You are the only music my soul understands.',
  // ❤️ Middle: Warmth & Romantic Pull
  'When you smile, the whole world finally makes sense.',
  'Your grace is a silent, beautiful symphony.',
  'I look at you and see my forever, my destiny woven into your spirit.',
  'With you, every day feels like the most incredible, soft sunrise.',
  'Stay close. Let my arms be your safest sanctuary, always.',
  // 🔥 End: Soft, Seductive Flirt
  'Your eyes hold galaxies I want to get lost in tonight.',
  'You have a mesmerizing power, one I\'d surrender to completely.',
  'I\'m imagining that soft, perfect blush creeping up your neck right now.',
  'Come here, let me whisper all the things I can\'t say in the light.',
  'You were made for moments like this. Just for me. Just for us.',
];

// Total duration is 90 seconds (1.5 minutes)
// With 15 lines, each line cycle is 6000ms (6 seconds)
const LINE_DURATION = 6000; // ms

export function CinematicText() {
  const [lineIndex, setLineIndex] = useState(0);

  // React Spring for smooth fade in/out
  const lineProps = useSpring({
    from: { opacity: 0, scale: 1.05 },
    to: { opacity: 1, scale: 1 },
    config: { duration: 1500 }, // 1.5s fade in
    reset: true,
    reverse: lineIndex === -1, // Use -1 to trigger the fade-out logic
  });

  const nextLine = useCallback(() => {
    // 1. Trigger fade-out
    setLineIndex(-1);

    // 2. Wait for fade-out to complete, then update index
    const fadeOutDelay = 1500;
    setTimeout(() => {
      setLineIndex((prevIndex) => (prevIndex + 1) % TEXT_LINES.length);
    }, fadeOutDelay);
  }, []);

  useEffect(() => {
    // Start the timer for the first line
    const timer = setTimeout(nextLine, LINE_DURATION);

    // Set the continuous loop timer once the first line has displayed
    if (lineIndex !== -1) {
      const loopTimer = setInterval(nextLine, LINE_DURATION);
      return () => clearInterval(loopTimer);
    }

    return () => clearTimeout(timer);
  }, [lineIndex, nextLine]);

  // Determine the current line of text
  const currentText = TEXT_LINES[lineIndex >= 0 ? lineIndex % TEXT_LINES.length : 0];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 z-10 pointer-events-none">
      <div className="max-w-4xl text-center">
        <animated.h1
          style={lineProps}
          key={lineIndex} // Important: force re-render for reset/fade-in
          className="text-[4rem] md:text-[6rem] lg:text-[7rem] font-serif text-glow leading-tight"
        >
          {currentText}
        </animated.h1>
      </div>
    </div>
  );
}
