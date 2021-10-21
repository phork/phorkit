import { Canvas as BaseCanvas } from '@storybook/addon-docs';
import React from 'react';
import { themes } from 'config/themes';
import { useThemeId } from 'context/Theme/useThemeId';
import { ErrorBoundary } from 'components/ErrorBoundary';

type CanvasProps = React.ComponentProps<typeof BaseCanvas> & {
  contrast?: boolean;
  style?: React.CSSProperties;
};

export const Canvas = ({ contrast, style, ...props }: CanvasProps) => {
  const themeId = useThemeId();
  const backgroundColor =
    (contrast && `var(--contrast-color, ${themes[themeId]['contrast-palette-background-color']})`) || undefined;
  const color = (contrast && themes[themeId]['contrast-palette-background-color']) || undefined;

  // @ts-ignore [TODO:ts] custom styles work but they aren't in the canvas props
  const content = <BaseCanvas style={{ backgroundColor, color, ...style }} {...props} />;

  return <ErrorBoundary variant="default">{content}</ErrorBoundary>;
};
