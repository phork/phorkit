module.exports = {
  siteMetadata: {
    title: 'Phork/it',
    siteUrl: 'https://phorkit.phork.org',
    description: 'A component library',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        cssLoaderOptions: {
          camelCase: false,
          modules: {
            auto: resourcePath => resourcePath.endsWith('.module.css'),
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-portal',
      options: {
        key: 'portal',
        id: 'portal',
      },
    },
  ],
};
