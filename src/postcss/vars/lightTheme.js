const color = require('./utils/color');

// foreground and background colors, generally
const neutralColors = {
  'color-FG0': '#000',
  'color-FG05': '#111',
  'color-FG10': '#333',
  'color-FG20': '#555',
  'color-FG30': '#777',
  'color-FG40': '#999',

  'color-BG0': '#fff',
  'color-BG05': '#fafafa',
  'color-BG10': '#f4f4f4',
  'color-BG20': '#e4e4e4',
  'color-BG30': '#d4d4d4',
  'color-BG40': '#c4c4c4',
};

const primaryZero = {
  'color-P0-L40': '#b5bbc9',
  'color-P0-L30': '#a6abb9',
  'color-P0-L20': '#969ba8',
  'color-P0-L10': '#878a98',
  'color-P0': '#777a87',
  'color-P0-D10': '#686a77',
  'color-P0-D20': '#585a66',
  'color-P0-D30': '#494956',
  'color-P0-D40': '#393945',
};

const primaryColors = {
  'color-P05': '#c5106b',
  'color-P10': '#f41150',
  'color-P15': '#ff3232',
  'color-P20': '#ff6020',
  'color-P25': '#ff8e0d',
  'color-P30': '#fca60a',
  'color-P35': '#f8be07',
  'color-P40': '#7cbb3f',
  'color-P45': '#3e8e87',
  'color-P50': '#0060ce',
  'color-P55': '#3247b7',
  'color-P60': '#642da0',
  'color-P65': '#8b218b',
};

const primaryContrastColors = {
  'color-P0-contrast': '#fff',
  'color-P05-contrast': '#fff',
  'color-P10-contrast': '#fff',
  'color-P15-contrast': '#fff',
  'color-P20-contrast': '#fff',
  'color-P25-contrast': '#fff',
  'color-P30-contrast': '#fff',
  'color-P35-contrast': '#fff',
  'color-P40-contrast': '#fff',
  'color-P45-contrast': '#fff',
  'color-P50-contrast': '#fff',
  'color-P55-contrast': '#fff',
  'color-P60-contrast': '#fff',
  'color-P65-contrast': '#fff',
};

const adjustments = {
  'color-P05-lighten': 0.275,
  'color-P10-lighten': 0.1875,
  'color-P15-lighten': 0.1375,
  'color-P20-lighten': 0.1625,
  'color-P25-lighten': 0.1875,
  'color-P30-lighten': 0.1875,
  'color-P35-lighten': 0.1875,
  'color-P40-lighten': 0.1875,
  'color-P50-lighten': 0.2875,
  'color-P55-lighten': 0.2375,
  'color-P60-lighten': 0.275,
  'color-P65-lighten': 0.32,

  'color-P15-darken': 0.15,
  'color-P25-darken': 0.125,
  'color-P30-darken': 0.1,
  'color-P35-darken': 0.0625,
};

const accentColors = {
  'color-accent-primary': primaryColors['color-P50'],
  'color-accent-primary-contrast': '#fff',

  'color-success': primaryColors['color-P40'],
  'color-success-contrast': '#fff',

  'color-warning': primaryColors['color-P25'],
  'color-warning-contrast': '#fff',

  'color-danger': primaryColors['color-P15'],
  'color-danger-contrast': '#fff',

  'color-neutral': color.whiten(neutralColors['color-FG40'], 80),
  'color-neutral-contrast': neutralColors['color-BG0'],
};

const shadowColors = {
  'box-shadow-0': `
    0px 1px 2px 0px rgba(0, 0, 0, 0.3)
  `,

  'box-shadow-10': `
    0px 1px 6px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.12),
    0px 2px 4px -1px rgba(0, 0, 0, 0.12)
  `,

  'box-shadow-20': `
    0px 1px 7px 0px rgba(0, 0, 0, 0.3)
  `,

  'box-shadow-100': `
    0px 2px 4px 1px rgba(0, 0, 0, 0.1)
  `,

  'box-shadow-200': `
    0px 8px 40px 0px rgba(0, 0, 0, 0.1)
  `,
};

const paletteColors = {
  'primary-palette-background-color': neutralColors['color-BG05'],
  'primary-palette-border-color': neutralColors['color-BG40'],
  'primary-palette-quiet-border-color': neutralColors['color-BG20'],
  'primary-palette-text-color': neutralColors['color-FG0'],
  'primary-palette-quiet-color': neutralColors['color-FG40'],
  'primary-palette-quieter-color': color.whiten(neutralColors['color-FG40'], 80),
  'primary-palette-quietest-color': color.whiten(neutralColors['color-FG40'], 90),
  'primary-palette-accent-color': accentColors['color-accent-primary'],

  'secondary-palette-background-color': neutralColors['color-BG0'],
  'secondary-palette-border-color': neutralColors['color-BG30'],
  'secondary-palette-quiet-border-color': neutralColors['color-BG20'],
  'secondary-palette-text-color': neutralColors['color-FG10'],
  'secondary-palette-quiet-color': neutralColors['color-FG40'],
  'secondary-palette-quieter-color': color.whiten(neutralColors['color-FG40'], 80),
  'secondary-palette-quietest-color': color.whiten(neutralColors['color-FG40'], 90),
  'secondary-palette-accent-color': accentColors['color-accent-primary'],

  'tertiary-palette-background-color': neutralColors['color-BG10'],
  'tertiary-palette-border-color': neutralColors['color-BG30'],
  'tertiary-palette-quiet-border-color': neutralColors['color-BG20'],
  'tertiary-palette-text-color': neutralColors['color-FG20'],
  'tertiary-palette-quiet-color': neutralColors['color-FG40'],
  'tertiary-palette-quieter-color': color.whiten(neutralColors['color-FG40'], 90),
  'tertiary-palette-quietest-color': color.whiten(neutralColors['color-FG40'], 100),
  'tertiary-palette-accent-color': accentColors['color-accent-primary'],

  'contrast-palette-background-color': accentColors['color-accent-primary'],
  'contrast-palette-border-color': color.transparency(accentColors['color-accent-primary-contrast'], 50),
  'contrast-palette-quiet-border-color': color.transparency(accentColors['color-accent-primary-contrast'], 70),
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
  ...paletteColors,
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
