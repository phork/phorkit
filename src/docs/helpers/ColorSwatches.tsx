import React from 'react';
import { Theme } from 'types';
import { ThemeColors, themes } from 'config/themes';
import { getBackgroundColors, getForegroundColors, getPrimaryColors, getTransparentColorsByRoot } from 'utils';
import { ColorSwatchGrid } from './ColorSwatchGrid';
import { Color, ColorSwatchVector, ColorSwatchVectorProps } from './ColorSwatchVector';

export interface ColorSwatchesProps extends Omit<ColorSwatchVectorProps, 'colors'> {
  group: 'primary' | 'state' | 'background' | 'foreground' | 'transparent';
  variant?: string;
  themeId: Theme;
}

/** This renders either a color vector (row or column) or a color grid */
export function ColorSwatches({
  direction = 'row',
  group,
  themeId,
  variant,
  ...props
}: ColorSwatchesProps): React.ReactElement | null {
  const themeProps = themes[themeId];

  const mapColors = (root: string, shade: string | undefined, props?: Omit<Color, 'id' | 'color'>): Color => {
    const id = `${root}${shade ? `-${shade}` : ''}`;
    return {
      id,
      color: themeProps[id as keyof ThemeColors] as string,
      contrast:
        themeProps[`${id}-contrast` as keyof ThemeColors] || themeProps[`${root}-contrast` as keyof ThemeColors],
      ...props,
    };
  };

  switch (group) {
    case 'state':
      const colors = ['L10', undefined, 'D10'].map(shade => mapColors(`color-${variant}`, shade));
      return <ColorSwatchVector colors={colors} direction={direction} {...props} />;

    case 'background': {
      const colors = getBackgroundColors(themeId!);
      const formattedColors = Object.keys(colors).map(key => ({
        id: key,
        color: colors[key],
        contrast: themeProps['color-FG0' as keyof ThemeColors] as string,
        children: key.replace('color-', ''),
      }));
      return <ColorSwatchVector colors={formattedColors} direction={direction} {...props} />;
    }

    case 'foreground': {
      const colors = getForegroundColors(themeId!);
      const formattedColors = Object.keys(colors).map(key => ({
        id: key,
        color: colors[key],
        contrast: themeProps['color-BG0' as keyof ThemeColors] as string,
        children: key.replace('color-', ''),
      }));
      return <ColorSwatchVector colors={formattedColors} direction={direction} {...props} />;
    }

    case 'primary': {
      const colorGrid = Object.keys(getPrimaryColors(themeId))
        .sort((a, b) => +a.replace(/[^\d]/g, '') - +b.replace(/[^\d]/g, ''))
        .map((root: string) => ({
          colors: ['L40', 'L30', 'L20', 'L10', undefined, 'D10', 'D20', 'D30', 'D40'].map(shade =>
            mapColors(root, shade, shade ? { children: shade } : undefined),
          ),
          label: root.replace('color-', ''),
          id: root,
        }));
      return <ColorSwatchGrid colorGrid={colorGrid} direction={direction} {...props} />;
    }

    case 'transparent': {
      const colorGrid = ['accent-primary', 'FG0', 'BG50', 'BG0'].map(variant => {
        const colors = getTransparentColorsByRoot(themeId, variant!);
        return {
          colors: Object.keys(colors).map(key => ({
            id: key,
            color: colors[key],
            children: key.split('-').slice(-1)[0],
          })),
          id: variant,
        };
      });
      return <ColorSwatchGrid colorGrid={colorGrid} direction={direction} {...props} />;
    }

    default:
      return null;
  }
}

ColorSwatches.displayName = 'ColorSwatches';
