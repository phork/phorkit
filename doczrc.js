const fontFamily = "Roboto, Helvetica, 'Helvetica Neue', Arial, 'sans-serif'";

// theme imports don't seem to work, so instead we hardcode the colors :(
const lightTheme = {
  'primary-palette-background-color': '#FAFAFA',
  'primary-palette-border-color': '#D1D1D6',
  'primary-palette-text-color': '#2A2B33',
  'primary-palette-quiet-color': 'hsla(233.29999999999995, 9.7%, 18.2%, 0.6)',
  'primary-palette-quieter-color': 'hsla(233.29999999999995, 9.7%, 18.2%, 0.4)',
  'primary-palette-quietest-color': 'hsla(233.29999999999995, 9.7%, 18.2%, 0.2)',
  'primary-palette-accent-color': '#0060ce',
  'secondary-palette-background-color': '#F4F4F5',
  'secondary-palette-border-color': '#C6C6CC',
  'secondary-palette-text-color': '#34353E',
  'secondary-palette-quiet-color': 'hsla(234, 8.8%, 22.4%, 0.6)',
  'secondary-palette-quieter-color': 'hsla(234, 8.8%, 22.4%, 0.4)',
  'secondary-palette-quietest-color': 'hsla(234, 8.8%, 22.4%, 0.2)',
};

const darkTheme = {
  'primary-palette-background-color': '#17171D',
  'primary-palette-border-color': '#3D3F49',
  'primary-palette-text-color': '#FAFAFA',
  'primary-palette-quiet-color': 'hsla(0, 0%, 98%, 0.4)',
  'primary-palette-quieter-color': 'hsla(0, 0%, 98%, 0.3)',
  'primary-palette-quietest-color': 'hsla(0, 0%, 98%, 0.2)',
  'primary-palette-accent-color': '#00aaff',
  'secondary-palette-background-color': '#212128',
  'secondary-palette-border-color': '#474954',
  'secondary-palette-text-color': '#FAFAFA',
  'secondary-palette-quiet-color': 'hsla(0, 0%, 98%, 0.5)',
  'secondary-palette-quieter-color': 'hsla(0, 0%, 98%, 0.4)',
  'secondary-palette-quietest-color': 'hsla(0, 0%, 98%, 0.3)',
};

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

    // theme imports don't seem to work, so instead we hardcode the colors :(
    colors: {
      primary: lightTheme['primary-palette-accent-color'],
      text: lightTheme['primary-palette-text-color'],
      muted: lightTheme['primary-palette-quiet-color'],
      link: lightTheme['primary-palette-accent-color'],
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
        highlight: lightTheme['color-accent-primary'],
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
          primary: darkTheme['primary-palette-accent-color'],
          text: darkTheme['primary-palette-text-color'],
          muted: darkTheme['primary-palette-quiet-color'],
          link: darkTheme['primary-palette-accent-color'],
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
            highdark: darkTheme['color-accent-primary'],
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
