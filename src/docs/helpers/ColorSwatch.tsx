import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { Theme } from 'types';
import { ThemeColors, themes } from 'config/themes';
import { BlobbrIcon } from 'icons/internal/BlobbrIcon';

const Swatch = styled.div<{ backgroundColor: string; spaced?: boolean; width: number }>`
  align-items: center;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: inline-flex;
  flex-direction: column;
  height: 120px;
  justify-content: ${props => (props.spaced ? 'space-between' : 'center')};
  position: relative;
  width: ${props => `${props.width}px`};
`;

const SwatchOffset = styled.div<{ backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  height: 20px;
  position: relative;
  width: 100%;
`;

const patterns = {
  neutral: /^color-(BG|FG)([0-9]+)$/,
  primary: /^color-(P)([0-9]+)$/,
  state: /^color-(accent-primary|success|warning|danger|neutral)-?(.*)(?<!contrast)(?<!O[0-9]+)$/,
  transparent: /^color-(.+)-O([0-9]+)$/,
};

export interface ColorSwatchProps {
  group: 'primary' | 'neutral' | 'state' | 'transparent';
  variant: string;
  themeId: Theme;
}

export function ColorSwatch({ group, themeId, variant }: ColorSwatchProps): Array<React.ReactElement | null> {
  const themeProps = themes[themeId];
  const colors = useMemo(
    () =>
      Object.keys(themeProps).reduce((acc, prop: string) => {
        const color = themeProps[prop as keyof ThemeColors] as string;
        const matches = prop.match(patterns[group]);

        if (matches && matches[1] === variant) {
          const id = matches[2] || matches[1];
          acc.push({ id, color });
        }

        return acc;
      }, [] as { id: string; color: string }[]),
    [group, themeProps, variant],
  );

  if (group === 'state') {
    return ['L10', variant, 'D10']
      .map(id => {
        const { color } = colors.find(color => color.id === id) || {};
        return color ? (
          <Swatch
            backgroundColor={color}
            color={themeProps[`color-${variant}-contrast` as keyof ThemeColors] as string}
            key={color}
            title={`[color-${variant}${id !== variant ? `-${id}` : ''}] ${color}`}
            width={120}
          >
            <BlobbrIcon size={80} />
          </Swatch>
        ) : null;
      })
      .filter(Boolean);
  }

  return (
    colors &&
    colors.map(item => {
      const { id, color } = item;

      if (group === 'primary') {
        const L10 = themeProps[`color-${variant}${id}-L10` as keyof ThemeColors] as string;
        const D10 = themeProps[`color-${variant}${id}-D10` as keyof ThemeColors] as string;
        const contrast = themeProps[`color-${variant}${id}-contrast` as keyof ThemeColors] as string;

        return (
          <Swatch
            backgroundColor={color}
            color={contrast}
            key={color}
            spaced
            title={`[color-${variant}${id}] ${color}`}
            width={40}
          >
            {L10 && <SwatchOffset backgroundColor={L10} title={`[color-${variant}${id}-L10] ${L10}`} />}
            <BlobbrIcon scale="xlarge" />
            {D10 && <SwatchOffset backgroundColor={D10} title={`[color-${variant}${id}-D10] ${D10}`} />}
          </Swatch>
        );
      }

      return (
        <Swatch
          width={40}
          key={color}
          backgroundColor={color}
          title={`[color-${variant}${id && (group === 'transparent' ? `-O${id}` : id)}] ${color}`}
        />
      );
    })
  );
}
