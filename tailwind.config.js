/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary":             "#d4a574",   // Champagne gold
        "secondary":           "#b87868",   // Dusty terracotta
        "tertiary":            "#8aab88",   // Sage
        "accent":              "#c9899a",   // Dusty rose
        "background":          "#0d0b09",   // Near-black warm
        "surface":             "#161210",   // Dark warm surface
        "surface-container":   "#1f1a15",   // Card background
        "surface-bright":      "#2a231c",   // Input / elevated card
        "on-surface":          "#f0e8de",   // Warm cream text
        "on-surface-variant":  "#a89880",   // Muted warm text
        "primary-container":   "#2a1e12",   // Dark amber container
        "secondary-container": "#261411",   // Dark terracotta container
        "tertiary-container":  "#121b12",   // Dark sage container
        "outline":             "#3a3028",   // Subtle borders
        "outline-variant":     "#251f18",   // Faint border
      },
      fontFamily: {
        "display":  ["Cormorant Garamond", "Georgia", "serif"],
        "headline": ["Manrope", "sans-serif"],
        "body":     ["Plus Jakarta Sans", "sans-serif"],
        "label":    ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg":   "1.5rem",
        "xl":   "2rem",
        "2xl":  "2.5rem",
        "3xl":  "3rem",
        "full": "9999px",
      },
      boxShadow: {
        "glow-primary":   "0 0 40px rgba(212, 165, 116, 0.15)",
        "glow-secondary": "0 0 40px rgba(184, 120, 104, 0.12)",
        "glow-accent":    "0 0 60px rgba(201, 137, 154, 0.10)",
        "card":           "0 4px 24px rgba(0,0,0,0.35)",
        "card-hover":     "0 12px 40px rgba(0,0,0,0.5)",
        "nav":            "0 -4px 40px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float":      "float 6s ease-in-out infinite",
        "shimmer":    "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%":      { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
}
