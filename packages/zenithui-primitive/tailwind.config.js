/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      keyframes: {
        "zenithui-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "zenithui-fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "zenithui-zoom-in": {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" },
        },
        "zenithui-zoom-out": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(0.95)" },
        },
        "zenithui-slide-in-from-bottom": {
          from: { transform: "translateY(1rem)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "zenithui-slide-out-to-bottom": {
          from: { transform: "translateY(0)", opacity: "1" },
          to: { transform: "translateY(1rem)", opacity: "0" },
        },
        "zenithui-flip-in": {
          from: { transform: "rotateY(-90deg)", opacity: "0" },
          to: { transform: "rotateY(0)", opacity: "1" },
        },
        "zenithui-flip-out": {
          from: { transform: "rotateY(0)", opacity: "1" },
          to: { transform: "rotateY(90deg)", opacity: "0" },
        },
        "zenithui-rotate-in": {
          from: { transform: "rotate(-45deg)", opacity: "0" },
          to: { transform: "rotate(0)", opacity: "1" },
        },
        "zenithui-rotate-out": {
          from: { transform: "rotate(0)", opacity: "1" },
          to: { transform: "rotate(45deg)", opacity: "0" },
        },
        "zenithui-bounce-in": {
          "0%, 100%": { transform: "scale(0.9)", opacity: "0.8" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
        "zenithui-bounce-out": {
          "0%, 100%": { transform: "scale(1.1)", opacity: "0.8" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "zenithui-fade-in": "zenithui-fade-in 0.2s ease-out",
        "zenithui-fade-out": "zenithui-fade-out 0.2s ease-in",
        "zenithui-zoom-in": "zenithui-zoom-in 0.2s ease-out",
        "zenithui-zoom-out": "zenithui-zoom-out 0.2s ease-in",
        "zenithui-slide-in-from-bottom":
          "zenithui-slide-in-from-bottom 0.2s ease-out",
        "zenithui-slide-out-to-bottom":
          "zenithui-slide-out-to-bottom 0.2s ease-in",
        "zenithui-flip-in": "zenithui-flip-in 0.3s ease-out",
        "zenithui-flip-out": "zenithui-flip-out 0.3s ease-in",
        "zenithui-rotate-in": "zenithui-rotate-in 0.3s ease-out",
        "zenithui-rotate-out": "zenithui-rotate-out 0.3s ease-in",
        "zenithui-bounce-in": "zenithui-bounce-in 0.3s ease-out",
        "zenithui-bounce-out": "zenithui-bounce-out 0.3s ease-in",
      },
    },
  },
  plugins: [],
}
