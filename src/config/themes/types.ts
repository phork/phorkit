import { Theme } from '../../types';

export type ThemeColorIds =
  | 'P00'
  | 'P05'
  | 'P10'
  | 'P15'
  | 'P20'
  | 'P25'
  | 'P30'
  | 'P35'
  | 'P40'
  | 'P45'
  | 'P50'
  | 'P55'
  | 'P60'
  | 'P65'
  | 'P70';

export type ThemeForegroundIds = 'FG0' | 'FG05' | 'FG10' | 'FG20' | 'FG30' | 'FG40' | 'FG50';
export type ThemeBackgroundIds = 'BG0' | 'BG05' | 'BG10' | 'BG20' | 'BG30' | 'BG40' | 'BG50';

export type ThemeAccentColorIds = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';

export type ThemeColorOpacities = '5' | '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90';
export type ThemeColorLighten = 'L10' | 'L20' | 'L30';
export type ThemeColorDarken = 'D10' | 'D20' | 'D30';

export type ThemePaletteComponents =
  | 'background'
  | 'border'
  | 'quiet-border'
  | 'text'
  | 'quiet'
  | 'quieter'
  | 'quietest'
  | 'accent';

/** @returns 'color-FG0', 'color-FG05', etc. */
type MakeThemeColorIds<Ids extends ThemeColorIds | ThemeForegroundIds | ThemeBackgroundIds> = {
  [Color in Ids as `color-${string & Color}`]: string;
};

/** @returns 'color-P10-L10', 'color-P20-L10', etc. */
type MakeThemePrimaryColors<Suffix extends string> = {
  [Color in ThemeColorIds as `color-${string & Color}-${Suffix}`]: string;
};

/** @returns 'color-FG0-05', 'color-FG0-10', etc. */
type MakeThemeOpacities<Color extends string> = {
  [Opacity in ThemeColorOpacities as `color-${Color}-O${string & Opacity}`]: string;
};

/** @returns 'color-success-L10', 'color-success-D10', etc. */
type MakeThemeLightenDarken<Color extends string> = {
  [Adjustment in ThemeColorLighten | ThemeColorDarken as `color-${Color}-${string & Adjustment}`]: string;
};

/** @returns 'cfg-color-P05-lighten', 'cfg-color-P05-darken', etc. */
type MakeThemeAdjustments<Direction extends 'lighten' | 'darken'> = {
  [Color in ThemeColorIds | ThemeAccentColorIds as `cfg-color-${Color}-${string & Direction}`]?: string;
};

/** @returns 'primary-palette-background-color', 'primary-palette-border-color', etc. */
type MakeThemePalette<Palette extends string> = {
  [Color in ThemePaletteComponents as `${Palette}-palette-${string & Color}-color`]: string;
};

export type ThemeForegroundColors = MakeThemeColorIds<ThemeForegroundIds>;
export type ThemeForegroundOpacityColors = MakeThemeOpacities<'FG0'>;

export type ThemeBackgroundColors = MakeThemeColorIds<ThemeBackgroundIds>;
export type ThemeBackgroundOpacityColors = MakeThemeOpacities<'BG0'> & MakeThemeOpacities<'BG50'>;

export type ThemePrimaryColors = MakeThemeColorIds<ThemeColorIds>;
export type ThemePrimaryContrastColors = MakeThemePrimaryColors<'contrast'>;

export type ThemePrimaryLightenedColors = MakeThemePrimaryColors<'L10'> &
  MakeThemePrimaryColors<'L20'> &
  MakeThemePrimaryColors<'L30'>;

export type ThemePrimaryDarkenedColors = MakeThemePrimaryColors<'D10'> &
  MakeThemePrimaryColors<'D20'> &
  MakeThemePrimaryColors<'D30'>;

export type ThemePrimaryShadeColors = MakeThemePrimaryColors<'shade'>;

export type ThemeAccentColors = {
  'color-accent': string;
  'color-accent-contrast': string;
  'color-accent-shade': string;
} & MakeThemeOpacities<'accent'> &
  MakeThemeLightenDarken<'accent'>;

export type ThemeSuccessColors = {
  'color-success': string;
  'color-success-contrast': string;
  'color-success-shade': string;
} & MakeThemeLightenDarken<'success'>;

export type ThemeWarningColors = {
  'color-warning': string;
  'color-warning-contrast': string;
  'color-warning-shade': string;
} & MakeThemeLightenDarken<'warning'>;

export type ThemeDangerColors = {
  'color-danger': string;
  'color-danger-contrast': string;
  'color-danger-shade': string;
} & MakeThemeLightenDarken<'danger'>;

export type ThemeNeutralColors = {
  'color-neutral': string;
  'color-neutral-contrast': string;
  'color-neutral-shade': string;
} & MakeThemeLightenDarken<'neutral'>;

export type ThemeBoxShadowColors = {
  'box-shadow-10': string;
  'box-shadow-20': string;
  'box-shadow-30': string;
  'box-shadow-40': string;
  'box-shadow-100': string;
};

export type ThemeExtremePaletteColors = {
  'extreme-palette-background-color': string;
  'extreme-palette-border-color': string;
  'extreme-palette-text-color': string;
};

export type ThemePrimaryPaletteColors = MakeThemePalette<'primary'>;
export type ThemeSecondaryPaletteColors = MakeThemePalette<'secondary'>;
export type ThemeTertiaryPaletteColors = MakeThemePalette<'tertiary'>;
export type ThemeContrastPaletteColors = MakeThemePalette<'contrast'>;

export type ThemeScrollbarColors = {
  'primary-scrollbar-thumb-color': string;
  'primary-scrollbar-track-color': string;

  'contrast-scrollbar-thumb-color': string;
  'contrast-scrollbar-track-color': string;
};

export type ThemeAdjustments = MakeThemeAdjustments<'lighten'> & MakeThemeAdjustments<'darken'>;

export type ThemeColors = ThemeForegroundColors &
  ThemeForegroundOpacityColors &
  ThemeBackgroundColors &
  ThemeBackgroundOpacityColors &
  ThemePrimaryColors &
  ThemePrimaryContrastColors &
  ThemePrimaryLightenedColors &
  ThemePrimaryShadeColors &
  ThemePrimaryDarkenedColors &
  ThemeAccentColors &
  ThemeSuccessColors &
  ThemeWarningColors &
  ThemeDangerColors &
  ThemeNeutralColors &
  ThemeBoxShadowColors &
  ThemeExtremePaletteColors &
  ThemePrimaryPaletteColors &
  ThemeSecondaryPaletteColors &
  ThemeTertiaryPaletteColors &
  ThemeContrastPaletteColors &
  ThemeScrollbarColors;

export type Themes = {
  light: ThemeColors & ThemeAdjustments;
  lightThemeId: Theme;
  dark: ThemeColors & ThemeAdjustments;
  darkThemeId: Theme;
};
