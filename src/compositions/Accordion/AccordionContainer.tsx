import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../context/Theme';
import styles from './styles/Accordion.module.css';

export interface AccordionContainerProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children: React.ReactNode;
  className?: string;
  focused?: boolean;
  horizontal?: boolean;
  style?: React.CSSProperties;
  variant?: 'primary' | 'colored' | 'transparent';
}

/**
 * The accordion container wraps all the accordion items
 * and sets the direction of the items and the focused
 * state.
 */
export function AccordionContainer({
  children,
  className,
  contrast = false,
  focused = false,
  horizontal = false,
  style,
  themeId: initThemeId,
  variant: initVariant,
}: AccordionContainerProps): React.ReactElement<AccordionContainerProps> {
  const accessible = useAccessibility();
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
        styles[`accordion--${horizontal ? 'horizontal' : 'vertical'}`],
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

AccordionContainer.displayName = 'AccordionContainer';
