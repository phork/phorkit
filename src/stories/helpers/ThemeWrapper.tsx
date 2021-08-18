import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { SequentialVariant, Theme } from 'types';
import { isValidRenderElement, renderFromProp, RenderFromPropElement } from 'utils/renderFromProp';
import { ThemeProvider } from '../../context/Theme/ThemeProvider';

const variables = require('../../postcss/vars/index');

type RenderFromPropProps = { themeId?: Theme };

interface CommonThemeWrapperProps {
  contrast?: boolean;
  style?: React.CSSProperties;
  variant?: SequentialVariant;
}

type ThemeWrapperPropsWithThemeId = {
  children: RenderFromPropElement<RenderFromPropProps>;
  withThemeId: true;
};

type ThemeWrapperPropsWithChildren = {
  children: React.ReactNode;
  withThemeId?: false;
};

export type ThemeWrapperProps = CommonThemeWrapperProps &
  (ThemeWrapperPropsWithThemeId | ThemeWrapperPropsWithChildren);

export function ThemeWrapper({
  children,
  contrast = false,
  style,
  variant: initVariant,
  withThemeId,
  ...props
}: ThemeWrapperProps): React.ReactElement {
  const themeId = useDarkMode() ? 'dark' : 'light';
  const variant = contrast ? 'contrast' : initVariant;
  const backgroundColor = variant ? variables[`${themeId}-${variant}-palette-background-color`] : 'transparent';
  const color = variant ? variables[`${themeId}-${variant}-palette-text-color`] : 'currentColor';

  const content = withThemeId
    ? (isValidRenderElement<RenderFromPropProps>(children) &&
        renderFromProp<RenderFromPropProps>(children, { themeId })) ||
      null
    : children;

  return (
    <ThemeProvider themeId={themeId}>
      <div
        style={
          {
            backgroundColor: contrast ? `var(--contrast-color, ${backgroundColor})` : backgroundColor,
            color,
            margin: '-30px -20px',
            padding: '30px 20px',
            borderRadius: '4px',
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {content}
      </div>
    </ThemeProvider>
  );
}

ThemeWrapper.displayName = 'ThemeWrapper';
