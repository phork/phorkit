import { cx } from '@emotion/css';
import React, { useContext } from 'react';
import { ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility';
import { useComponentId } from '../../hooks/useComponentId';
import { useThemeId } from '../../hooks/useThemeId';
import {
  InteractiveGroupContext,
  InteractiveGroupContextValue,
} from '../../components/InteractiveGroup/InteractiveGroupContext';
import { TabPanel, TabPanelProps } from './TabPanel';
import styles from './styles/TabPanelGroup.module.css';
import { TabsVariant } from './types';

export interface TabPanelGroupProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  className?: string;
  componentId?: string;
  focused?: boolean;
  items: Array<{
    id: string;
    content: React.ReactNode;
    contentProps?: Omit<TabPanelProps, 'children' | 'id' | 'selected'>;
  }>;
  style?: React.CSSProperties;
  unstyled?: boolean;
  variant?: TabsVariant;
  vertical?: boolean;
}

export function TabPanelGroup({
  className,
  componentId,
  contrast,
  focused,
  items,
  style,
  themeId: initThemeId,
  unstyled,
  unthemed,
  variant: initVariant = 'primary',
  vertical,
  ...props
}: TabPanelGroupProps): React.ReactElement<TabPanelGroupProps, 'div'> {
  const accessible = useAccessibility();
  const { generateComponentId } = useComponentId(componentId);
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  const { selectedIds } = useContext<InteractiveGroupContextValue<string, HTMLDivElement, HTMLDivElement>>(
    InteractiveGroupContext,
  );

  // because the interactive group always uses an array for selected ids
  const selectedId = selectedIds?.[0];

  return (
    <div
      className={
        unstyled
          ? className
          : cx(
              styles.tabPanelGroup,
              themeId && !unthemed && styles[`tabPanelGroup--${themeId}`],
              variant && styles[`tabPanelGroup--${variant}`],
              styles[`tabPanelGroup--${vertical ? 'vertical' : 'horizontal'}`],
              focused && styles['is-focused'],
              accessible && styles['is-accessible'],
              className,
            )
      }
      style={style}
      {...props}
    >
      {items &&
        items.map(({ id, content, contentProps = {} }) => {
          return (
            <TabPanel
              aria-labelledby={generateComponentId(id)}
              id={generateComponentId(id, 'panel')}
              key={id}
              selected={selectedId === id}
              {...contentProps}
            >
              {content}
            </TabPanel>
          );
        })}
    </div>
  );
}

TabPanelGroup.displayName = 'TabPanelGroup';
