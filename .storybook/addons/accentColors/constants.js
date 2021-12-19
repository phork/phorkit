import { themes } from '.../../../src/config/themes';
import * as Color from 'color';
import { getThemeId } from '../theme/utils';

export const ADDON_ID = 'storybook/accentColors';
export const PARAM_KEY = 'accentColors';
export const STORAGE_KEY = 'storybook/accentColors';

const themeId = getThemeId();

export const presetColors = [
  'P05',
  'P10',
  'P15',
  'P20',
  'P25',
  'P30',
  'P35',
  'P40',
  'P45',
  'P50',
  'P55',
  'P60',
  'P65',
  'P70',
].map(colorId => ({
  color: themes[themeId][`color-${colorId}`],
  title: colorId,
  lighten: themes[themeId][`cfg-color-${colorId}-lighten`],
  darken: themes[themeId][`cfg-color-${colorId}-darken`],
}));

// use the custom lighten and darken amounts for the preset colors
const getLighten = src => presetColors.find(({ color }) => color.toLowerCase() === src.toLowerCase())?.lighten || 0.25;
const getDarken = src => presetColors.find(({ color }) => color.toLowerCase() === src.toLowerCase())?.darken || 0.125;

export const accentColorProps = [
  {
    property: '--phork-accent-color',
    label: 'Accent color',
    description:
      'The accent color is the main color used in the components and generally defines the theme of the application.',
  },
  {
    property: '--phork-accent-color-contrast',
    label: 'Accent contrast color',
    description:
      'The contrast color should be visible against the accent color. For example the accent color will be the background and the contrast color will be the text color.',
  },
  {
    property: '--phork-accent-color-L10',
    label: 'Accent color L10',
    description: 'This is a slightly lightened version of the accent color used for things like button hover states.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).lighten(getLighten(src['--phork-accent-color'])).hex(),
  },
  {
    property: '--phork-accent-color-D10',
    label: 'Accent color D10',
    description: 'This is a slightly darkened version of the accent color used for things like button active states.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).darken(getDarken(src['--phork-accent-color'])).hex(),
  },
  {
    property: '--phork-accent-color-L20',
    label: 'Accent color L20',
    description: 'This is the accent color lightened by a factor of 2. Reserved for future use.',
    derivedFrom: ['--phork-accent-color'],
    formula: src =>
      Color(src['--phork-accent-color'])
        .lighten(getLighten(src['--phork-accent-color']) * 2)
        .hex(),
  },
  {
    property: '--phork-accent-color-D20',
    label: 'Accent color D20',
    description: 'This is the accent color darkened by a factor of 2. Reserved for future use.',
    derivedFrom: ['--phork-accent-color'],
    formula: src =>
      Color(src['--phork-accent-color'])
        .darken(getDarken(src['--phork-accent-color']) * 2)
        .hex(),
  },
  {
    property: '--phork-accent-color-L30',
    label: 'Accent color L30',
    description: 'This the accent color lightened by a factor of 3. This is used for the Paper borders in dark mode.',
    derivedFrom: ['--phork-accent-color'],
    formula: src =>
      Color(src['--phork-accent-color'])
        .lighten(getLighten(src['--phork-accent-color']) * 3)
        .hex(),
  },
  {
    property: '--phork-accent-color-D30',
    label: 'Accent color D30',
    description: 'This the accent color darkened by a factor of 3. This is used for the Paper borders in light mode.',
    derivedFrom: ['--phork-accent-color'],
    formula: src =>
      Color(src['--phork-accent-color'])
        .darken(getDarken(src['--phork-accent-color']) * 3)
        .hex(),
  },
  {
    property: '--phork-accent-color-shade',
    label: 'Accent color shade',
    description:
      'This is approximately the accent color at an opacity of .1 flattened against the extreme palette background color.',
    derivedFrom: ['--phork-accent-color'],
    formula: src =>
      Color(src['--phork-accent-color'])
        .alpha(0.15)
        .mix(Color(themes[themeId]['extreme-palette-background-color']))
        .hex(),
  },
  {
    property: '--phork-accent-color-O5',
    label: 'Accent color O5',
    description:
      'This is the accent color with an opacity of .05. This is used for auto-filled form background colors.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).alpha(0.05).rgb().string(),
    format: 'rgba',
  },
  {
    property: '--phork-contrast-color',
    label: 'Contrast color',
    description: 'The contrast color is used as the background for components using the contrast flag.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => src['--phork-accent-color'],
  },
];

export const colorGroups = [
  {
    id: 'primary',
    properties: ['--phork-accent-color', '--phork-accent-color-contrast'],
  },
  {
    id: 'accent-derived',
    notification:
      'The following colors will be automatically generated from the accent color when this panel is closed.',
    properties: [
      '--phork-accent-color-L10',
      '--phork-accent-color-L20',
      '--phork-accent-color-L30',
      '--phork-accent-color-D10',
      '--phork-accent-color-D20',
      '--phork-accent-color-D30',
      '--phork-accent-color-shade',
      '--phork-accent-color-O5',
    ],
    hidden: true,
  },
  {
    id: 'contrast',
    properties: ['--phork-contrast-color'],
  },
];

export const accentColorMap = accentColorProps.reduce((acc, { property }, index) => {
  acc[property] = index;
  return acc;
}, {});

export const derivativeSources = [
  ...new Set(
    accentColorProps.reduce((acc, { derivedFrom }) => {
      derivedFrom && acc.push(...derivedFrom);
      return acc;
    }, []),
  ),
];
