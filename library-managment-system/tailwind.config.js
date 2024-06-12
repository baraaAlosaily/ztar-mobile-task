/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
        boxShadow:{
          lmsShadow_orange:"0px 4px 4px 0px rgba(122, 125, 129, 0.04), 0px 7px 16px 0px rgba(122, 125, 129, 0.12), 0px 5px 12px 0px rgba(3, 75, 127, 0.04)",
          lmsShadow_white:"0px 4px 4px 0px rgba(0, 0, 0, 0.10)"
        },
        colors:{
          lmsRose100:"#FEF7FF",
          lmsRose200:"#F3EDF7",
          lmsRose700:"#EF6082",
          // orange color
          lmsOrange100:"#FFF3E0",
          lmsOrange700:"#FC3838",
          // black color
          lmsBlack100:"#49454F",
          lmsBlack200:"#000000",
          lmsBlack300:"#1D1B20",
          lmsBlack700:"#262626",
          // white color
          lmsWhite100:"#FFF",
          lmsWhite200:"#D9D9D9",
          lmsWhite700:"#F9F9F9"
        },
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
          lato: ['Lato', 'sans-serif'],
        },
        screens: {
          'xs': '375px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1440px',
          '2xl': '1920px',
        },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

