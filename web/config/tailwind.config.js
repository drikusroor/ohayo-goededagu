/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cobalt-blue': '#1e4785',
        'monza-red': '#BC002D',
      },
    },
  },
  safelist: [
    'bg-cobalt-blue',
    'bg-monza-red',
    'text-cobalt-blue',
    'text-monza-red',
    'border-cobalt-blue',
    'border-monza-red',
    'hover:bg-cobalt-blue',
    'hover:bg-monza-red',
    'hover:text-cobalt-blue',
    'hover:text-monza-red',
    'hover:border-cobalt-blue',
    'hover:border-monza-red',
  ],
  plugins: [],
}
