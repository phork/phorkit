import { cx } from '@emotion/css';
import React from 'react';
import { SequentialVariant, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility/useAccessibility';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Header.module.css';

export type HeaderProps = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    bordered?: boolean | 'pseudo';
    children: NonNullable<React.ReactNode>;
    className?: string;
    full?: boolean;
    /** When used with the scrollable flag the header will overflow horizontally instead of wrapping */
    nowrap?: boolean;
    scrollable?: boolean;
    scrollbar?: 'xsmall' | 'small' | 'medium';
    style?: React.CSSProperties;
    transparent?: boolean;
    variant?: SequentialVariant;
    volume?: 'quiet';
  };

/**
 * A header is a flexible container with a colored
 * background and an optional border at the bottom.
 * It uses space-between to stretch the content.
 */
export function Header({
  bordered = false,
  children,
  className,
  contrast = false,
  full = false,
  nowrap = false,
  scrollable = false,
  scrollbar = 'small',
  themeId: initThemeId,
  transparent,
  unthemed = false,
  variant: initVariant = 'primary',
  volume,
  ...props
}: HeaderProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const accessible = useAccessibility();
  const variant = contrast ? 'contrast' : initVariant;

  const classes = cx(
    styles.header,
    bordered && styles['header--bordered'],
    bordered === 'pseudo' && styles['header--bordered-pseudo'],
    full && styles['header--full'],
    nowrap && styles['header--nowrap'],
    scrollable && styles['header--scrollable'],
    scrollbar && styles[`header--${scrollbar}-scrollbar`],
    !unthemed && themeId && styles[`header--${themeId}`],
    !unthemed && variant && styles[`header--${variant}`],
    transparent && styles['header--transparent'],
    volume && styles[`header--${volume}`],
    accessible && styles['is-accessible'],
    className,
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={classes} tabIndex={scrollable ? 0 : undefined} {...props}>
      {children}
    </div>
  );
}

Header.displayName = 'Header';
