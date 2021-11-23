const color = require('./utils/color');

// foreground and background colors, generally
const neutralColors = {
  'color-FG0': '#17171d',
  'color-FG05': '#29292f',
  'color-FG10': '#3a3a40',
  'color-FG20': '#5d5d63',
  'color-FG30': '#808086',
  'color-FG40': '#a3a3a9',
  'color-FG50': '#c6c6cc',

  'color-BG0': '#fff',
  'color-BG05': '#fafafa',
  'color-BG10': '#f4f4f5',
  'color-BG20': '#e8e8eb',
  'color-BG30': '#dddde0',
  'color-BG40': '#d1d1d6',
  'color-BG50': '#c6c6cc',
};

const primaryColors = {
  'color-P00': '#808086',
  'color-P05': '#c5106b',
  'color-P10': '#f41150',
  'color-P15': '#ff3232',
  'color-P20': '#ff6020',
  'color-P25': '#ff8e0d',
  'color-P30': '#fda600',
  'color-P35': '#f8be07',
  'color-P40': '#bbc71e',
  'color-P45': '#7cbb3f',
  'color-P50': '#3e8e87',
  'color-P55': '#0060ce',
  'color-P60': '#3247b7',
  'color-P65': '#642da0',
  'color-P70': '#8b218b',
};

const primaryContrastColors = {
  'color-P00-contrast': '#fff',
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
  'color-P70-contrast': '#fff',
};

// fine tune the lighten and darken amounts by color
const adjustments = {
  'cfg-color-P00-lighten': 0.1625,
  'cfg-color-P05-lighten': 0.275,
  'cfg-color-P10-lighten': 0.1875,
  'cfg-color-P15-lighten': 0.1375,
  'cfg-color-P20-lighten': 0.1625,
  'cfg-color-P25-lighten': 0.1875,
  'cfg-color-P30-lighten': 0.1875,
  'cfg-color-P35-lighten': 0.1875,
  'cfg-color-P40-lighten': 0.275,
  'cfg-color-P45-lighten': 0.1875,
  'cfg-color-P50-lighten': 0.2875,
  'cfg-color-P55-lighten': 0.32,
  'cfg-color-P60-lighten': 0.2375,
  'cfg-color-P65-lighten': 0.275,
  'cfg-color-P70-lighten': 0.32,

  'cfg-color-P00-darken': 0.15,
  'cfg-color-P15-darken': 0.15,
  'cfg-color-P30-darken': 0.1,
  'cfg-color-P35-darken': 0.08,
};

// shade color is the accent color at .1 opacity flattened on the extreme background color
const accentColors = {
  'color-accent': primaryColors['color-P55'],
  'color-accent-contrast': primaryContrastColors['color-P50-contrast'],

  'color-success': primaryColors['color-P45'],
  'color-success-contrast': primaryContrastColors['color-P45-contrast'],

  'color-warning': primaryColors['color-P25'],
  'color-warning-contrast': primaryContrastColors['color-P25-contrast'],

  'color-danger': primaryColors['color-P15'],
  'color-danger-contrast': primaryContrastColors['color-P15-contrast'],

  'color-neutral': primaryColors['color-P00'],
  'color-neutral-contrast': primaryContrastColors['color-P00-contrast'],
};

adjustments['cfg-color-accent-lighten'] = adjustments['cfg-color-P55-lighten'];
adjustments['cfg-color-accent-darken'] = adjustments['cfg-color-P55-darken'];

adjustments['cfg-color-success-lighten'] = adjustments['cfg-color-P40-lighten'];
adjustments['cfg-color-success-darken'] = adjustments['cfg-color-P40-darken'];

adjustments['cfg-color-warning-lighten'] = adjustments['cfg-color-P25-lighten'];
adjustments['cfg-color-warning-darken'] = adjustments['cfg-color-P25-darken'];

adjustments['cfg-color-danger-lighten'] = adjustments['cfg-color-P15-lighten'];
adjustments['cfg-color-danger-darken'] = adjustments['cfg-color-P15-darken'];

adjustments['cfg-color-neutral-lighten'] = adjustments['cfg-color-P00-lighten'];
adjustments['cfg-color-neutral-darken'] = adjustments['cfg-color-P00-darken'];

const shadowColors = {
  'box-shadow-10': `
    0px 1px 2px 0px rgba(0, 0, 0, 0.3)
  `,

  'box-shadow-20': `
    0px 1px 6px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.12),
    0px 2px 4px -1px rgba(0, 0, 0, 0.12)
  `,

  'box-shadow-30': `
    0px 1px 7px 0px rgba(0, 0, 0, 0.3)
  `,

  'box-shadow-40': `
    0px 2px 4px 1px rgba(0, 0, 0, 0.1)
  `,

  'box-shadow-100': `
    0px 8px 40px 0px rgba(0, 0, 0, 0.1)
  `,
};

const paletteColors = {
  'extreme-palette-background-color': neutralColors['color-BG0'],
  'extreme-palette-border-color': neutralColors['color-BG40'],
  'extreme-palette-text-color': neutralColors['color-FG0'],

  'primary-palette-background-color': neutralColors['color-BG05'],
  'primary-palette-border-color': neutralColors['color-BG40'],
  'primary-palette-quiet-border-color': neutralColors['color-BG30'],
  'primary-palette-text-color': neutralColors['color-FG10'],
  'primary-palette-quiet-color': neutralColors['color-FG30'],
  'primary-palette-quieter-color': neutralColors['color-FG40'],
  'primary-palette-quietest-color': neutralColors['color-FG50'],

  'secondary-palette-background-color': neutralColors['color-BG10'],
  'secondary-palette-border-color': neutralColors['color-BG50'],
  'secondary-palette-quiet-border-color': neutralColors['color-BG30'],
  'secondary-palette-text-color': neutralColors['color-FG05'],
  'secondary-palette-quiet-color': neutralColors['color-FG30'],
  'secondary-palette-quieter-color': neutralColors['color-FG40'],
  'secondary-palette-quietest-color': neutralColors['color-FG50'],

  'tertiary-palette-background-color': neutralColors['color-BG20'],
  'tertiary-palette-border-color': neutralColors['color-BG40'],
  'tertiary-palette-quiet-border-color': neutralColors['color-BG30'],
  'tertiary-palette-text-color': neutralColors['color-FG0'],
  'tertiary-palette-quiet-color': neutralColors['color-FG30'],
  'tertiary-palette-quieter-color': neutralColors['color-FG40'],
  'tertiary-palette-quietest-color': neutralColors['color-FG50'],

  'contrast-palette-background-color': accentColors['color-accent'],
  'contrast-palette-border-color': color.transparency(accentColors['color-accent-contrast'], 50),
  'contrast-palette-quiet-border-color': color.transparency(accentColors['color-accent-contrast'], 70),
  'contrast-palette-text-color': accentColors['color-accent-contrast'],
  'contrast-palette-quiet-color': color.transparency(accentColors['color-accent-contrast'], 20),
  'contrast-palette-quieter-color': color.transparency(accentColors['color-accent-contrast'], 40),
  'contrast-palette-quietest-color': color.transparency(accentColors['color-accent-contrast'], 60),
};

const miscColors = {
  'primary-scrollbar-thumb-color': neutralColors['color-BG30'],
  'primary-scrollbar-track-color': 'transparent',

  'contrast-scrollbar-thumb-color': color.transparency(accentColors['color-accent-contrast'], 80),
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
  ...primaryContrastColors,
  ...color.generateLightenDarken(
    definedColors,
    ['color-accent', 'color-success', 'color-warning', 'color-danger', 'color-neutral', ...Object.keys(primaryColors)],
    adjustments,
  ),
  ...color.generateShade(
    definedColors,
    ['color-accent', 'color-success', 'color-warning', 'color-danger', 'color-neutral', ...Object.keys(primaryColors)],
    paletteColors['extreme-palette-background-color'],
  ),
  ...color.generateOpacityRange(definedColors, ['color-BG0', 'color-FG0', 'color-BG50', 'color-accent']),
  ...adjustments,
};

module.exports = colors;
