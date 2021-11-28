import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/MainPanel.module.css';

export type MainPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * The main panel is part of the panels system and
 * uses flexbox to expand to fill any remaining space
 * in the `PanelContainer`.
 */
export const MainPanel = React.forwardRef<HTMLDivElement, MainPanelProps>(
  ({ children, className, ...props }: MainPanelProps, forwardedRef): React.ReactElement<MainPanelProps> => {
    const classes = cx(styles.mainPanel, className);

    return (
      <div className={classes} ref={forwardedRef} {...props}>
        {children}
      </div>
    );
  },
);

MainPanel.displayName = 'MainPanel';
