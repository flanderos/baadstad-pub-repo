// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["var(--font-poppins)", "sans-serif"],
        nav: ["var(--font-barlow)", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"],
        button: ["var(--font-montserrat)", "serif"]
      },
      colors: {
        primary: "#0A2342",
        secondary: "#1B5E20",
        grey: "#E8E8E6",
        background: "#D35400",
        beige: "#C4A484"
      }
    }
  },
  plugins: [],
};