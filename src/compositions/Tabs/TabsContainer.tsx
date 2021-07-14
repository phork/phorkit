import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../context/Theme';
import styles from './styles/TabsContainer.module.css';
import { TabsVariant } from './types';

export interface TabsContainerProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children: React.ReactNode;
  className?: string;
  focused?: boolean;
  style?: React.CSSProperties;
  unstyled?: boolean;
  variant?: TabsVariant;
  vertical?: boolean;
}

export function TabsContainer({
  children,
  className,
  contrast = false,
  focused = false,
  style,
  themeId: initThemeId,
  unstyled = false,
  unthemed = false,
  variant: initVariant = 'primary',
  vertical = false,
}: TabsContainerProps): React.ReactElement<HTMLDivElement> {
  const accessible = useAccessibility();
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  return (
    <div
      className={
        unstyled
          ? className
          : cx(
              styles.tabs,
              themeId && !unthemed && styles[`tabs--${themeId}`],
              variant && styles[`tabs--${variant}`],
              accessible && styles['is-accessible'],
              focused && styles['is-focused'],
              styles[`tabs--${vertical ? 'vertical' : 'horizontal'}`],
              className,
            )
      }
      style={style}
    >
      {children}
    </div>
  );
}

TabsContainer.displayName = 'TabsContainer';
