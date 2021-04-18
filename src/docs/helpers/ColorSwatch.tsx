import styled from '@emotion/styled';
import React from 'react';
import { Theme } from 'types';
import { ThemeColors, themes } from 'config/themes';
import { getBackgroundColors, getForegroundColors, getPrimaryColors, getTransparentColorsByRoot } from 'utils';
import { Color, ColorSwatchGroup, ColorSwatchGroupProps } from './ColorSwatchGroup';

const ColorGrid = styled('div')<{ direction: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
`;

export interface ColorSwatchProps extends Omit<ColorSwatchGroupProps, 'colors'> {
  group: 'primary' | 'state' | 'background' | 'foreground' | 'transparent';
  variant?: string;
  themeId: Theme;
}

const renderColorSwatches = (
  colors: Color[],
  props: Omit<ColorSwatchGroupProps, 'colors'>,
  key?: number | string,
): React.ReactElement => {
  return <ColorSwatchGroup key={key} colors={colors} {...props} />;
};

const renderColorGrid = (colorGrid: Color[][], props: Omit<ColorSwatchGroupProps, 'colors'>): React.ReactElement => {
  const direction = props.direction === 'column' ? 'row' : 'column';
  return (
    <ColorGrid direction={direction}>
      {colorGrid.map((colors: Color[], i) => renderColorSwatches(colors, props, i))}
    </ColorGrid>
  );
};

export function ColorSwatch({ group, themeId, variant, ...props }: ColorSwatchProps): React.ReactElement | null {
  const themeProps = themes[themeId];

  const mapColors = (root: string, shade: string | undefined, props?: Omit<Color, 'id' | 'color'>): Color => {
    const id = `${root}${shade ? `-${shade}` : ''}`;
    return {
      id,
      color: themeProps[id as keyof ThemeColors] as string,
      contrast: themeProps[`${root}-contrast` as keyof ThemeColors] as string,
      ...props,
    };
  };

  switch (group) {
    case 'state':
      return renderColorSwatches(
        ['L10', undefined, 'D10'].map(shade => mapColors(`color-${variant}`, shade)),
        props,
      );

    case 'primary': {
      const colors = getPrimaryColors(themeId);
      return renderColorGrid(
        Object.keys(colors).map((root: string) =>
          ['L40', 'L30', 'L20', 'L10', undefined, 'D10', 'D20', 'D30', 'D40'].map(shade =>
            mapColors(root, shade, !shade ? { height: 60 } : undefined),
          ),
        ),
        props,
      );
    }

    case 'transparent': {
      const colors = getTransparentColorsByRoot(themeId, variant!);
      return renderColorSwatches(
        Object.keys(colors).map(key => ({
          id: key,
          color: colors[key],
        })),
        props,
      );
    }

    case 'background': {
      const colors = getBackgroundColors(themeId!);
      return renderColorSwatches(
        Object.keys(colors).map(key => ({
          id: key,
          color: colors[key],
          contrast: themeProps['color-FG0' as keyof ThemeColors] as string,
        })),
        props,
      );
    }

    case 'foreground': {
      const colors = getForegroundColors(themeId!);
      return renderColorSwatches(
        Object.keys(colors).map(key => ({
          id: key,
          color: colors[key],
          contrast: themeProps['color-BG0' as keyof ThemeColors] as string,
        })),
        props,
      );
    }

    default:
      return null;
  }
}
