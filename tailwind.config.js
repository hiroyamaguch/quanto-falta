/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto-slab)',
      },
      colors: {
        input: {
          600: '#232129',
        },
        gray: {
          100: '#EAEAEB',
          200: '#D6D5D7',
          300: '#ADABAF',
          400: '#999591', // Gray
          500: '#666360', // Gray Hard
          600: '#312E38', // Background
          700: '#27252D',
          800: '#1D1C22',
          900: '#28262E', // Black Medium
          1000: '#0A090B',
        },
        orange: {
          100: '#FFF4E6',
          200: '#FFE9CC',
          300: '#FFD399',
          400: '#FFBC66',
          500: '#FFA633',
          600: '#FF9000',
          700: '#CC7300',
          800: '#995600',
          900: '#663A00',
          1000: '#331D00',
        },
        white: {
          100: '#FEFDFD',
          200: '#FDFBFA',
          300: '#FBF8F6',
          400: '#F8F4F1',
          500: '#F6F1ED',
          600: '#F4EDE8',
          700: '#C3BEBA',
          800: '#928E8B',
          900: '#3E3B47', // Shape
          1000: '#312F2E',
        },
      },
    },
  },
  plugins: [],
}
