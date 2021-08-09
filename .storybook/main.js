module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-postcss',
    'storybook-dark-mode',
  ],
  webpackFinal: async config => {
    // Remove the existing css rule(s)
    config.module.rules = config.module.rules.filter(f => f.test?.toString() !== '/\\.css$/');

    config.module.rules.push(
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
                localIdentName: '[contenthash:base64]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    );

    return config;
  },
};
