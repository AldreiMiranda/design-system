/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--ds-color-brand)',
          hover: 'var(--ds-color-brand-hover)',
          foreground: 'var(--ds-color-on-brand)',
        },
        surface: {
          DEFAULT: 'var(--ds-color-surface)',
          muted: 'var(--ds-color-surface-muted)',
        },
        content: {
          DEFAULT: 'var(--ds-color-text)',
          muted: 'var(--ds-color-text-muted)',
          danger: 'var(--ds-color-danger)',
        },
        outline: {
          DEFAULT: 'var(--ds-color-border)',
          strong: 'var(--ds-color-border-strong)',
        },
      },
      borderRadius: {
        control: 'var(--ds-radius-control)',
      },
      boxShadow: {
        focus: '0 0 0 3px var(--ds-color-focus-ring)',
      },
    },
  },
  plugins: [],
}
