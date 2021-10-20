import { cx } from '@emotion/css';
import React from 'react';
import { SemanticColor, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Shade.module.css';

export type ShadeProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<ThemeProps, 'contrast'> & {
    actionable?: boolean;
    /** Manually apply the active styles; this does not affect :active */
    active?: boolean;
    children: React.ReactNode;
    color: SemanticColor;
    /** Manually apply the focus styles; this does not affect :focus */
    focused?: boolean;
    /** Manually apply the hover styles; this does not affect :hover */
    hovered?: boolean;
    unthemed?: boolean;
  };

export function Shade({
  actionable,
  active,
  children,
  color,
  focused,
  hovered,
  themeId: initThemeId,
  unthemed,
  ...props
}: ShadeProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(
        styles.shade,
        actionable && styles['shade--actionable'],
        active && styles['is-active'],
        focused && styles['is-focused'],
        hovered && styles['is-hovered'],
        color && !unthemed && styles[`shade--${color}`],
        themeId && !unthemed && styles[`shade--${themeId}`],
      )}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={actionable ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

Shade.displayName = 'Shade';
