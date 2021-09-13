import { Canvas as BaseCanvas } from '@storybook/addon-docs';
import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { themes } from 'config/themes';
import { ErrorBoundary } from 'components/ErrorBoundary';

type CanvasProps = React.ComponentProps<typeof BaseCanvas> & {
  contrast?: boolean;
  style?: React.CSSProperties;
};

export const Canvas = ({ contrast, style, ...props }: CanvasProps) => {
  const dark = useDarkMode();
  const backgroundColor =
    (contrast && `var(--contrast-color, ${themes[dark ? 'dark' : 'light']['contrast-palette-background-color']})`) ||
    undefined;
  const color = (contrast && themes[dark ? 'dark' : 'light']['contrast-palette-background-color']) || undefined;

  // @ts-ignore [TODO:ts] custom styles work but they aren't in the canvas props
  const content = <BaseCanvas style={{ backgroundColor, color, ...style }} {...props} />;

  return <ErrorBoundary variant="default">{content}</ErrorBoundary>;
};
