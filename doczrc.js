const fontFamily = "Roboto, Helvetica, 'Helvetica Neue', Arial, 'sans-serif'";

// theme imports don't seem to work, so instead we hardcode the colors :(
const lightTheme = {
  'primary-palette-background-color': '#FAFAFA',
  'primary-palette-border-color': '#D1D1D6',
  'primary-palette-text-color': '#3A3A40',
  'primary-palette-quiet-color': '#808086',
  'primary-palette-quieter-color': '#A3A3A9',
  'primary-palette-quietest-color': '#C6C6CC',
  'color-accent': '#0060ce',
  'secondary-palette-background-color': '#F4F4F5',
  'secondary-palette-border-color': '#C6C6CC',
  'secondary-palette-text-color': '#29292F',
  'secondary-palette-quiet-color': '#808086',
  'secondary-palette-quieter-color': '#A3A3A9',
  'secondary-palette-quietest-color': '#C6C6CC',
};

const darkTheme = {
  'primary-palette-background-color': '#17171D',
  'primary-palette-border-color': '#3D3F49',
  'primary-palette-text-color': '#D6D7D9',
  'primary-palette-quiet-color': '#8F9096',
  'primary-palette-quieter-color': '#6B6C75',
  'primary-palette-quietest-color': '#474954',
  'color-accent': '#00aaff',
  'secondary-palette-background-color': '#212128',
  'secondary-palette-border-color': '#474954',
  'secondary-palette-text-color': '#E8E9EA',
  'secondary-palette-quiet-color': '#8F9096',
  'secondary-palette-quieter-color': '#6B6C75',
  'secondary-palette-quietest-color': '#474954',
};

export default {
  title: 'Phork/it',
  description: `A React UI kit.`,
  repository: 'https://github.com/phork/phorkit',
  typescript: true,
  host: 'localhost',
  port: 4000,
  debug: false,
  base: '/',
  src: './src',
  dest: './build/docz',
  public: './public',
  files: process.env.DOCZ_FILES || '**/docs/*.mdx',
  ignore: ['**/stories/*', '**/*.stories.tsx', '**/*.stories.mdx', '**/*.docs.mdx'],
  editBranch: 'main',
  menu: [
    'Introduction',
    'Colors',
    'Icons',
    'Playground',
    'Buttons',
    'Display',
    'Feedback',
    'Forms',
    'Navigation',
    'Surfaces',
    'Utilities',
  ],
  themeConfig: {
    showDarkModeSwitch: false,
    showPlaygroundEditor: false,

    colors: {
      primary: lightTheme['color-accent'],
      text: lightTheme['primary-palette-text-color'],
      muted: lightTheme['primary-palette-quiet-color'],
      link: lightTheme['color-accent'],
      background: lightTheme['primary-palette-background-color'],
      border: lightTheme['primary-palette-border-color'],
      blockquote: {
        bg: lightTheme['secondary-palette-background-color'],
        border: lightTheme['secondary-palette-border-color'],
        color: lightTheme['secondary-palette-text-color'],
      },
      sidebar: {
        bg: lightTheme['primary-palette-background-color'],
        navGroup: lightTheme['primary-palette-quiet-color'],
        navLink: lightTheme['primary-palette-quiet-color'],
        tocLink: lightTheme['primary-palette-quieter-color'],
        tocLinkActive: lightTheme['primary-palette-quietest-color'],
      },
      header: {
        bg: lightTheme['secondary-palette-background-color'],
        border: lightTheme['secondary-palette-border-color'],
        text: lightTheme['secondary-palette-quiet-color'],
      },
      playground: {
        bg: lightTheme['secondary-palette-background-color'],
        border: lightTheme['secondary-palette-border-color'],
      },
      props: {
        bg: lightTheme['secondary-palette-background-color'],
        text: lightTheme['secondary-palette-quiet-color'],
        highlight: lightTheme['color-accent'],
        defaultValue: lightTheme['secondary-palette-quiet-color'],
        descriptionText: lightTheme['secondary-palette-quiet-color'],
        descriptionBg: 'transparent',
      },
      prism: {
        plain: {
          backgroundColor: lightTheme['secondary-palette-background-color'],
        },
      },

      modes: {
        dark: {
          primary: darkTheme['color-accent'],
          text: darkTheme['primary-palette-text-color'],
          muted: darkTheme['primary-palette-quiet-color'],
          link: darkTheme['color-accent'],
          background: darkTheme['primary-palette-background-color'],
          border: darkTheme['primary-palette-border-color'],
          blockquote: {
            bg: darkTheme['secondary-palette-background-color'],
            border: darkTheme['secondary-palette-border-color'],
            color: darkTheme['secondary-palette-text-color'],
          },
          sidebar: {
            bg: darkTheme['secondary-palette-background-color'],
            navGroup: darkTheme['secondary-palette-quiet-color'],
            navLink: darkTheme['secondary-palette-quiet-color'],
            tocLink: darkTheme['secondary-palette-quieter-color'],
            tocLinkActive: darkTheme['secondary-palette-quietest-color'],
          },
          header: {
            bg: darkTheme['secondary-palette-background-color'],
            border: darkTheme['secondary-palette-border-color'],
            text: darkTheme['secondary-palette-quiet-color'],
          },
          playground: {
            bg: darkTheme['secondary-palette-background-color'],
            border: darkTheme['secondary-palette-border-color'],
          },
          props: {
            bg: darkTheme['secondary-palette-background-color'],
            text: darkTheme['secondary-palette-quiet-color'],
            highdark: darkTheme['color-accent'],
            defaultValue: darkTheme['secondary-palette-quiet-color'],
            descriptionText: darkTheme['secondary-palette-quiet-color'],
            descriptionBg: 'transparent',
          },
          prism: {
            plain: {
              backgroundColor: darkTheme['secondary-palette-background-color'],
            },
          },
        },
      },
    },
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
