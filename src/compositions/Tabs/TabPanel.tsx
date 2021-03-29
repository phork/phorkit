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
  flush,
  id,
  selected,
  vertical,
  ...props
}: TabPanelProps): React.ReactElement<TabPanelProps, 'div'> {
  return (
    <div
      id={id}
      className={cx(
        styles.tabPanel,
        flush && styles['tabPanel--flush'],
        styles[`tabPanel--${vertical ? 'vertical' : 'horizontal'}`],
        selected && styles['is-selected'],
      )}
      role="tabpanel"
      {...props}
    >
      {typeof children === 'function' ? children({ selected }) : children}
    </div>
  );
}
