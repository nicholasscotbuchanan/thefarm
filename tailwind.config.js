/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        soil: {
          50: "#f6f4ef",
          100: "#e9e3d6",
          200: "#d4c8ad",
          300: "#b9a67c",
          400: "#a08a58",
          500: "#8a7346",
          600: "#6f5b39",
          700: "#584730",
          800: "#493b2b",
          900: "#3f3327",
        },
        sprout: {
          50: "#f2f9ec",
          100: "#e1f1d3",
          200: "#c5e4ac",
          300: "#a0d17c",
          400: "#7cbb52",
          500: "#5c9e35",
          600: "#457d27",
          700: "#376121",
          800: "#2f4d20",
          900: "#29421f",
        },
        harvest: {
          400: "#f2b544",
          500: "#e69b1f",
          600: "#c67c15",
        },
        cream: "#faf8f2",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        serif: ["ui-serif", "Georgia", "Cambria", "serif"],
      },
    },
  },
  plugins: [],
};
