import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Link.module.css';

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement>, ThemeProps {
  block?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  underline?: boolean;
  unstyled?: boolean;
}

export function Link({
  block,
  children,
  className,
  contrast,
  href,
  themeId: initThemeId,
  target,
  underline,
  unstyled,
  unthemed,
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
