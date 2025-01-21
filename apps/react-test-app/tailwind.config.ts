import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/pagination.js",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        "160": "40rem", // 40rem is equivalent to 160 x 0.25rem (where 1rem = 16px)
      },
      screens: {
        "3xl": "1920px",
      },
      boxShadow: {
        custom: "0px 3px 8px 0px rgb(37 99 235 / 8%)",
      },
      fontFamily: {
        sans: ["InterVariable", "Roboto", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "stripes-black":
          "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0.3) 10px, transparent 10px, transparent 20px)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        blink: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-right-bottom": {
          "0%": {
            top: "1rem",
            height: "10rem",
            width: "10rem",
            opacity: "1",
          },
          "100%": {
            top: "18rem",
            height: "5rem",
            width: "5rem",
            opacity: "0.5",
          },
        },
        "slide-right-corner": {
          "0%": {
            top: "1rem",
            left: "1rem",
            height: "10rem",
            width: "10rem",
            opacity: "1",
            transform: "rotate(0deg) scale(1)",
          },
          "50%": {
            top: "40%",
            left: "50%",
            height: "7rem",
            width: "7rem",
            opacity: "0.75",
            transform: "rotate(15deg) scale(0.8)",
          },
          "100%": {
            top: "100%",
            left: "100%", // Adjust to fit the container's dimensions
            height: "5rem",
            width: "5rem",
            opacity: "0.5",
            transform: "rotate(60deg) scale(0.5)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blink: "blink 0.2s ease-in-out",
        "slide-right-bottom": "slide-right-bottom 2s ease-in-out",
        "slide-right-corner": "slide-right-corner 2s ease-in-out",
      },
    },
    variants: {
      extend: {
        width: ["responsive"],
      },
    },
  },
  plugins: [addVariablesForColors],
}

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"))
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ":root": newVars,
  })
}

export default config
