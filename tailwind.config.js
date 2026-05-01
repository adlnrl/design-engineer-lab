/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mist:   '#F8F6F5',
        paper:  '#FDFBF7',
        sky:    '#CDEBF1',
        sage:   '#DEF1D0',
        lilac:  '#CBCEEA',
        blush:  '#F8E5E5',
        ink:    '#5D5D5A',
        inkDeep:'#2E2E2C',
        line:   '#E8E4DD'
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        sans:  ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:  ['"Google Sans Code"', '"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        soft: '0 1px 2px rgba(50,46,40,0.04), 0 8px 24px -12px rgba(50,46,40,0.08)',
        ring: '0 0 0 1px rgba(50,46,40,0.06)'
      },
      borderRadius: {
        xl2: '22px'
      },
      backgroundImage: {
        grid: 'linear-gradient(#EEE8DE 1px, transparent 1px), linear-gradient(90deg, #EEE8DE 1px, transparent 1px)'
      },
      backgroundSize: {
        grid: '28px 28px'
      }
    }
  },
  plugins: []
}
