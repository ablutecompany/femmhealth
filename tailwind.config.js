/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Sanctuary Refined Light Palette ─────────────────────────
           Direction: warm ivory, dusty rose, muted sage, champagne.
           Corrected for:  better contrast · premium finish · clear hierarchy
        ──────────────────────────────────────────────────────────── */
        "primary":             "#9a6860",   // Deeper dusty rose — clear button contrast
        "secondary":           "#728e70",   // Sage — calmer, slightly richer
        "tertiary":            "#b09470",   // Champagne — warm gold, readable
        "accent":              "#b88898",   // Soft blush

        "background":          "#faf8f5",   // Warm ivory — the sanctuary air
        "surface":             "#ffffff",   // Clean white — pure card surface
        "surface-container":   "#f5f1eb",   // Warm cream — elevated panels
        "surface-bright":      "#ece7dd",   // Deeper warm taupe — inputs / active

        "on-surface":          "#3c3028",   // Warm readable brown — titles (not charcoal)
        "on-surface-variant":  "#7c6e66",   // Medium warm rose-brown — secondary text

        "primary-container":   "#f0e2de",   // Pale rose blush
        "secondary-container": "#e6efe5",   // Pale sage
        "tertiary-container":  "#f7eddb",   // Pale champagne

        "outline":             "#c8c0b6",   // Warm taupe — visible card borders
        "outline-variant":     "#e5e0d8",   // Hairline borders
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
        /* Warm-tinted subtle shadows for premium light-mode depth */
        "glow-primary":   "0 0 28px rgba(154, 104, 96, 0.22)",
        "glow-secondary": "0 0 28px rgba(114, 142, 112, 0.16)",
        "glow-accent":    "0 0 36px rgba(184, 136, 152, 0.15)",
        "card":           "0 2px 16px rgba(100, 60, 40, 0.08), 0 1px 4px rgba(100, 60, 40, 0.04)",
        "card-hover":     "0 8px 32px rgba(100, 60, 40, 0.13), 0 2px 8px rgba(100, 60, 40, 0.05)",
        "card-elevated":  "0 4px 24px rgba(100, 60, 40, 0.10), 0 1px 6px rgba(100, 60, 40, 0.05)",
        "nav":            "0 -1px 20px rgba(100, 60, 40, 0.07), 0 2px 10px rgba(100, 60, 40, 0.04)",
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
