import { cx } from '@emotion/css';
import React from 'react';
import { Orientation, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useIsDeepFocused } from '../../context/DeepFocus/useIsDeepFocused';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Accordion.module.css';

export type AccordionContainerProps = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    children: NonNullable<React.ReactNode>;
    className?: string;
    orientation?: Orientation;
    style?: React.CSSProperties;
    variant?: 'primary' | 'colored' | 'transparent';
  };

/**
 * The accordion container wraps all the accordion items
 * and sets the direction of the items and the focused
 * state.
 */
export function AccordionContainer({
  children,
  className,
  contrast = false,
  orientation = 'vertical',
  style,
  themeId: initThemeId,
  variant: initVariant,
  ...props
}: AccordionContainerProps): JSX.Element {
  const accessible = useAccessibility();
  const focused = useIsDeepFocused();
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  return (
    <div
      className={cx(
        styles.accordion,
        themeId && styles[`accordion--${themeId}`],
        variant && styles[`accordion--${variant}`],
        accessible && styles['is-accessible'],
        focused && styles['is-focused'],
        styles[`accordion--${orientation}`],
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

AccordionContainer.displayName = 'AccordionContainer';
