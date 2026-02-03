/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./gatsby-*.js"],
  theme: {
    extend: {
      colors: {
        "primary-red": "#E63946",
        "deep-dark": "#0A0A0A",
        "card-gray": "#1A1A1A",
      },
      fontFamily: {
        sans: [
          "Inter var",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
        display: ["Orbitron", "Inter var", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        "red-glow": "0 0 0 1px rgba(230, 57, 70, 0.35), 0 12px 36px rgba(230, 57, 70, 0.18)",
        "red-glow-lg":
          "0 0 0 1px rgba(230, 57, 70, 0.45), 0 18px 60px rgba(230, 57, 70, 0.25)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px circle at 20% -10%, rgba(230,57,70,0.22), transparent 60%), radial-gradient(900px circle at 90% 10%, rgba(230,57,70,0.12), transparent 55%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

