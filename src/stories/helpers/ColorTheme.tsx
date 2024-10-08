import styled from '@emotion/styled';
import React from 'react';
import { Theme } from 'types';
import { ThemeColors, themes } from 'config/themes';

const ThemeElement = styled.div<{
  backgroundColor: string;
  borderColor: string;
  quietBorderColor: string;
  quietColor: string;
  quieterColor: string;
  quietestColor: string;
}>`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  color: ${props => props.color};
  display: flex;
  flex-direction: column;
  padding: 40px 40px 60px;
  line-height: 1.5;
  max-width: 670px;
  position: relative;
  width: 100%;

  &:before {
    background-color: ${props => props.quietBorderColor};
    bottom: 24px;
    content: '';
    height: 1px;
    left: 40px;
    position: absolute;
    right: 40px;
  }

  &:after {
    background-color: ${props => props.borderColor};
    bottom: 36px;
    content: '';
    height: 1px;
    left: 40px;
    position: absolute;
    right: 40px;
  }

  > .quiet {
    color: ${props => props.quietColor};
  }

  > .quieter {
    color: ${props => props.quieterColor};
  }

  > .quietest {
    color: ${props => props.quietestColor};
  }
`;

export type ColorThemeProps = {
  themeId: Theme;
  variant: 'primary' | 'secondary' | 'tertiary' | 'contrast';
};

export function ColorTheme({ themeId, variant }: ColorThemeProps): JSX.Element {
  const themeProps = themes[themeId];

  return (
    <ThemeElement
      backgroundColor={themeProps[`${variant}-palette-background-color` as keyof ThemeColors] as string}
      borderColor={themeProps[`${variant}-palette-border-color` as keyof ThemeColors] as string}
      color={themeProps[`${variant}-palette-text-color` as keyof ThemeColors] as string}
      quietBorderColor={themeProps[`${variant}-palette-quiet-border-color` as keyof ThemeColors] as string}
      quietColor={themeProps[`${variant}-palette-quiet-color` as keyof ThemeColors] as string}
      quieterColor={themeProps[`${variant}-palette-quieter-color` as keyof ThemeColors] as string}
      quietestColor={themeProps[`${variant}-palette-quietest-color` as keyof ThemeColors] as string}
    >
      <div>The quick brown fox jumped over the lazy dog</div>
      <div className="quiet">The quiet quick brown fox jumped over the lazy dog</div>
      <div className="quieter">The quieter quick brown fox jumped over the lazy dog</div>
      <div className="quietest">The quietest quick brown fox jumped over the lazy dog</div>
    </ThemeElement>
  );
}

ColorTheme.displayName = 'ColorTheme';
