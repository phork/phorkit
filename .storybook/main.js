const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const jestResults = require('../.jest-test-results.json');

const hasJestResults = Object.keys(jestResults).length > 0;

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-postcss',
    '@storybook/addon-a11y',
    hasJestResults && '@storybook/addon-jest',
    './addons/accentColors/register',
    './addons/theme/register',
  ].filter(Boolean),
  typescript: async config => {
    return {
      ...config,
      reactDocgenTypescriptOptions: {
        ...config.reactDocgenTypescriptOptions,
        propFilter(prop) {
          if (['ref', 'translations'].includes(prop.name)) {
            return false;
          }

          if (config.reactDocgenTypescriptOptions.propFilter) {
            return config.reactDocgenTypescriptOptions.propFilter(prop);
          }

          return true;
        },
      },
    };
  },
  webpackFinal: async (config, { configType }) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter(f => f.test?.toString() !== '/\\.css$/'),
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              {
                loader: 'style-loader',
                options: { injectType: 'singletonStyleTag' },
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
              },
            ],
          },
          {
            test: /\.module\.css$/,
            use: [
              {
                loader: 'style-loader',
                options: { injectType: 'singletonStyleTag' },
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName:
                      configType === 'DEVELOPMENT' ? '[local]__[contenthash:base64:5]' : '[contenthash:base64]',
                  },
                },
              },
              {
                loader: 'postcss-loader',
              },
            ],
          },
        ],
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@emotion/core': path.dirname(require.resolve('@emotion/react/package.json')),
          '@emotion/styled': path.dirname(require.resolve('@emotion/styled/package.json')),
          'emotion-theming': path.dirname(require.resolve('@emotion/react/package.json')),
        },
        plugins: [
          ...config.resolve?.plugins,
          new TsconfigPathsPlugin({
            configFile: path.resolve(__dirname, '../tsconfig.json'),
          }),
        ],
      },
    };
  },
};
