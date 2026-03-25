/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#516453", // Sage
        "secondary": "#a85d41", // Terracotta
        "tertiary": "#d4a373", // Warm Rose/Sand
        "background": "#faf9f5",
        "surface": "#ffffff",
        "surface-container": "#f4f4ef",
        "on-surface": "#30332f",
        "on-surface-variant": "#5d605b",
        "primary-container": "#d3e8d3",
        "secondary-container": "#f5e1da", // Soft Terracotta
        "tertiary-container": "#fdf3e7", // Soft Peach/Rose
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Plus Jakarta Sans", "sans-serif"],
        "label": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}

