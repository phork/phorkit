import { cx } from '@emotion/css';
import React from 'react';
import { CornerPosition, MergeElementProps, SemanticColor, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/Badge.module.css';

export type BadgeShape = 'marker' | 'point' | 'count' | 'label';

export interface LocalBadgeProps extends ThemeProps {
  children?: React.ReactNode;
  className?: string;
  color?: SemanticColor;
  outlined?: boolean;
  position?: CornerPosition;
  shape?: BadgeShape;
}

export type BadgeProps = MergeElementProps<'div', LocalBadgeProps>;

export function Badge({
  children,
  className,
  color: initColor,
  contrast,
  outlined,
  position,
  shape,
  themeId: initThemeId,
  unthemed,
  ...props
}: BadgeProps): React.ReactElement<BadgeProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;

  return (
    <div
      className={cx(
        styles.badge,
        position && styles[`badge--${lowerCamelize(position)}`],
        styles[`badge--${shape}`],
        themeId && !unthemed && styles[`badge--${themeId}`],
        color && styles[`badge--${color}`],
        outlined && styles['badge--outlined'],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Badge.displayName = 'Badge';
