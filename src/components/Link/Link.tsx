import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Link.module.css';

export type LinkProps = React.HTMLAttributes<HTMLAnchorElement> &
  ThemeProps & {
    /** Display as a block level element rather than inline */
    block?: boolean;
    children: React.ReactChild | React.ReactFragment;
    className?: string;
    href?: string;
    rel?: string;
    style?: React.CSSProperties;
    target?: string;
    underline?: boolean;
    unstyled?: boolean;
  };

/**
 * A link is a styled anchor tag. It can be an inline or
 * a block element.
 */
export function Link({
  block = false,
  children,
  className,
  contrast = false,
  href,
  themeId: initThemeId,
  target,
  underline = false,
  unstyled = false,
  unthemed = false,
  ...props
}: LinkProps): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <a
      className={cx(
        styles.link,
        block && styles['link--block'],
        unstyled && styles['link--unstyled'],
        !unthemed && contrast && styles['link--contrast'],
        !unthemed && themeId && styles[`link--${themeId}`],
        underline && styles['link--underline'],
        className,
      )}
      href={href}
      target={target}
      {...props}
    >
      {children}
    </a>
  );
}

Link.displayName = 'Link';
