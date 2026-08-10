import { addons } from '@storybook/manager-api';
import { documentationTheme } from './theme';

addons.setConfig({
  theme: documentationTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
  toolbar: {
    title: { hidden: true },
  },
});
