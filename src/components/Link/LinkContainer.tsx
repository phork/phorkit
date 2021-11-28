import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementPropsWithoutRef, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Link.module.css';

export type LinkContainerElementType = keyof JSX.IntrinsicElements;

export type LocalLinkContainerProps = ThemeProps & {
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  underline?: boolean;
};

export type LinkContainerProps<T extends LinkContainerElementType = 'div'> = AsReactType<T> &
  MergeElementPropsWithoutRef<T, LocalLinkContainerProps>;

/**
 * A link container adds custom link styles to any
 * anchor tags within it.
 */
export function LinkContainer<T extends LinkContainerElementType = 'div'>({
  as,
  children,
  className: initClassName,
  contrast = false,
  themeId: initThemeId,
  underline = false,
  unthemed = false,
  ...props
}: LinkContainerProps<T>): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const className = cx(
    styles.linkContainer,
    contrast && styles['linkContainer--contrast'],
    themeId && !unthemed && styles[`linkContainer--${themeId}`],
    underline && styles['linkContainer--underline'],
    initClassName,
  );

  return React.createElement(as || 'div', { className, ...props }, children);
}

LinkContainer.displayName = 'LinkContainer';
