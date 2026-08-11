/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--ds-font-family-sans)'],
      },
      fontSize: {
        caption: ['var(--ds-font-size-caption)', { lineHeight: 'var(--ds-line-height-normal)' }],
        'body-small': ['var(--ds-font-size-body-small)', { lineHeight: 'var(--ds-line-height-relaxed)' }],
        body: ['var(--ds-font-size-body)', { lineHeight: 'var(--ds-line-height-relaxed)' }],
        'heading-6': ['var(--ds-font-size-heading-6)', { lineHeight: 'var(--ds-line-height-normal)' }],
        'heading-5': ['var(--ds-font-size-heading-5)', { lineHeight: 'var(--ds-line-height-heading)' }],
        'heading-4': ['var(--ds-font-size-heading-4)', { lineHeight: 'var(--ds-line-height-heading)' }],
        'heading-3': ['var(--ds-font-size-heading-3)', { lineHeight: 'var(--ds-line-height-heading)' }],
        'heading-2': ['var(--ds-font-size-heading-2)', { lineHeight: 'var(--ds-line-height-heading)' }],
        'heading-1': ['var(--ds-font-size-heading-1)', { lineHeight: 'var(--ds-line-height-tight)' }],
      },
      spacing: {
        'ds-1': 'var(--ds-space-1)',
        'ds-2': 'var(--ds-space-2)',
        'ds-3': 'var(--ds-space-3)',
        'ds-4': 'var(--ds-space-4)',
        'ds-5': 'var(--ds-space-5)',
        'ds-6': 'var(--ds-space-6)',
        'ds-8': 'var(--ds-space-8)',
        'ds-10': 'var(--ds-space-10)',
        'ds-12': 'var(--ds-space-12)',
        'ds-16': 'var(--ds-space-16)',
        'field-gap': 'var(--ds-space-field-gap)',
        'component-gap': 'var(--ds-space-component-gap)',
        'control-small': 'var(--ds-size-control-small)',
        'control-medium': 'var(--ds-size-control-medium)',
        'control-large': 'var(--ds-size-control-large)',
        'icon-xsmall': 'var(--ds-size-icon-xsmall)',
        'icon-small': 'var(--ds-size-icon-small)',
        'icon-medium': 'var(--ds-size-icon-medium)',
        'icon-large': 'var(--ds-size-icon-large)',
        'icon-xlarge': 'var(--ds-size-icon-xlarge)',
      },
      colors: {
        brand: {
          DEFAULT: 'var(--ds-color-brand)',
          hover: 'var(--ds-color-brand-hover)',
          subtle: 'var(--ds-color-brand-subtle)',
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
        status: {
          foreground: 'var(--ds-color-on-status)',
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
        subtle: 'var(--ds-shadow-subtle)',
        control: 'var(--ds-shadow-control)',
        card: 'var(--ds-shadow-card)',
        dropdown: 'var(--ds-shadow-dropdown)',
        tooltip: 'var(--ds-shadow-tooltip)',
        overlay: 'var(--ds-shadow-overlay)',
        dialog: 'var(--ds-shadow-dialog)',
        focus: 'var(--ds-shadow-focus)',
      },
      zIndex: {
        dropdown: 'var(--ds-z-index-dropdown)',
        overlay: 'var(--ds-z-index-overlay)',
        popover: 'var(--ds-z-index-popover)',
        tooltip: 'var(--ds-z-index-tooltip)',
        toast: 'var(--ds-z-index-toast)',
      },
      maxWidth: {
        'overlay-small': 'var(--ds-size-overlay-small)',
        'overlay-medium': 'var(--ds-size-overlay-medium)',
        'overlay-large': 'var(--ds-size-overlay-large)',
      },
    },
  },
  plugins: [],
}
