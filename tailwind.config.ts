import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#071827',
        'ocean-blue': '#1B6CA8',
        'sea-glass-teal': '#63B7AF',
        'sand-beige': '#F5EEE3',
      },
    },
  },
  plugins: [],
};

export default config;
