/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff6f7',
          100: '#ffe8eb',
          200: '#fecfd7',
          300: '#fba8ba',
          400: '#f57f9f',
          500: '#ec5f88',
          600: '#d63e6e',
          700: '#b22f59',
          800: '#922b4c',
          900: '#7d2945',
          950: '#471222'
        },
        accent: {
          50: '#fffdf8',
          100: '#fff9ef',
          200: '#fff0ce',
          300: '#ffe2a0',
          400: '#ffd26d',
          500: '#f8bc41',
          600: '#e39c22',
          700: '#ba7518',
          800: '#955c19',
          900: '#7a4b19',
          950: '#45270a'
        },
        warm: {
          50: '#faf8f6',
          100: '#f3eeea',
          200: '#e9dfd8',
          300: '#d8c8bc',
          400: '#bea692',
          500: '#a68a73',
          600: '#92705a',
          700: '#795b49',
          800: '#654c3e',
          900: '#554135'
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        accent: ['"Allura"', 'cursive']
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        card: '0 4px 30px rgba(0,0,0,0.08)',
        'card-hover': '0 10px 50px rgba(0,0,0,0.15)',
        glow: '0 0 30px rgba(236,95,136,0.25)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 700ms ease-out both',
        'fade-in': 'fade-in 800ms ease-out both',
        float: 'float 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
