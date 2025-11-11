import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '72rem', // ≈ max-w-5xl (64rem) + comfortable expansion
      },
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
