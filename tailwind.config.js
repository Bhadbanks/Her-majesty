/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pink-glow': '#ff69b4', // Soft white-pink glow
      },
      fontFamily: {
        // A modern cursive font. 'Sacramento' is a good web-safe choice for this style.
        cursive: ['Sacramento', 'cursive'], 
      },
      animation: {
        pulseSubtle: 'pulseSubtle 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
