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
        myBlue: "#073B3A",
        myPink: "#47003c",
      },
      backgroundImage: (theme) => ({
        pattern: "url('/src/assets/backgroundBlack.jpg')",
      }),
    },
  },
  plugins: [],
};
