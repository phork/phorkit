import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { SequentialVariant, Theme } from 'types';
import { isValidRenderElement, renderFromProp, RenderFromPropElement } from 'utils/renderFromProp';
import { ThemeProvider } from '../../context/Theme/ThemeProvider';

type RenderFromPropProps = { themeId?: Theme };

interface CommonThemeWrapperProps {
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
  style,
  variant: initVariant,
  withThemeId,
  ...props
}: ThemeWrapperProps): React.ReactElement {
  const themeId = useDarkMode() ? 'dark' : 'light';

  const content = withThemeId
    ? (isValidRenderElement<RenderFromPropProps>(children) &&
        renderFromProp<RenderFromPropProps>(children, { themeId })) ||
      null
    : children;

  return (
    <ThemeProvider themeId={themeId}>
      <div style={style} {...props}>
        {content}
      </div>
    </ThemeProvider>
  );
}

ThemeWrapper.displayName = 'ThemeWrapper';
