import { cx } from '@emotion/css';
import { Canvas as BaseCanvas } from '@storybook/addon-docs';
import React from 'react';
import { ErrorBoundary } from 'components/ErrorBoundary';

type CanvasProps = React.ComponentProps<typeof BaseCanvas> & {
  contrast?: boolean;
  style?: React.CSSProperties;
};

// this adds custom classes that are used with styles from preview-body.html
export const Canvas = ({ className, contrast, ...props }: CanvasProps) => {
  return (
    <ErrorBoundary variant="default">
      <BaseCanvas className={cx(className, contrast && 'sbdocs-preview-contrast')} {...props} />
    </ErrorBoundary>
  );
};
