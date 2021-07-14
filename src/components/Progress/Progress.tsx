import { cx } from '@emotion/css';
import React from 'react';
import { Orientation, SemanticColor, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Progress.module.css';

export interface ProgressSegment {
  percent: number;
  color: SemanticColor;
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  animated?: boolean;
  children?: React.ReactNode;
  className?: string;
  color?: SemanticColor;
  data?: ProgressSegment[];
  floating?: boolean;
  percent?: number;
  pill?: boolean;
  quiet?: boolean;
  size?: 'small' | 'medium' | 'large';
  spaced?: boolean;
  orientation?: Orientation;
}

export function Progress({
  animated = false,
  children,
  className,
  color,
  contrast = false,
  data,
  floating = false,
  orientation = 'horizontal',
  percent = 0,
  pill = false,
  quiet = false,
  size = 'medium',
  spaced = false,
  themeId: initThemeId,
  unthemed = false,
  ...props
}: ProgressProps): React.ReactElement<ProgressProps, 'div'> {
  const themeId = useThemeId(initThemeId);

  const renderSegment = ({ percent, color }: ProgressSegment, i: number): React.ReactElement<HTMLDivElement> => {
    const withSpace = spaced && data && i < data.length - 1;
    return (
      <div
        className={cx(
          styles.progressSegment,
          styles[`progressSegment--${orientation}`],
          animated && styles['progressSegment--animated'],
          themeId && !unthemed && styles[`progressSegment--${themeId}`],
          color && !unthemed && styles[`progressSegment--${color}`],
          contrast && styles['progressSegment--contrast'],
        )}
        key={color}
        style={{
          [orientation === 'vertical' ? 'marginBottom' : 'marginRight']: withSpace ? '1px' : undefined,
          [orientation === 'vertical' ? 'height' : 'width']: withSpace ? `calc(${percent}% - 1px)` : `${percent}%`,
        }}
      />
    );
  };

  return (
    <div
      className={cx(
        styles.progress,
        styles[`progress--${orientation}`],
        contrast && styles['progress--contrast'],
        floating && styles['progress--floating'],
        pill && styles['progress--pill'],
        quiet && styles['progress--quiet'],
        size && styles[`progress--${size}`],
        themeId && !unthemed && styles[`progress--${themeId}`],
        color && !unthemed && styles[`progress--${color}`],
        className,
      )}
      {...props}
    >
      {data ? data.map(renderSegment) : renderSegment({ percent, color: color || 'primary' }, 0)}
      {children}
    </div>
  );
}

Progress.displayName = 'Progress';
