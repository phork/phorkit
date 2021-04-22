const color = require('./utils/color');

// foreground and background colors, generally
const neutralColors = {
  'color-FG0': '#FAFAFA',
  'color-FG05': '#F4F4F5',
  'color-FG10': '#E8E8EB',
  'color-FG20': '#DDDDE0',
  'color-FG30': '#D1D1D6',
  'color-FG40': '#C6C6CC',

  'color-BG0': '#17171D',
  'color-BG05': '#212128',
  'color-BG10': '#2A2B33',
  'color-BG20': '#34353E',
  'color-BG30': '#3D3F49',
  'color-BG40': '#474954',
};

const primaryColors = {
  'color-P05': '#c5106b',
  'color-P10': '#f41150',
  'color-P15': '#ff3232',
  'color-P20': '#ff6020',
  'color-P25': '#ff8e0d',
  'color-P30': '#fdb70b',
  'color-P35': '#fbdf09',
  'color-P40': '#7ece19',
  'color-P45': '#00aaff',
  'color-P50': '#0e75ff',
  'color-P55': '#1b3fff',
  'color-P60': '#5330c5',
  'color-P65': '#8b218b',
};

// this spans the color range between color-FG40 and color-BG40
const primaryZeroColors = {
  'color-P0-L40': '#C6C6CC',
  'color-P0-L30': '#B6B6BD',
  'color-P0-L20': '#A6A7AE',
  'color-P0-L10': '#96979F',
  'color-P0': '#878890',
  'color-P0-D10': '#777881',
  'color-P0-D20': '#676872',
  'color-P0-D30': '#575963',
  'color-P0-D40': '#474954',
};

const primaryContrastColors = {
  'color-P05-contrast': '#222',
  'color-P10-contrast': '#222',
  'color-P15-contrast': '#222',
  'color-P20-contrast': '#222',
  'color-P25-contrast': '#222',
  'color-P30-contrast': '#222',
  'color-P35-contrast': '#222',
  'color-P40-contrast': '#222',
  'color-P45-contrast': '#222',
  'color-P50-contrast': '#222',
  'color-P55-contrast': '#222',
  'color-P60-contrast': '#222',
  'color-P65-contrast': '#222',
};

const adjustments = {
  'color-P05-lighten': 0.275,
  'color-P10-lighten': 0.1875,
  'color-P15-lighten': 0.125,
  'color-P20-lighten': 0.15,
  'color-P25-lighten': 0.1875,
  'color-P30-lighten': 0.1875,
  'color-P35-lighten': 0.1875,
  'color-P40-lighten': 0.23,
  'color-P45-lighten': 0.2,
  'color-P50-lighten': 0.17,
  'color-P55-lighten': 0.15,
  'color-P60-lighten': 0.2,
  'color-P65-lighten': 0.38,

  'color-P15-darken': 0.125,
  'color-P25-darken': 0.125,
  'color-P30-darken': 0.1,
  'color-P35-darken': 0.0625,
};

const accentColors = {
  'color-accent-primary': primaryColors['color-P45'],
  'color-accent-primary-contrast': '#222',

  'color-success': primaryColors['color-P40'],
  'color-success-contrast': '#222',

  'color-warning': primaryColors['color-P25'],
  'color-warning-contrast': '#222',

  'color-danger': primaryColors['color-P15'],
  'color-danger-contrast': '#222',

  'color-neutral': primaryZeroColors['color-P0-D20'],
  'color-neutral-contrast': '#222',
};

const shadowColors = {
  'box-shadow-0': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 90)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.4)
  `,

  'box-shadow-10': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 80)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.5)
  `,

  'box-shadow-20': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 70)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.8)
  `,

  'box-shadow-100': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 90)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.4)
  `,

  'box-shadow-200': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 95)},
    0px 8px 40px 0px rgba(0, 0, 0, 0.4)
  `,
};

const hierarchyColors = {
  'primary-palette-background-color': neutralColors['color-BG0'],
  'primary-palette-border-color': neutralColors['color-BG30'],
  'primary-palette-quiet-border-color': neutralColors['color-BG20'],
  'primary-palette-text-color': neutralColors['color-FG0'],
  'primary-palette-quiet-color': color.transparency(neutralColors['color-FG0'], 60),
  'primary-palette-quieter-color': color.transparency(neutralColors['color-FG0'], 70),
  'primary-palette-quietest-color': color.transparency(neutralColors['color-FG0'], 80),
  'primary-palette-accent-color': accentColors['color-accent-primary'],

  'secondary-palette-background-color': neutralColors['color-BG05'],
  'secondary-palette-border-color': neutralColors['color-BG40'],
  'secondary-palette-quiet-border-color': neutralColors['color-BG20'],
  'secondary-palette-text-color': neutralColors['color-FG0'],
  'secondary-palette-quiet-color': color.transparency(neutralColors['color-FG0'], 50),
  'secondary-palette-quieter-color': color.transparency(neutralColors['color-FG0'], 60),
  'secondary-palette-quietest-color': color.transparency(neutralColors['color-FG0'], 70),
  'secondary-palette-accent-color': accentColors['color-accent-primary'],

  'tertiary-palette-background-color': neutralColors['color-BG20'],
  'tertiary-palette-border-color': neutralColors['color-BG40'],
  'tertiary-palette-quiet-border-color': neutralColors['color-BG30'],
  'tertiary-palette-text-color': neutralColors['color-FG0'],
  'tertiary-palette-quiet-color': color.transparency(neutralColors['color-FG0'], 60),
  'tertiary-palette-quieter-color': color.transparency(neutralColors['color-FG0'], 70),
  'tertiary-palette-quietest-color': color.transparency(neutralColors['color-FG0'], 80),
  'tertiary-palette-accent-color': accentColors['color-accent-primary'],

  'contrast-palette-background-color': accentColors['color-accent-primary'],
  'contrast-palette-border-color': color.transparency(accentColors['color-accent-primary-contrast'], 60),
  'contrast-palette-quiet-border-color': color.transparency(accentColors['color-accent-primary-contrast'], 80),
  'contrast-palette-text-color': accentColors['color-accent-primary-contrast'],
  'contrast-palette-quiet-color': color.transparency(accentColors['color-accent-primary-contrast'], 40),
  'contrast-palette-quieter-color': color.transparency(accentColors['color-accent-primary-contrast'], 60),
  'contrast-palette-quietest-color': color.transparency(accentColors['color-accent-primary-contrast'], 80),
  'contrast-palette-accent-color': accentColors['color-accent-primary-contrast'],
};

const miscColors = {
  'primary-scrollbar-thumb-color': neutralColors['color-BG20'],
  'primary-scrollbar-track-color': 'transparent',

  'contrast-scrollbar-thumb-color': color.transparency(accentColors['color-accent-primary-contrast'], 80),
  'contrast-scrollbar-track-color': 'transparent',
};

const definedColors = {
  ...neutralColors,
  ...primaryColors,
  ...accentColors,
  ...shadowColors,
  ...hierarchyColors,
  ...miscColors,
};

const colors = {
  ...definedColors,
  ...primaryZeroColors,
  ...primaryContrastColors,
  ...color.generateLightenDarken(
    definedColors,
    [
      'color-accent-primary',
      'color-success',
      'color-warning',
      'color-danger',
      'color-neutral',
      ...Object.keys(primaryColors),
    ],
    adjustments,
  ),
  ...color.generateOpacityRange(definedColors, ['color-BG0', 'color-FG0', 'color-BG40', 'color-accent-primary']),
};

module.exports = colors;
