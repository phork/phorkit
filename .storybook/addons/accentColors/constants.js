import { themes } from '.../../../src/config/themes';
import * as Color from 'color';
import { getThemeId } from '../theme/utils';

export const ADDON_ID = 'storybook/accentColors';
export const PARAM_KEY = 'accentColors';
export const STORAGE_KEY = 'storybook/accentColors';

const themeId = getThemeId();

export const presetColors = [
  { color: themes[themeId]['color-P05'], title: 'P05' },
  { color: themes[themeId]['color-P10'], title: 'P10' },
  { color: themes[themeId]['color-P15'], title: 'P15' },
  { color: themes[themeId]['color-P20'], title: 'P20' },
  { color: themes[themeId]['color-P25'], title: 'P25' },
  { color: themes[themeId]['color-P30'], title: 'P30' },
  { color: themes[themeId]['color-P35'], title: 'P35' },
  { color: themes[themeId]['color-P40'], title: 'P40' },
  { color: themes[themeId]['color-P45'], title: 'P45' },
  { color: themes[themeId]['color-P50'], title: 'P50' },
  { color: themes[themeId]['color-P55'], title: 'P55' },
  { color: themes[themeId]['color-P60'], title: 'P60' },
  { color: themes[themeId]['color-P65'], title: 'P65' },
];

export const accentColorProps = [
  {
    property: '--phork-accent-color',
    label: 'Accent color',
    description:
      'The accent color is the main color used in the components and generally defines the theme of the application.',
  },
  {
    property: '--phork-accent-color-contrast',
    label: 'Accent contrast',
    description:
      'The contrast color should be visible against the accent color. For example the accent color will be the background and the contrast color will be the text color.',
  },
  {
    property: '--phork-accent-color-L10',
    label: 'Accent color L10',
    description: 'This is a slightly lightened version of the accent color used for things like button hover states.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).lighten(0.25).hex(),
  },
  {
    property: '--phork-accent-color-D10',
    label: 'Accent color D10',
    description: 'This is a slightly darkened version of the accent color used for things like button active states.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).darken(0.125).hex(),
  },
  {
    property: '--phork-accent-color-L30',
    label: 'Accent color L30',
    description: 'This the accent color lightened by a factor of 3. This is used for the Paper border in dark mode.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).lighten(0.75).hex(),
  },
  {
    property: '--phork-accent-color-D30',
    label: 'Accent color D30',
    description: 'This the accent color darkened by a factor of 3. This is used for the Paper borders in light mode.',
    derivedFrom: ['--phork-accent-color'],
    formula: src => Color(src['--phork-accent-color']).lighten(0.375).hex(),
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
      '--phork-accent-color-D10',
      '--phork-accent-color-L30',
      '--phork-accent-color-D30',
      '--phork-accent-color-shade',
      '--phork-accent-color-O5',
    ],
    hidden: true,
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
