import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme/useThemeId';
import styles from './styles/Banner.module.css';

export type BannerContainerProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<ThemeProps, 'contrast' | 'unthemed'> & {
    children?: React.ReactChild | React.ReactFragment;
    className?: string;
    style?: React.CSSProperties;
  };

/**
 * The banner container wraps a collection of `Banner`
 * components and adds a border between banners of
 * the same color.
 */
export function BannerContainer({
  children,
  className,
  themeId: initThemeId,
  ...props
}: BannerContainerProps): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(styles.bannerContainer, themeId && styles[`bannerContainer--${themeId}`], className)}
      role="banner"
      {...props}
    >
      {children}
    </div>
  );
}

BannerContainer.displayName = 'BannerContainer';
