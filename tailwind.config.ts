import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0B0B0B',
        accent: '#00C853',
        panel: '#121212',
        muted: '#8B8B8B',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,200,83,0.2), 0 20px 60px rgba(0,200,83,0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;
