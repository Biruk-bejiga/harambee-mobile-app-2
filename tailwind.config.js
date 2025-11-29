/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#60A5FA',
          dark: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#F3F4F6',
          light: '#F9FAFB',
          dark: '#E5E7EB',
        },
        accent: {
          gold: '#D4AF37',
          red: '#EF4444',
          green: '#10B981',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          light: '#9CA3AF',
        }
      },
      fontFamily: {
        regular: ['System'],
        medium: ['System'],
        semibold: ['System'],
        bold: ['System'],
      },
    },
  },
  plugins: [],
}
