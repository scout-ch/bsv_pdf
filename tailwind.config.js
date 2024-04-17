/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#521d3a",
        secondary: "#fdfdf3",
      },
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
