/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "zoom-in": {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" },
        },
        "zoom-out": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(0.95)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(1rem)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-out-to-bottom": {
          from: { transform: "translateY(0)", opacity: "1" },
          to: { transform: "translateY(1rem)", opacity: "0" },
        },
        "flip-in": {
          from: { transform: "rotateY(-90deg)", opacity: "0" },
          to: { transform: "rotateY(0)", opacity: "1" },
        },
        "flip-out": {
          from: { transform: "rotateY(0)", opacity: "1" },
          to: { transform: "rotateY(90deg)", opacity: "0" },
        },
        "rotate-in": {
          from: { transform: "rotate(-45deg)", opacity: "0" },
          to: { transform: "rotate(0)", opacity: "1" },
        },
        "rotate-out": {
          from: { transform: "rotate(0)", opacity: "1" },
          to: { transform: "rotate(45deg)", opacity: "0" },
        },
        "bounce-in": {
          "0%, 100%": { transform: "scale(0.9)", opacity: "0.8" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-out": {
          "0%, 100%": { transform: "scale(1.1)", opacity: "0.8" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.9)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.9)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-in",
        "zoom-in": "zoom-in 0.2s ease-out",
        "zoom-out": "zoom-out 0.2s ease-in",
        "slide-in-from-bottom": "slide-in-from-bottom 0.2s ease-out",
        "slide-out-to-bottom": "slide-out-to-bottom 0.2s ease-in",
        "flip-in": "flip-in 0.3s ease-out",
        "flip-out": "flip-out 0.3s ease-in",
        "rotate-in": "rotate-in 0.3s ease-out",
        "rotate-out": "rotate-out 0.3s ease-in",
        "bounce-in": "bounce-in 0.3s ease-out",
        "bounce-out": "bounce-out 0.3s ease-in",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-in",
      },
    },
  },
  plugins: [],
}
