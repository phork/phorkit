const color = require('./utils/color');

// foreground and background colors, generally
const neutralColors = {
  'color-FG0': '#fafafa',
  'color-FG05': '#e8e9ea',
  'color-FG10': '#d6d7d9',
  'color-FG20': '#b2b3b8',
  'color-FG30': '#8f9096',
  'color-FG40': '#6b6c75',
  'color-FG50': '#474954',

  'color-BG0': '#0d0d10',
  'color-BG05': '#17171d',
  'color-BG10': '#212128',
  'color-BG20': '#2a2b33',
  'color-BG30': '#34353e',
  'color-BG40': '#3d3f49',
  'color-BG50': '#474954',
};

const primaryColors = {
  'color-P00': '#474954',
  'color-P05': '#c5106b',
  'color-P10': '#f41150',
  'color-P15': '#ff3232',
  'color-P20': '#ff6020',
  'color-P25': '#ff8e0d',
  'color-P30': '#fdb70b',
  'color-P35': '#fbdf09',
  'color-P40': '#bfd800',
  'color-P45': '#7ece19',
  'color-P50': '#00d38d',
  'color-P55': '#00baee',
  'color-P60': '#2c85fd',
  'color-P65': '#7452e5',
  'color-P70': '#933293',
};

const primaryContrastColors = {
  'color-P00-contrast': '#0d0d10',
  'color-P05-contrast': '#0d0d10',
  'color-P10-contrast': '#0d0d10',
  'color-P15-contrast': '#0d0d10',
  'color-P20-contrast': '#0d0d10',
  'color-P25-contrast': '#0d0d10',
  'color-P30-contrast': '#0d0d10',
  'color-P35-contrast': '#0d0d10',
  'color-P40-contrast': '#0d0d10',
  'color-P45-contrast': '#0d0d10',
  'color-P50-contrast': '#0d0d10',
  'color-P55-contrast': '#0d0d10',
  'color-P60-contrast': '#0d0d10',
  'color-P65-contrast': '#0d0d10',
  'color-P70-contrast': '#0d0d10',
};

// fine tune the lighten and darken amounts by color
const adjustments = {
  'cfg-color-P00-lighten': 0.32,
  'cfg-color-P05-lighten': 0.275,
  'cfg-color-P10-lighten': 0.1875,
  'cfg-color-P15-lighten': 0.125,
  'cfg-color-P20-lighten': 0.15,
  'cfg-color-P25-lighten': 0.1875,
  'cfg-color-P30-lighten': 0.1875,
  'cfg-color-P35-lighten': 0.1875,
  'cfg-color-P40-lighten': 0.26,
  'cfg-color-P45-lighten': 0.23,
  'cfg-color-P50-lighten': 0.26,
  'cfg-color-P55-lighten': 0.26,
  'cfg-color-P60-lighten': 0.12,
  'cfg-color-P65-lighten': 0.1,
  'cfg-color-P70-lighten': 0.2,

  'cfg-color-P30-darken': 0.1,
  'cfg-color-P35-darken': 0.08,
};

const accentColors = {
  'color-accent': primaryColors['color-P55'],
  'color-accent-contrast': primaryContrastColors['color-P55-contrast'],

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
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 90)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.4)
  `,

  'box-shadow-20': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 80)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.5)
  `,

  'box-shadow-30': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 70)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.8)
  `,

  'box-shadow-40': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 90)},
    0px 2px 4px 1px rgba(0, 0, 0, 0.4)
  `,

  'box-shadow-100': `
    0px 0px 0px 1px ${color.transparency(neutralColors['color-FG0'], 95)},
    0px 8px 40px 0px rgba(0, 0, 0, 0.4)
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

  'tertiary-palette-background-color': neutralColors['color-BG30'],
  'tertiary-palette-border-color': neutralColors['color-BG50'],
  'tertiary-palette-quiet-border-color': neutralColors['color-BG40'],
  'tertiary-palette-text-color': neutralColors['color-FG0'],
  'tertiary-palette-quiet-color': neutralColors['color-FG30'],
  'tertiary-palette-quieter-color': neutralColors['color-FG40'],
  'tertiary-palette-quietest-color': neutralColors['color-FG50'],

  'contrast-palette-background-color': accentColors['color-accent'],
  'contrast-palette-border-color': color.transparency(accentColors['color-accent-contrast'], 60),
  'contrast-palette-quiet-border-color': color.transparency(accentColors['color-accent-contrast'], 80),
  'contrast-palette-text-color': accentColors['color-accent-contrast'],
  'contrast-palette-quiet-color': color.transparency(accentColors['color-accent-contrast'], 30),
  'contrast-palette-quieter-color': color.transparency(accentColors['color-accent-contrast'], 50),
  'contrast-palette-quietest-color': color.transparency(accentColors['color-accent-contrast'], 70),
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
