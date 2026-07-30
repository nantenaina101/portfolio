/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          card: "rgb(var(--ink-card) / <alpha-value>)",
          border: "rgb(var(--ink-border) / <alpha-value>)",
        },
        bone: {
          DEFAULT: "rgb(var(--bone) / <alpha-value>)",
          dim: "rgb(var(--bone-dim) / <alpha-value>)",
          faint: "rgb(var(--bone-faint) / <alpha-value>)",
        },
        acid: {
          DEFAULT: "rgb(var(--acid) / <alpha-value>)",
          dim: "rgb(var(--acid-dim) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
        slideUp: "slideUp 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
