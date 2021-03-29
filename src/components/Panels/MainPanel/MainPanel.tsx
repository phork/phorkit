import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/MainPanel.module.css';

export interface MainPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function MainPanel({
  children,
  className,
  ...props
}: MainPanelProps): React.ReactElement<MainPanelProps, 'div'> {
  const classes = cx(styles.mainPanel, className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
