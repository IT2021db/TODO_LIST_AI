/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    // Breakpointy – mobile first
    screens: {
      xs: "360px",   // małe telefony
      sm: "640px",   // telefony
      md: "768px",   // tablety
      lg: "1024px",  // laptopy
      xl: "1280px",  // duże ekrany
    },

    extend: {
      colors: {
        // Główne kolory aplikacji
        primary: "#008080",     // górny pasek (teal)
        primaryDark: "#006666",

        success: "#228c22",     // zielony checkbox
        danger: "#c41e3a",      // czerwony kosz

        background: "#f2f2f2",  // tło strony
        card: "#ffffff",        // karty / sekcje

        textMain: "#000000",
        textMuted: "#6b7280",   // szary tekst
        borderLight: "#e5e7eb",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.05)",
      },

      borderRadius: {
        md: "6px",
        lg: "10px",
      },

      spacing: {
        section: "1.5rem", // odstępy między blokami
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
}