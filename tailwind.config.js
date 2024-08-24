/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      Lora:["Lora", "serif"],
      Roboto:['Roboto Condensed', "serif"]
    },
    backgroundColor:{
      primbtncolor:["#15346258"],
      primbtnhover:["#75acff38"],
      blurr:["rgba(15, 23, 42, 0.503)"]
    },

  },
  plugins: [
    
  ],
}

