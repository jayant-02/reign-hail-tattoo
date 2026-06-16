/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rh-black':   '#090909',
        'rh-surface': '#111111',
        'rh-card':    '#161616',
        'rh-border':  'rgba(255,255,255,0.08)',
        'rh-accent':  '#C8102E',
        'rh-accent2': '#FF1A3A',
        'rh-muted':   'rgba(255,255,255,0.45)',
        // keep legacy names
        'bento-bg':     '#090909',
        'bento-card':   '#111111',
        'bento-border': 'rgba(255,255,255,0.08)',
        'bento-accent': '#C8102E',
      },
      fontFamily: {
        'display': ['Cinzel', 'Syne', 'serif'],
        'sans-display': ['Syne', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-red':   '0 0 30px rgba(200,16,46,0.4), 0 0 60px rgba(200,16,46,0.15)',
        'glow-red-sm':'0 0 10px rgba(200,16,46,0.5)',
        'card':       '0 4px 32px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'red-gradient':  'linear-gradient(135deg, #C8102E 0%, #8B0000 100%)',
        'dark-gradient': 'linear-gradient(180deg, #090909 0%, #161616 100%)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'fade-up':      'fadeUp 0.7s ease forwards',
        'fade-in':      'fadeIn 0.5s ease forwards',
        'pulse-red':    'pulseRed 2s ease-in-out infinite',
        'counter':      'counter 2s ease-out forwards',
        'marquee':      'marquee 20s linear infinite',
        'shimmer':      'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200,16,46,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(200,16,46,0.7)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
