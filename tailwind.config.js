/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        shareMono: ["Share Tech Mono", "sans-serif"]
      },
    },
  },
  plugins: [],
}