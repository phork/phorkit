import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Accordion.module.css';

export interface AccordionContainerProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children: React.ReactNode;
  className?: string;
  focused?: boolean;
  horizontal?: boolean;
  style?: React.CSSProperties;
  variant?: 'primary' | 'colored' | 'transparent';
}

export function AccordionContainer({
  children,
  className,
  contrast,
  focused,
  horizontal,
  style,
  themeId: initThemeId,
  variant: initVariant,
}: AccordionContainerProps): React.ReactElement<AccordionContainerProps, 'div'> {
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
