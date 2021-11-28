import { cx } from '@emotion/css';
import React from 'react';
import { Orientation, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useThemeId } from '../../context/Theme';
import styles from './styles/TabsContainer.module.css';
import { TabsVariant } from './types';

export type TabsContainerProps = React.HTMLAttributes<HTMLDivElement> &
  ThemeProps & {
    children: React.ReactChild | React.ReactFragment;
    className?: string;
    focused?: boolean;
    orientation?: Orientation;
    style?: React.CSSProperties;
    unstyled?: boolean;
    variant?: TabsVariant;
  };

/**
 * The tabs container wraps the `TabList` and `TabPanelGroup`
 * components and sets the orientation and accessibility
 * styles.
 */
export function TabsContainer({
  children,
  className,
  contrast = false,
  focused = false,
  orientation = 'horizontal',
  style,
  themeId: initThemeId,
  unstyled = false,
  unthemed = false,
  variant: initVariant = 'primary',
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
              styles[`tabs--${orientation}`],
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
