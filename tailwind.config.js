/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#ff9900",
      },

      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
    container: {
      padding: {
        md: "5rem",
      },
    },
  },
  plugins: [],
};
