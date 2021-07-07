import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  bordered?: boolean;
  children: React.ReactNode;
  className?: string;
  full?: boolean;
  hoverable?: boolean;
  magnify?: boolean;
  raised?: boolean | 0 | 10 | 20 | 100 | 200;
  squared?: boolean;
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
          raised === true && styles['card--raised-0'],
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
