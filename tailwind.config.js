/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Asta Sans"',
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          '"Apple SD Gothic Neo"',
          "sans-serif",
        ],
      },
      colors: {
        grey: {
          50: "#F9FAFB",
          100: "#F2F4F6",
          200: "#E5E8EB",
          300: "#D1D6DB",
          400: "#B0B8C1",
          500: "#8B95A1",
          600: "#6B7684",
          700: "#4E5968",
          800: "#333D4B",
          900: "#191F28",
        },
        toss: {
          50: "#E8F3FF",
          100: "#C9E2FF",
          200: "#94C5FD",
          300: "#5A9CF8",
          400: "#3182F6",
          500: "#1B64DA",
          600: "#1452CC",
        },
        positive: "#1B64DA",
        negative: "#F04452",
        warning: "#FF9500",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
      },
      // 토스 표준 라운드 — 카드 14px, 큰 카드 20px
      borderRadius: {
        DEFAULT: "8px",
        sm: "6px",
        md: "10px",
        lg: "12px",
        xl: "14px",
        "2xl": "16px",
        "3xl": "20px", // 큰 카드는 이 값 사용
        "4xl": "24px",
      },
      animation: {
        "fade-up": "fadeUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fadeIn 0.2s ease-out",
        "scale-in": "scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
