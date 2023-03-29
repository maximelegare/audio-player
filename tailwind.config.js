/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        greenPrimaryAccent:"#2DE282",
        bluePrimaryAccent:"#0DE7DA",
        white:"#ffe3d4",
        whiteHover:"#fff0e8",
        transparentWhite:"#160A1F",
        spotifyAccent:"#3BD75F",
        hodeiAccent:"#5d1d91"
      },
      backgroundImage:(theme) => ({
        gradiantPrimary:`linear-gradient(to right, ${theme('colors.greenPrimaryAccent')}, ${theme('colors.bluePrimaryAccent')})`
      })
    },
  },
  plugins: [],
}