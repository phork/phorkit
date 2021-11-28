import { cx } from '@emotion/css';
import React from 'react';
import { Orientation } from '../../types';
import styles from './styles/TabPanel.module.css';

export type TabPanelStateProps = {
  selected?: boolean;
};

export type TabPanelProps = TabPanelStateProps & {
  children: React.ReactChild | React.ReactFragment;
  /** Remove the padding from the tab panel */
  flush?: boolean;
  id: string;
  orientation?: Orientation;
};

/**
 * A tab panel contains the content associated with a
 * `Tab` component. When a tab is selected the tab panel
 * content is shown.
 */
export function TabPanel({
  children,
  flush = false,
  id,
  orientation = 'horizontal',
  selected = false,
  ...props
}: TabPanelProps): JSX.Element {
  return (
    <div
      className={cx(
        styles.tabPanel,
        flush && styles['tabPanel--flush'],
        styles[`tabPanel--${orientation}`],
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
