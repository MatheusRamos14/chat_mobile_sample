/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*"
  ],
  theme: {
    extend: {
      colors: {
        text_primary: '#1A1A1A',
        text_tertiary: '#666666',
        button_primary: '#3355FF',
        button_secondary: '#D0D8FF',
        border_default: '#B3B3B3',
      }
    },
  },
  plugins: [],
}
