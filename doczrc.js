const fontFamily = "Roboto, Helvetica, 'Helvetica Neue', Arial, 'sans-serif'";

export default {
  title: 'Phork/it',
  description: `A component library.`,
  repository: 'https://github.com/phork/phorkit',
  typescript: true,
  host: 'localhost',
  port: 4000,
  debug: false,
  base: '/',
  src: './src',
  public: './public',
  menu: [
    'Introduction',
    'Colors',
    'Icons',
    'Playground',
    'Display',
    'Feedback',
    'Forms',
    'Input',
    'Navigation',
    'Surfaces',
    'Utilities',
  ],
  themeConfig: {
    showDarkModeSwitch: false,
    showPlaygroundEditor: false,
    fonts: {
      body: fontFamily,
      heading: fontFamily,
    },
    fontWeights: {
      body: 400,
      heading: 400,
      bold: 500,
    },
    styles: {
      root: {
        fontSize: 2,
        fontFamily,
        lineHeight: 'normal',
      },
      container: {
        fontSize: 2,
      },
      h1: {
        fontSize: 6,
        fontWeight: 100,
      },
      h2: {
        fontSize: 4,
        fontWeight: 400,
      },
      h3: {
        fontSize: 3,
        fontWeight: 400,
      },
      h4: {
        fontSize: 2,
      },
      h5: {
        fontSize: 2,
      },
      h6: {
        fontSize: 2,
      },
      code: {
        fontSize: 2,
      },
      pre: {
        fontSize: 2,
      },
      table: {
        fontSize: 2,
      },
    },
  },
};
