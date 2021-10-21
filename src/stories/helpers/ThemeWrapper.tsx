import React from 'react';
import { SequentialVariant, Theme } from 'types';
import { isValidRenderElement, renderFromProp, RenderFromPropElement } from 'utils/renderFromProp';
import { useThemeId } from '../../context/Theme/useThemeId';

type RenderFromPropProps = { themeId: Theme };

type ThemeWrapperProps = {
  children: RenderFromPropElement<RenderFromPropProps>;
  style?: React.CSSProperties;
  variant?: SequentialVariant;
};

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const themeId = useThemeId();

  return (
    (isValidRenderElement<RenderFromPropProps>(children) &&
      renderFromProp<RenderFromPropProps>(children, { themeId })) ||
    null
  );
}

ThemeWrapper.displayName = 'ThemeWrapper';
