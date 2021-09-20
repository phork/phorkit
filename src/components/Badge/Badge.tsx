import { cx } from '@emotion/css';
import React from 'react';
import { CornerPosition, MergeElementPropsWithoutRef, SemanticColor, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/Badge.module.css';

export type BadgeShape = 'marker' | 'point' | 'count' | 'label';

export interface LocalBadgeProps extends ThemeProps {
  children?: React.ReactNode;
  className?: string;
  color?: SemanticColor;
  outlined?: boolean;
  position?: CornerPosition;
  pulsing?: boolean;
  shape: BadgeShape;
  style?: React.CSSProperties;
}

export type BadgeProps = MergeElementPropsWithoutRef<'div', LocalBadgeProps>;

export function Badge({
  children,
  className,
  color: initColor,
  contrast = false,
  outlined = false,
  position,
  pulsing = false,
  shape,
  themeId: initThemeId,
  unthemed = false,
  ...props
}: BadgeProps): React.ReactElement<BadgeProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;
  const hasChildren = ['count', 'label'].includes(shape);

  return (
    <div
      className={cx(
        styles.badge,
        position && styles[`badge--${lowerCamelize(position)}`],
        styles[`badge--${shape}`],
        themeId && !unthemed && styles[`badge--${themeId}`],
        color && styles[`badge--${color}`],
        outlined && styles['badge--outlined'],
        pulsing && styles['badge--pulsing'],
        className,
      )}
      {...props}
    >
      {hasChildren && <div className={styles.badge__content}>{children}</div>}
    </div>
  );
}

Badge.displayName = 'Badge';
