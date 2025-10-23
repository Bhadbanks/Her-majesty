import AnimatedText from '../components/AnimatedText';
import FloatingRoses from '../components/FloatingRoses';

export default function Home() {

  // Auto-Play Music Component
  // Using <audio> tag for simple auto-play functionality.
  const MusicPlayer = () => (
    <audio autoPlay loop src="/her-majesty.mp3" style={{ display: 'none' }}>
      Your browser does not support the audio element.
    </audio>
  );

  return (
    <div className="main-container">
      {/* Background Visuals */}
      <div className="stars"></div>
      <div className="moon-glow"></div>
      
      {/* 3D Roses */}
      <FloatingRoses />

      {/* Music Player (Invisible) */}
      <MusicPlayer />
      
      {/* Sequential Animated Text (The main content) */}
      <AnimatedText />

      {/* Footer */}
      <footer className="footer-text">
        — From Ayomide 🌹💫
      </footer>
    </div>
  );
}
