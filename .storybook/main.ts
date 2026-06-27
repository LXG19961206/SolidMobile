import type { StorybookConfig } from 'storybook-solidjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: 'storybook-solidjs-vite',
    options: {
      docgen: {
        savePropValueAsString: true,
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: (prop) =>
          prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
      },
    },
  },
};

export default config;
