/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        ko: ['"Pretendard"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#faf8f4',
          100: '#f2ede3',
          200: '#e4dccb',
          300: '#c9bda4',
          400: '#a89878',
          500: '#867558',
          600: '#695a44',
          700: '#4f4334',
          800: '#332c22',
          900: '#1a1612',
        },
        accent: {
          coral: '#e76f51',
          sage: '#7a9e7e',
          ochre: '#d4a373',
          plum: '#7a5980',
          sky: '#5b8aa4',
          rose: '#c47b8a',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
