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

    // theme imports don't seem to work, so instead we hardcode the colors :(
    colors: {
      primary: '#0060ce', // lightTheme['color-accent-primary'],
      text: '#17171D', // lightTheme['color-FG0'],
      muted: 'hsla(240, 11.5%, 10.2%, 0.4)', // lightTheme['color-FG0-O40'],
      link: '#0060ce', // lightTheme['color-accent-primary'],
      background: '#fff', // lightTheme['color-BG0'],
      border: '#D7D6D0', // lightTheme['secondary-palette-border-color'],
      blockquote: {
        bg: '#F7F7F6', // lightTheme['color-BG05'],
        border: '#D7D6D0', // lightTheme['secondary-palette-border-color'],
        color: '#474954', // lightTheme['primary-palette-quiet-color'],
      },
      sidebar: {
        bg: '#fff', // lightTheme['color-BG0'],
        navGroup: '#474954', // lightTheme['primary-palette-quiet-color'],
        navLink: '#474954', // lightTheme['primary-palette-quiet-color'],
        tocLink: '#828595', // lightTheme['primary-palette-quieter-color'],
        tocLinkActive: '#8E91A0', // lightTheme['primary-palette-quietest-color'],
      },
      header: {
        bg: '#F7F7F6', // lightTheme['color-BG05'],
        border: '#D7D6D0', // lightTheme['secondary-palette-border-color'],
        text: '#474954', // lightTheme['primary-palette-quiet-color'],
      },
      playground: {
        bg: '#F7F7F6', // lightTheme['color-BG05'],
        border: '#D7D6D0', // lightTheme['secondary-palette-border-color'],
      },
      props: {
        bg: '#F7F7F6', // lightTheme['color-BG05'],
        text: '#474954', // lightTheme['primary-palette-quiet-color'],
        highlight: '#0060ce', // lightTheme['color-accent-primary'],
        defaultValue: 'hsla(240, 11.5%, 10.2%, 0.2)', // lightTheme['color-FG0-O20'],
        descriptionText: 'hsla(240, 11.5%, 10.2%, 0.2)', // lightTheme['color-FG0-O20'],
        descriptionBg: 'transparent',
      },
      prism: {
        plain: {
          backgroundColor: '#F7F7F6', // lightTheme['color-BG05'],
        },
      },

      modes: {
        dark: {
          primary: '#00aaff', // darkTheme['color-accent-primary'],
          text: '#fff', // darkTheme['color-FG0'],
          muted: 'hsla(0, 0%, 100%, 0.4)', // darkTheme['color-FG0-O40'],
          link: '#00aaff', // darkTheme['color-accent-primary'],
          background: '#17171D', // darkTheme['color-BG0'],
          border: '#3D3F49', // darkTheme['secondary-palette-border-color'],
          blockquote: {
            bg: '#212128', // darkTheme['color-BG05'],
            border: '#3D3F49', // darkTheme['secondary-palette-border-color'],
            color: '#D7D6D0', // darkTheme['primary-palette-quiet-color'],
          },
          sidebar: {
            bg: '#17171D', // darkTheme['color-BG0'],
            navGroup: '#D7D6D0', // darkTheme['primary-palette-quiet-color'],
            navLink: '#D7D6D0', // darkTheme['primary-palette-quiet-color'],
            tocLink: '#BDBDBD', // darkTheme['primary-palette-quieter-color'],
            tocLinkActive: '#BDBDBD', // darkTheme['primary-palette-quietest-color'],
          },
          header: {
            bg: '#212128', // darkTheme['color-BG05'],
            border: '#3D3F49', // darkTheme['secondary-palette-border-color'],
            text: '#D7D6D0', // darkTheme['primary-palette-quiet-color'],
          },
          playground: {
            bg: '#212128', // darkTheme['color-BG05'],
            border: '#3D3F49', // darkTheme['secondary-palette-border-color'],
          },
          props: {
            bg: '#212128', // darkTheme['color-BG05'],
            text: '#D7D6D0', // darkTheme['primary-palette-quiet-color'],
            highlight: '#00aaff', // darkTheme['color-accent-primary'],
            defaultValue: 'hsla(0, 0%, 100%, 0.2)', // darkTheme['color-FG0-O20'],
            descriptionText: 'hsla(0, 0%, 100%, 0.2)', // darkTheme['color-FG0-O20'],
            descriptionBg: 'transparent',
          },
          prism: {
            plain: {
              backgroundColor: '#212128', // darkTheme['color-BG05'],
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
