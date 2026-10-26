module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        }
      },
      boxShadow: {
        premium: '0 20px 60px rgba(76, 29, 149, 0.18)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(139, 92, 246, 0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.14), transparent 35%)'
      }
    },
  },
  plugins: [],
};
