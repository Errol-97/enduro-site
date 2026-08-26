/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        // Exact values from Enduro_Style Guide.pdf — do not alter.
        ink: {
          DEFAULT: '#272A6A', // RGB 39 42 106 · CMYK 100 94 27 12
          50: '#F4F5F9',
          100: '#E6E7F0',
          200: '#C8CADD',
          300: '#6B6E8E', // WCAG AA on white (4.95) and on ink-50 (4.54)
          400: '#5A5D80', // WCAG AA on white (6.34) and on ink-50 (5.82)
          500: '#454A85',
          600: '#272A6A',
          700: '#212458',
          800: '#1A1C45',
          900: '#131533',
        },
        accent: {
          DEFAULT: '#5A5180', // RGB 90 81 128 · CMYK 74 71 25 9
          100: '#EDEBF3',
          200: '#D5D1E2',
          300: '#716890', // WCAG AA on white (5.14) and on ink-50 (4.72)
          400: '#6A6086', // WCAG AA on white (5.78) and on ink-50 (5.31)
          500: '#5A5180',
          600: '#4A436A',
        },
        neutral: {
          DEFAULT: '#2B2B2B', // from the logo artwork
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'enduro-gradient': 'linear-gradient(135deg, #272A6A 0%, #5A5180 100%)',
        'enduro-gradient-soft': 'linear-gradient(135deg, #F4F5F9 0%, #EDEBF3 100%)',
      },
      letterSpacing: {
        wordmark: '0.22em',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};
