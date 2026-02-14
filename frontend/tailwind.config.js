/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        brand: {
          accent: "#C51F5D",
          accent2: "#DE3071",
          night: "#141D26",
          steel: "#243447",
          cream: "#E2E2D2",
        },
      },
      boxShadow: {
        glass: "0 18px 60px rgba(0,0,0,.55)",
      },
    },
  },
  plugins: [],
};
