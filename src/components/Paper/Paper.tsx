import { cx } from '@emotion/css';
import React from 'react';
import { AccentColor, SequentialVariant, StateColor, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Paper.module.css';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  bordered?: boolean;
  children: React.ReactNode;
  className?: string;
  color?: StateColor | SequentialVariant | AccentColor | 'contrast' | 'transparent' | 'extreme';
  /** Whether the paper is contained within a relative element and should fill it */
  contained?: boolean;
  container?: 'page' | 'panel' | 'popover' | 'banner';
  flexible?: boolean;
  full?: boolean;
  scrollable?: boolean;
  scrollbar?: 'xs' | 's';
}

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  (
    {
      bordered,
      children,
      className,
      color,
      contained,
      container,
      flexible,
      full,
      scrollable,
      scrollbar,
      themeId: initThemeId,
      unthemed,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<PaperProps, 'div'> => {
    const themeId = useThemeId(initThemeId);

    return (
      <div
        className={cx(
          styles.paper,
          bordered && styles['paper--bordered'],
          color && styles[`paper--${color}`],
          contained && styles['paper--contained'],
          container && styles[`paper--${container}`],
          flexible && styles['paper--flexible'],
          full && styles['paper--full'],
          scrollable && styles['paper--scrollable'],
          scrollbar && styles[`paper--${scrollbar}-scrollbar`],
          themeId && !unthemed && styles[`paper--${themeId}`],
          className,
        )}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Paper.displayName = 'Paper';
