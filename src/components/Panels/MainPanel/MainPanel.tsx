import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/MainPanel.module.css';

export interface MainPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const MainPanel = React.forwardRef<HTMLDivElement, MainPanelProps>(
  ({ children, className, ...props }: MainPanelProps, forwardedRef): React.ReactElement<MainPanelProps, 'div'> => {
    const classes = cx(styles.mainPanel, className);

    return (
      <div className={classes} ref={forwardedRef} {...props}>
        {children}
      </div>
    );
  },
);

MainPanel.displayName = 'MainPanel';
