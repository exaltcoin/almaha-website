import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A",
          50: "#EEF1F6",
          100: "#D6DEE9",
          200: "#AEBED3",
          300: "#7F97B7",
          400: "#4F6A96",
          500: "#2C4570",
          600: "#1B2F52",
          700: "#14243F",
          800: "#0B1F3A",
          900: "#070F1D"
        },
        gold: {
          DEFAULT: "#C9A667",
          50: "#FBF6EC",
          100: "#F4E8CE",
          200: "#EAD2A0",
          300: "#DFBC79",
          400: "#D4AF6A",
          500: "#C9A667",
          600: "#B4863E",
          700: "#8F6A2F",
          800: "#6B4F23",
          900: "#473516"
        },
        offwhite: "#F7F7F5",
        silver: "#B9C0C7"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"]
      },
      maxWidth: {
        "8xl": "90rem"
      },
      boxShadow: {
        card: "0 2px 24px 0 rgba(11,31,58,0.08)",
        elevated: "0 8px 40px 0 rgba(11,31,58,0.14)"
      }
    }
  },
  plugins: []
};

export default config;
