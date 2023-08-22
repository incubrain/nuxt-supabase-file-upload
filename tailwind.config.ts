import type { Config } from 'tailwindcss'
import c from 'tailwindcss/colors'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    fontSize: {
      'xs': '0.625rem',
      'sm': '0.85rem',
      'base': '1rem',
      'xl': '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '4.052rem',
    },
    extend: {
      screens: {
        '2xl': '1536px',
      },
      colors: {
        primary: c.cyan,
        secondary: c.indigo,
        error: c.red,
        success: c.green,
        warning: c.yellow,
        info: c.cyan,
      },
    },
  },
  plugins: [],
}
