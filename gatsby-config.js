require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: 'Phork/it',
    siteUrl: process.env.DOCZ_URL || 'https://docz.phorkit.org',
    description: 'A React UI kit',
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
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
