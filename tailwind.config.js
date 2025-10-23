// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom font for the cinematic text (matching the Google Font imported in index.tsx)
      fontFamily: {
        serif: ['Sacramento', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
