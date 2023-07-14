/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cobalt-blue': {
          500: '#1e4785',
          600: '#1c3d6e',
        },
        'monza-red': {
          500: '#BC002D',
          600: '#9c0028',
        },
        'rw-blue': {
          500: '#3182ce',
          600: '#2b6cb0',
        },
      },
      keyframes: {
        'fade-out': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
      },
      animation: {
        'fade-out': 'fade-out 0.5s ease-out forwards',
      },
    },
  },
  safelist: [
    'bg-cobalt-blue-500',
    'bg-monza-red-500',
    'bg-cobalt-blue-600',
    'bg-monza-red-600',
    'text-cobalt-blue-500',
    'text-monza-red-500',
    'text-cobalt-blue-600',
    'text-monza-red-600',
    'border-cobalt-blue-500',
    'border-monza-red-500',
    'border-cobalt-blue-600',
    'border-monza-red-600',
    'hover:bg-cobalt-blue-500',
    'hover:bg-monza-red-500',
    'hover:bg-cobalt-blue-600',
    'hover:bg-monza-red-600',
    'hover:text-cobalt-blue-500',
    'hover:text-monza-red-500',
    'hover:text-cobalt-blue-600',
    'hover:text-monza-red-600',
    'hover:border-cobalt-blue-500',
    'hover:border-monza-red-500',
    'hover:border-cobalt-blue-600',
    'hover:border-monza-red-600',
  ],
  plugins: [],
}
