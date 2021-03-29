module.exports = {
  siteMetadata: {
    title: 'Phork/it',
    siteUrl: 'https://phorkit.phork.org',
    description: 'A component library',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-portal`,
      options: {
        key: 'portal',
        id: 'portal',
      },
    },
  ],
};
