module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "blow-out": {
          "0%": { width: "0px", height: "0px" },
          "100%": { width: "auto", height: "auto" },
        },
      },
      animation: {
        "blow-out": "blow-out 0.3s ease-out",
      },
    },
  },
  plugins: [],
}
