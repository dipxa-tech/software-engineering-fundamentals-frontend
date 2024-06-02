/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        shareTechMono: ["Share Tech Mono", "sans-serif"]
      },
      colors: {
        blueBg : "#0A142F",
        darkBg : "#001233",
        redWord :"#FF595A",
        beigeWord :"#CAC0B3",
        whiteColour: "#FFFFFF",
        blackBg: "#080808"
      }
    },
  },
  plugins: [],
}
