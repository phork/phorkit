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
  accentColor: string;
}>`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  color: ${props => props.color};
  display: flex;
  flex-direction: column;
  padding: 80px 40px 40px;
  line-height: 1.5;
  max-width: 670px;
  position: relative;
  width: 100%;

  &:before {
    background-color: ${props => props.quietBorderColor};
    top: 40px;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  &:after {
    background-color: ${props => props.borderColor};
    top: 20px;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
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

  > .accent {
    color: ${props => props.accentColor};
  }
`;

export interface ColorThemeProps {
  themeId: Theme;
  variant: 'primary' | 'secondary' | 'tertiary' | 'contrast';
}

export function ColorTheme({ themeId, variant }: ColorThemeProps): React.ReactElement {
  const themeProps = themes[themeId];

  return (
    <ThemeElement
      color={themeProps[`${variant}-palette-text-color` as keyof ThemeColors] as string}
      backgroundColor={themeProps[`${variant}-palette-background-color` as keyof ThemeColors] as string}
      borderColor={themeProps[`${variant}-palette-border-color` as keyof ThemeColors] as string}
      quietBorderColor={themeProps[`${variant}-palette-quiet-border-color` as keyof ThemeColors] as string}
      quietColor={themeProps[`${variant}-palette-quiet-color` as keyof ThemeColors] as string}
      quieterColor={themeProps[`${variant}-palette-quieter-color` as keyof ThemeColors] as string}
      quietestColor={themeProps[`${variant}-palette-quietest-color` as keyof ThemeColors] as string}
      accentColor={themeProps[`${variant}-palette-accent-color` as keyof ThemeColors] as string}
    >
      <div>The quick brown fox jumped over the lazy dog</div>
      <div className="quiet">The quiet quick brown fox jumped over the lazy dog</div>
      <div className="quieter">The quieter quick brown fox jumped over the lazy dog</div>
      <div className="quietest">The quietest quick brown fox jumped over the lazy dog</div>
      <div className="accent">The accented quick brown fox jumped over the lazy dog</div>
    </ThemeElement>
  );
}

ColorTheme.displayName = 'ColorTheme';
