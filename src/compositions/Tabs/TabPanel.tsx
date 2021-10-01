import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/TabPanel.module.css';

export type TabPanelProps = {
  children: React.ReactNode;
  /** Remove the padding from the tab panel */
  flush?: boolean;
  id: string;
  selected?: boolean;
  vertical?: boolean;
};

/**
 * The tab panel is the content associated with a
 * Tab component. When a tab is selected the tab
 * panel group content is shown.
 */
export function TabPanel({
  children,
  flush = false,
  id,
  selected = false,
  vertical = false,
  ...props
}: TabPanelProps): React.ReactElement<TabPanelProps> {
  return (
    <div
      className={cx(
        styles.tabPanel,
        flush && styles['tabPanel--flush'],
        styles[`tabPanel--${vertical ? 'vertical' : 'horizontal'}`],
        selected && styles['is-selected'],
      )}
      id={id}
      role="tabpanel"
      {...props}
    >
      {typeof children === 'function' ? children({ selected }) : children}
    </div>
  );
}

TabPanel.displayName = 'TabPanel';
