/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'very-light-pink': '#C7C7C7',
      }),
      textColor: {
      },
      colors: {
        'border': '#DFDFDF',
        'separationBorder': '#484848',
        'getSection': '#1d3750',
        'postSection': '#234d30',
        'postMakeRequest': '#31724a',
        'deleteMakeRequest': '#7b1010',
      },
      fontFamily: {
        Quicksand: ['Quicksand', 'sans-serif']
      },
      height: {
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      },
      width: {
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      },
      inset: {
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      },
      gridTemplateColumns: {
        'autosm': 'repeat(auto-fill, 140px)',
        'automd': 'repeat(auto-fill, 240px)',
      },
      screens: {
        'ssm': '510px',
      }
    },
  },
  plugins: [],
}