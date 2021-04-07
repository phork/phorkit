const color = require('./utils/color');

// foreground and background colors, generally
const neutralColors = {
  'color-FG0': '#fff',
  'color-FG05': '#fafafa',
  'color-FG10': '#f4f4f4',
  'color-FG20': '#e4e4e4',
  'color-FG30': '#d4d4d4',
  'color-FG40': '#c4c4c4',

  'color-BG0': '#000',
  'color-BG05': '#0C0C0C',
  'color-BG10': '#111',
  'color-BG20': '#222',
  'color-BG30': '#333',
  'color-BG40': '#444',
};

const primaryColors = {
  'color-P05': '#c5106b',
  'color-P05-contrast': '#222',

  'color-P10': '#f41150',
  'color-P10-contrast': '#222',

  'color-P15': '#ff3232',
  'color-P15-contrast': '#222',

  'color-P20': '#FF6020',
  'color-P20-contrast': '#222',

  'color-P25': '#ff8e0d',
  'color-P25-contrast': '#222',
  'color-P25-adjust-darken': 0.1 /* override the default darken amount */,

  'color-P30': '#FDB70B',
  'color-P30-contrast': '#222',
  'color-P30-adjust-darken': 0.08 /* override the default darken amount */,

  'color-P35': '#fbdf09',
  'color-P35-contrast': '#222',
  'color-P35-adjust-darken': 0.05 /* override the default darken amount */,

  'color-P40': '#7ECE19',
  'color-P40-contrast': '#222',

  'color-P45': '#00aaff',
  'color-P45-contrast': '#222',

  'color-P50': '#0E75FF',
  'color-P50-contrast': '#222',

  'color-P55': '#1b3fff',
  'color-P55-contrast': '#222',

  'color-P60': '#5330C5',
  'color-P60-contrast': '#222',

  'color-P65': '#8b218b',
  'color-P65-contrast': '#222',
};

const accentColors = {
  'color-accent-primary': primaryColors['color-P45'],
  'color-accent-primary-contrast': primaryColors['color-P45-contrast'],

  'color-success': primaryColors['color-P40'],
  'color-success-contrast': primaryColors['color-P40-contrast'],

  'color-warning': primaryColors['color-P25'],
  'color-warning-contrast': primaryColors['color-P25-contrast'],

  'color-danger': primaryColors['color-P15'],
  'color-danger-contrast': primaryColors['color-P15-contrast'],

  'color-neutral': '#777',
  'color-neutral-contrast': neutralColors['color-BG0'],
};

const shadowColors = {
  'box-shadow-0': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG40'], 80)}
  `,

  'box-shadow-10': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG40'], 60)}
  `,

  'box-shadow-20': `
    0px 0px 0px 1px ${neutralColors['color-BG40']},
    0px 1px 10px 0px rgba(0, 0, 0, 0.8)
  `,

  'box-shadow-100': `
    0px 0px 0px 1px ${neutralColors['color-BG40']},
    0px 2px 4px 1px rgba(0, 0, 0, 0.9)
  `,

  'box-shadow-200': `
    0px 0px 0px 1px ${neutralColors['color-BG30']},
    0px 8px 40px 0px rgba(0, 0, 0, 0.9)
  `,
};

const hierarchyColors = {
  'primary-background-color': neutralColors['color-BG10'],
  'primary-border-color': neutralColors['color-BG40'],
  'primary-text-color': neutralColors['color-FG05'],
  'primary-quiet-color': neutralColors['color-FG40'],
  'primary-quieter-color': color.blacken(neutralColors['color-FG40'], 80),
  'primary-quietest-color': color.blacken(neutralColors['color-FG40'], 80),
  'primary-accent-color': accentColors['color-accent-primary'],

  'secondary-background-color': neutralColors['color-BG0'],
  'secondary-border-color': neutralColors['color-BG30'],
  'secondary-text-color': neutralColors['color-FG0'],
  'secondary-quiet-color': neutralColors['color-FG40'],
  'secondary-quieter-color': color.blacken(neutralColors['color-FG40'], 80),
  'secondary-quietest-color': color.blacken(neutralColors['color-FG40'], 90),
  'secondary-accent-color': accentColors['color-accent-primary'],

  'tertiary-background-color': neutralColors['color-BG20'],
  'tertiary-border-color': neutralColors['color-BG40'],
  'tertiary-text-color': neutralColors['color-FG20'],
  'tertiary-quiet-color': neutralColors['color-FG40'],
  'tertiary-quieter-color': color.blacken(neutralColors['color-FG40'], 90),
  'tertiary-quietest-color': color.blacken(neutralColors['color-FG40'], 100),
  'tertiary-accent-color': accentColors['color-accent-primary'],

  'contrast-background-color': accentColors['color-accent-primary'],
  'contrast-border-color': color.transparency(accentColors['color-accent-primary-contrast'], 60),
  'contrast-text-color': accentColors['color-accent-primary-contrast'],
  'contrast-quiet-color': color.transparency(accentColors['color-accent-primary-contrast'], 40),
  'contrast-quieter-color': color.transparency(accentColors['color-accent-primary-contrast'], 60),
  'contrast-quietest-color': color.transparency(accentColors['color-accent-primary-contrast'], 80),
  'contrast-accent-color': accentColors['color-accent-primary-contrast'],
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
  ...color.generateLightenDarken(definedColors, [
    'color-accent-primary',
    'color-success',
    'color-warning',
    'color-danger',
    'color-neutral',
    ...Object.keys(primaryColors).filter(key => !key.includes('contrast')),
  ]),
  ...color.generateOpacityRange(definedColors, ['color-BG0', 'color-FG0', 'color-BG40', 'color-accent-primary']),
};

module.exports = colors;
