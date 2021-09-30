import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import styles from './styles/Banner.module.css';

export interface BannerContainerProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The banner container wraps a collection of Banner
 * components and adds a border between banners of
 * the same color.
 */
export function BannerContainer({
  children,
  className,
  themeId,
  ...props
}: BannerContainerProps): React.ReactElement<BannerContainerProps> {
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
