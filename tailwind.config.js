/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    extend: {
      colors: {
        customGreen: "#073B3A",
        eggPlant: "#47003c",
        customBlack: "#282828",
        customBlackHover: "#3c3c3c",
        richBlack: "#021211",
        darkGreen: "#052929",
      },
      backgroundImage: (theme) => ({
        pattern: "url('/src/assets/backgroundBlack.webp')",
      }),
    },
  },
  plugins: [],
};
