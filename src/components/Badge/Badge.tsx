import { cx } from '@emotion/css';
import React from 'react';
import { CornerPosition, MergeElementPropsWithoutRef, SemanticColor, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { lowerCamelize } from '../../utils/case';
import styles from './styles/Badge.module.css';

export type BadgeShape = 'marker' | 'point' | 'count' | 'label';

export type LocalBadgeProps = ThemeProps & {
  children?: React.ReactChild | React.ReactFragment | null;
  className?: string;
  color?: SemanticColor;
  /** Adds a 1px outline to the badge to make it stand out */
  outlined?: boolean;
  /** The badge's position relative to its parent */
  position?: CornerPosition;
  /** Shows the badge with a pulsing animation radiating from it */
  pulsing?: boolean;
  shape: BadgeShape;
  style?: React.CSSProperties;
};

export type BadgeProps = MergeElementPropsWithoutRef<'div', LocalBadgeProps>;

/**
 * A badge can either take the shape of a `point` (a small
 * dot), a `marker` (a larger dot), a `count` (a small circle
 * with a number in it), or a `label` (a small rectangle
 * with text in it).
 *
 * It has the option to be positioned relative to one of
 * the corners of its containing element.
 */
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
}: BadgeProps): JSX.Element {
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
