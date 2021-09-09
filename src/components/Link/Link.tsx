import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Link.module.css';

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement>, ThemeProps {
  /** Display as a block level element rather than inline */
  block?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
  target?: string;
  underline?: boolean;
  unstyled?: boolean;
}

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
}: LinkProps): React.ReactElement<LinkProps, 'a'> {
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
