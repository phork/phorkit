import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, MergeElementPropsWithoutRef, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Link.module.css';

export type LinkContainerElementType = keyof JSX.IntrinsicElements;

export interface LocalLinkContainerProps extends ThemeProps {
  children: React.ReactNode;
  className?: string;
  target?: string;
  underline?: boolean;
}

export type LinkContainerProps<T extends LinkContainerElementType = 'div'> = AsReactType<T> &
  MergeElementPropsWithoutRef<T, LocalLinkContainerProps>;

export function LinkContainer<T extends LinkContainerElementType = 'div'>({
  as,
  children,
  className: initClassName,
  contrast,
  themeId: initThemeId,
  underline,
  unthemed,
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