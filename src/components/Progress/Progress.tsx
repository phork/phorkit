import { cx } from '@emotion/css';
import React from 'react';
import { SemanticColor, ThemeProps } from '../../types';
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
}

export function Progress({
  animated,
  children,
  className,
  contrast,
  data,
  floating,
  quiet,
  pill,
  percent = 0,
  size = 'medium',
  spaced,
  themeId: initThemeId,
  color,
  ...props
}: ProgressProps): React.ReactElement<ProgressProps, 'div'> {
  const themeId = useThemeId(initThemeId);

  const renderSegment = ({ percent, color }: ProgressSegment, i: number): React.ReactElement<HTMLDivElement> => {
    const withSpace = spaced && data && i < data.length - 1;
    return (
      <div
        key={color}
        className={cx(
          styles.progressSegment,
          animated && styles['progressSegment--animated'],
          color && styles[`progressSegment--${color}`],
          contrast && styles['progressSegment--contrast'],
          themeId && styles[`progressSegment--${themeId}`],
        )}
        style={{
          marginRight: withSpace ? '1px' : undefined,
          width: withSpace ? `calc(${percent}% - 1px)` : `${percent}%`,
        }}
      />
    );
  };

  return (
    <div
      className={cx(
        styles.progress,
        contrast && styles['progress--contrast'],
        floating && styles['progress--floating'],
        pill && styles['progress--pill'],
        quiet && styles['progress--quiet'],
        size && styles[`progress--${size}`],
        themeId && styles[`progress--${themeId}`],
        color && styles[`progress--${color}`],
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
