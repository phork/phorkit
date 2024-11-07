import { cx } from '@emotion/css';
import React from 'react';
import { SequentialVariant, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility/useAccessibility';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Footer.module.css';

export type FooterProps = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    bordered?: boolean | 'pseudo';
    children: NonNullable<React.ReactNode>;
    className?: string;
    full?: boolean;
    style?: React.CSSProperties;
    /** When used with the scrollable flag the footer will overflow horizontally instead of wrapping */
    nowrap?: boolean;
    scrollable?: boolean;
    scrollbar?: 'xsmall' | 'small' | 'medium';
    transparent?: boolean;
    variant?: SequentialVariant;
    volume?: 'quiet';
  };

/**
 * A footer is a flexible container with a colored
 * background and an optional border at the top. It
 * uses space-between to stretch the content.
 */
export function Footer({
  bordered = false,
  children,
  className,
  contrast = false,
  full = false,
  nowrap = false,
  scrollable = false,
  scrollbar = 'small',
  themeId: initThemeId,
  transparent = false,
  unthemed = false,
  variant: initVariant = 'primary',
  volume,
  ...props
}: FooterProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const accessible = useAccessibility();
  const variant = contrast ? 'contrast' : initVariant;

  const classes = cx(
    styles.footer,
    bordered && styles['footer--bordered'],
    bordered === 'pseudo' && styles['footer--bordered-pseudo'],
    full && styles['footer--full'],
    nowrap && styles['footer--nowrap'],
    scrollable && styles['footer--scrollable'],
    scrollbar && styles[`footer--${scrollbar}-scrollbar`],
    !unthemed && themeId && styles[`footer--${themeId}`],
    !unthemed && variant && styles[`footer--${variant}`],
    transparent && styles['footer--transparent'],
    volume && styles[`footer--${volume}`],
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

Footer.displayName = 'Footer';
