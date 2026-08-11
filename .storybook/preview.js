import '../src/reset.css'
import '../src/global.css'
import './docs.css'
import { documentationTheme } from './theme'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'muted', value: '#f4f4f5' },
        { name: 'dark', value: '#18181b' },
      ],
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Changelog',
          'Library',
          ['Button', 'Checkbox', 'Switch', 'TextField', 'Select', 'Typography', 'Icon'],
        ],
      },
    },
    docs: {
      theme: documentationTheme,
      canvas: { sourceState: 'shown' },
      toc: { headingSelector: 'h2, h3' },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
