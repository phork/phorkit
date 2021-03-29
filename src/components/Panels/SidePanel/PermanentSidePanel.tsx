import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/SidePanel.module.css';

export interface PermanentSidePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
  position: 'left' | 'right';
  style?: React.CSSProperties;
  width?: number;
}

export const PermanentSidePanel = React.forwardRef<HTMLDivElement, PermanentSidePanelProps>(
  (
    { children, className, fixed, position, style: initStyle, width, ...props },
    forwardedRef,
  ): React.ReactElement<PermanentSidePanelProps, 'div'> => {
    const classes = cx(
      styles.sidePanel,
      fixed && styles['sidePanel--fixed'],
      styles[`sidePanel--${position}`],
      className,
    );

    const style = { ...initStyle };
    width && (style.width = `${width}px`);

    return (
      <div className={classes} ref={forwardedRef} style={style} {...props}>
        {children}
      </div>
    );
  },
);
