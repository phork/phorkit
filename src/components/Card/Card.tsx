import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, Omit<ThemeProps, 'contrast'> {
  bordered?: boolean;
  children: React.ReactNode;
  className?: string;
  full?: boolean;
  hoverable?: boolean;
  magnify?: boolean;
  raised?: boolean | 10 | 20 | 30 | 40 | 100;
  squared?: boolean;
  style?: React.CSSProperties;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      bordered = false,
      children,
      className,
      full = false,
      hoverable = false,
      magnify = false,
      raised = false,
      squared = false,
      themeId: initThemeId,
      unthemed = false,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<CardProps, 'div'> => {
    const themeId = useThemeId(initThemeId);

    return (
      <div
        className={cx(
          styles.card,
          bordered && styles[`card--bordered`],
          hoverable && styles['card--hoverable'],
          raised === true && styles['card--raised-10'],
          Number.isInteger(raised) && styles[`card--raised-${raised}`],
          squared && styles[`card--squared`],
          magnify && styles['card--magnify'],
          full && styles[`card--full`],
          themeId && !unthemed && styles[`card--${themeId}`],
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

Card.displayName = 'Card';
