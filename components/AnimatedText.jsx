'use client';

import { useState, useEffect } from 'react';

// Emotional flow and timing (in milliseconds)
const CINEMATIC_LINES = [
    // 💔 Start: Heartfelt apology & emotion (3 lines)
    { text: "My Queen, the silence between us has been the heaviest weight.", duration: 5000 },
    { text: "My heart aches knowing I caused you pain; I am truly sorry.", duration: 5500 },
    { text: "I look at the stars, and all I see is the light you bring to my darkness.", duration: 6000 },
    
    // ❤️ Middle: Builds warmth & romantic pull (4 lines)
    { text: "You are the warmth of the sun and the mystery of the moon, all wrapped into one perfect soul.", duration: 6500 },
    { text: "Every dream I chase, every goal I reach, means nothing without your hand in mine.", duration: 6500 },
    { text: "I promise you my absolute best—unconditional love, respect, and eternal devotion.", duration: 7000 },
    { text: "Come home to my heart; let me show you the magnitude of my love.", duration: 6500 },
    
    // 🔥 End: Soft, seductive lines (3 lines)
    { text: "The stars fade to silence when you walk into the room...", duration: 5500 },
    { text: "And tonight, I want to watch you blush under the soft glow of the moonlight.", duration: 6000 },
    { text: "Ready to be swept away, my beautiful, captivating Queen? I know I am.", duration: 7000, final: true },
];

export default function AnimatedText() {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (currentLineIndex >= CINEMATIC_LINES.length) return; // Stop when done

        const line = CINEMATIC_LINES[currentLineIndex];
        
        // 1. Fade In
        setIsVisible(true);

        // 2. Hold for duration
        const holdTimeout = setTimeout(() => {
            // 3. Fade Out
            setIsVisible(false);
            
            // 4. Move to next line after fade-out transition (1000ms CSS transition)
            const nextLineTimeout = setTimeout(() => {
                setCurrentLineIndex(prevIndex => prevIndex + 1);
            }, 1000); 

            return () => clearTimeout(nextLineTimeout);
        }, line.duration);

        return () => clearTimeout(holdTimeout);

    }, [currentLineIndex]);

    const currentLine = CINEMATIC_LINES[currentLineIndex];

    return (
        <h1 
            className="cinematic-text" 
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            {currentLine ? currentLine.text : null}
        </h1>
    );
}
