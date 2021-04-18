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
  transparent?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      bordered,
      children,
      className,
      full,
      hoverable,
      magnify,
      raised,
      squared,
      themeId: initThemeId,
      transparent,
      unthemed,
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
          (!!raised || raised === 0) && styles['card--raised'],
          Number.isInteger(raised) && styles[`card--raised-${raised}`],
          squared && styles[`card--squared`],
          magnify && styles['card--magnify'],
          full && styles[`card--full`],
          themeId && !unthemed && styles[`card--${themeId}`],
          transparent && styles['card--transparent'],
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
