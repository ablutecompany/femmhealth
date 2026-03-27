/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Sanctuary Light Palette ───────────────────────────────── */
        "primary":             "#b8857a",   // Dusty rose — soft, warm, feminine
        "secondary":           "#8a9e88",   // Muted sage — botanical calm
        "tertiary":            "#c4a882",   // Warm champagne/sand — gentle gold
        "accent":              "#c9a0a8",   // Soft blush — delicate highlight

        "background":          "#faf8f5",   // Warm ivory — the main sanctuary air
        "surface":             "#ffffff",   // Clean white — pure surface
        "surface-container":   "#f5f2ec",   // Warm cream — elevated from bg
        "surface-bright":      "#edeae3",   // Deeper cream — inputs, active cards

        "on-surface":          "#2c2420",   // Warm deep charcoal — readable, not harsh
        "on-surface-variant":  "#7a6c64",   // Muted warm brown — secondary text

        "primary-container":   "#f8eeec",   // Pale rose blush — tinted backgrounds
        "secondary-container": "#eef4ed",   // Pale sage — botanical tint
        "tertiary-container":  "#faf3e8",   // Pale champagne — warm tint
        "outline":             "#d4cec8",   // Soft warm taupe — borders
        "outline-variant":     "#ece8e4",   // Very faint warm — hairlines
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
        "glow-primary":   "0 0 32px rgba(184, 133, 122, 0.20)",
        "glow-secondary": "0 0 32px rgba(138, 158, 136, 0.15)",
        "glow-accent":    "0 0 40px rgba(201, 160, 168, 0.14)",
        "card":           "0 2px 16px rgba(44, 36, 32, 0.07)",
        "card-hover":     "0 8px 32px rgba(44, 36, 32, 0.11)",
        "nav":            "0 -2px 24px rgba(44, 36, 32, 0.08), 0 2px 12px rgba(44, 36, 32, 0.05)",
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
