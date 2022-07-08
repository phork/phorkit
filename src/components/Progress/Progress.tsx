import { cx } from '@emotion/css';
import React from 'react';
import { MergeProps, Orientation, SemanticColor, ThemeProps, Volume } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Progress.module.css';

export type ProgressSegment = {
  percent: number;
  color: SemanticColor;
};

type ProgressSegmentProps = {
  percent?: never;
  data?: readonly ProgressSegment[];
};

type ProgressPercentProps = {
  percent?: number;
  data?: never;
};

export type ProgressProps = MergeProps<
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
  ThemeProps & {
    animated?: boolean;
    className?: string;
    color?: SemanticColor;
    /** A floating progress bar doesn't show the empty segment */
    floating?: boolean;
    orientation?: Orientation;
    /** Whether the edges of the bar and the segments should be rounded */
    rounded?: boolean;
    size?: 'small' | 'medium' | 'large';
    /** To separate the segments in a multi-segment progress bar */
    spaced?: boolean;
    style?: React.CSSProperties;
    volume?: Volume;
  } & (ProgressPercentProps | ProgressSegmentProps)
>;

/**
 * A progress bar has one or more segments that fill
 * up a percentage of the bar to indicate the progress
 * of an event.
 */
export function Progress({
  animated = false,
  className,
  color,
  contrast = false,
  data,
  floating = false,
  orientation = 'horizontal',
  percent = 0,
  rounded = false,
  size = 'medium',
  spaced = false,
  themeId: initThemeId,
  unthemed = false,
  volume,
  ...props
}: ProgressProps): JSX.Element {
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

  // only add aria props for single-segment progress bars
  const ariaProps =
    data && data.length > 1
      ? undefined
      : {
          'aria-valuemax': 100,
          'aria-valuemin': 0,
          'aria-valuenow': percent,
          role: 'progressbar',
        };

  return (
    <div
      className={cx(
        styles.progress,
        styles[`progress--${orientation}`],
        contrast && styles['progress--contrast'],
        floating && styles['progress--floating'],
        rounded && styles['progress--rounded'],
        size && styles[`progress--${size}`],
        themeId && !unthemed && styles[`progress--${themeId}`],
        volume && styles[`progress--${volume}`],
        color && !unthemed && styles[`progress--${color}`],
        className,
      )}
      {...ariaProps}
      {...props}
    >
      {data ? data.map(renderSegment) : renderSegment({ percent, color: color || 'primary' }, 0)}
    </div>
  );
}

Progress.displayName = 'Progress';
