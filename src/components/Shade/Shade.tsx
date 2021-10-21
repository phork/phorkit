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
    className?: string;
    color: SemanticColor;
    /** Manually apply the focus styles; this does not affect :focus */
    focused?: boolean;
    /** Manually apply the hover styles; this does not affect :hover */
    hovered?: boolean;
    /** Use a flattened background color rather than a semi-transparent pseudo-element */
    opaque?: boolean;
    unthemed?: boolean;
  };

export function Shade({
  actionable,
  active,
  children,
  className,
  color,
  focused,
  hovered,
  opaque,
  themeId: initThemeId,
  unthemed,
  ...props
}: ShadeProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(
        styles.shade,
        active && styles['is-active'],
        focused && styles['is-focused'],
        hovered && styles['is-hovered'],
        actionable && styles['shade--actionable'],
        styles[`shade--${opaque ? 'opaque' : 'transparent'}`],
        color && !unthemed && styles[`shade--${color}`],
        themeId && !unthemed && styles[`shade--${themeId}`],
        className,
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
