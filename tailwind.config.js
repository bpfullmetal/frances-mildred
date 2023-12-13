/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark_green': '#15341C',
        'dark_red': '#521414',
      },
      colors: {
        'dark_green': '#15341C',
        'taupe': '#C5C1B9',
      },
      height: {
        'home_banner': 'calc(100vh - 48px)'
      },
      maxWidth: {
        'main': '1440px'
      },
      margin: {
        'our_latest_work': 'calc((100vw - 1440px) / 2)'
      }
    },
  },
  plugins: [],
}
