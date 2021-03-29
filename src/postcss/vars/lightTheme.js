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

const primaryColors = {
  'color-P05': '#c5106b',
  'color-P05-contrast': '#fff',

  'color-P10': '#f41150',
  'color-P10-contrast': '#fff',

  'color-P15': '#ff3232',
  'color-P15-contrast': '#fff',

  'color-P20': '#FF6020',
  'color-P20-contrast': '#fff',

  'color-P25': '#ff8e0d',
  'color-P25-contrast': '#fff',
  'color-P25-adjust-darken': 0.1 /* override the default darken amount */,

  'color-P30': '#FCA60A',
  'color-P30-contrast': '#fff',
  'color-P30-adjust-darken': 0.08 /* override the default darken amount */,

  'color-P35': '#f8be07',
  'color-P35-contrast': '#fff',
  'color-P35-adjust-darken': 0.05 /* override the default darken amount */,

  'color-P40': '#7CBB3F',
  'color-P40-contrast': '#fff',

  'color-P45': '#3E8E87',
  'color-P45-contrast': '#fff',

  'color-P50': '#0060ce',
  'color-P50-contrast': '#fff',

  'color-P55': '#3247B7',
  'color-P55-contrast': '#fff',

  'color-P60': '#642da0',
  'color-P60-contrast': '#fff',

  'color-P65': '#8b218b',
  'color-P65-contrast': '#fff',
};

const accentColors = {
  'color-accent-primary': primaryColors['color-P50'],
  'color-accent-primary-contrast': primaryColors['color-P50-contrast'],

  'color-success': primaryColors['color-P40'],
  'color-success-contrast': primaryColors['color-P40-contrast'],

  'color-warning': primaryColors['color-P25'],
  'color-warning-contrast': primaryColors['color-P25-contrast'],

  'color-danger': primaryColors['color-P15'],
  'color-danger-contrast': primaryColors['color-P15-contrast'],

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

const hierarchyColors = {
  'primary-background-color': neutralColors['color-BG05'],
  'primary-border-color': neutralColors['color-BG40'],
  'primary-text-color': neutralColors['color-FG0'],
  'primary-quiet-color': neutralColors['color-FG40'],
  'primary-quieter-color': color.whiten(neutralColors['color-FG40'], 80),
  'primary-quietest-color': color.whiten(neutralColors['color-FG40'], 90),
  'primary-accent-color': accentColors['color-accent-primary'],

  'secondary-background-color': neutralColors['color-BG0'],
  'secondary-border-color': neutralColors['color-BG30'],
  'secondary-text-color': neutralColors['color-FG10'],
  'secondary-quiet-color': neutralColors['color-FG40'],
  'secondary-quieter-color': color.whiten(neutralColors['color-FG40'], 80),
  'secondary-quietest-color': color.whiten(neutralColors['color-FG40'], 90),
  'secondary-accent-color': accentColors['color-accent-primary'],

  'tertiary-background-color': neutralColors['color-BG10'],
  'tertiary-border-color': neutralColors['color-BG30'],
  'tertiary-text-color': neutralColors['color-FG20'],
  'tertiary-quiet-color': neutralColors['color-FG40'],
  'tertiary-quieter-color': color.whiten(neutralColors['color-FG40'], 90),
  'tertiary-quietest-color': color.whiten(neutralColors['color-FG40'], 100),
  'tertiary-accent-color': accentColors['color-accent-primary'],

  'contrast-background-color': accentColors['color-accent-primary'],
  'contrast-border-color': color.transparency(accentColors['color-accent-primary-contrast'], 50),
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
