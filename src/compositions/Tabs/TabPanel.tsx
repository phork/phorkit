import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/TabPanel.module.css';

export interface TabPanelProps {
  children: React.ReactNode;
  flush?: boolean;
  id: string;
  selected?: boolean;
  vertical?: boolean;
}

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
