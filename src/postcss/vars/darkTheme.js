const color = require('./utils/color');

// foreground and background colors, generally
const neutralColors = {
  'color-FG0': '#fff',
  'color-FG05': '#fafafa',
  'color-FG10': '#f4f4f4',
  'color-FG20': '#e4e4e4',
  'color-FG30': '#d4d4d4',
  'color-FG40': '#c4c4c4',

  'color-BG0': '#17171D',
  'color-BG05': '#1F2027',
  'color-BG10': '#272931',
  'color-BG20': '#2F313A',
  'color-BG30': '#373A44',
  'color-BG40': '#3F434E',
};

const primaryZero = {
  'color-P0-L40': '#848999',
  'color-P0-L30': '#777b8a',
  'color-P0-L20': '#6a6e7c',
  'color-P0-L10': '#5d606d',
  'color-P0': '#50525e',
  'color-P0-D10': '#42444f',
  'color-P0-D20': '#353741',
  'color-P0-D30': '#282932',
  'color-P0-D40': '#1b1b23',
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

const primaryContrastColors = {
  'color-P0-contrast': '#fff',
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

  'color-neutral': '#777',
  'color-neutral-contrast': neutralColors['color-BG0'],
};

const shadowColors = {
  'box-shadow-0': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 85)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.8)
  `,

  'box-shadow-10': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 80)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.7)
  `,

  'box-shadow-20': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 70)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.9)
  `,

  'box-shadow-100': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 90)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.9)
  `,

  'box-shadow-200': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 95)},
    0px 8px 40px 0px rgba(0, 0, 0, 0.9)
  `,
};

const hierarchyColors = {
  'primary-palette-background-color': neutralColors['color-BG10'],
  'primary-palette-border-color': neutralColors['color-BG40'],
  'primary-palette-quiet-border-color': neutralColors['color-BG20'],
  'primary-palette-text-color': neutralColors['color-FG05'],
  'primary-palette-quiet-color': neutralColors['color-FG40'],
  'primary-palette-quieter-color': color.blacken(neutralColors['color-FG40'], 80),
  'primary-palette-quietest-color': color.blacken(neutralColors['color-FG40'], 80),
  'primary-palette-accent-color': accentColors['color-accent-primary'],

  'secondary-palette-background-color': neutralColors['color-BG0'],
  'secondary-palette-border-color': neutralColors['color-BG30'],
  'secondary-palette-quiet-border-color': neutralColors['color-BG20'],
  'secondary-palette-text-color': neutralColors['color-FG0'],
  'secondary-palette-quiet-color': neutralColors['color-FG40'],
  'secondary-palette-quieter-color': color.blacken(neutralColors['color-FG40'], 80),
  'secondary-palette-quietest-color': color.blacken(neutralColors['color-FG40'], 90),
  'secondary-palette-accent-color': accentColors['color-accent-primary'],

  'tertiary-palette-background-color': neutralColors['color-BG20'],
  'tertiary-palette-border-color': neutralColors['color-BG40'],
  'tertiary-palette-quiet-border-color': neutralColors['color-BG20'],
  'tertiary-palette-text-color': neutralColors['color-FG20'],
  'tertiary-palette-quiet-color': neutralColors['color-FG40'],
  'tertiary-palette-quieter-color': color.blacken(neutralColors['color-FG40'], 90),
  'tertiary-palette-quietest-color': color.blacken(neutralColors['color-FG40'], 100),
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
  ...primaryZero,
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
