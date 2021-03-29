import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/StackPanel.module.css';

export interface PermanentStackPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
  height?: number;
  position: 'top' | 'bottom';
  style?: React.CSSProperties;
}

export const PermanentStackPanel = React.forwardRef<HTMLDivElement, PermanentStackPanelProps>(
  (
    { children, className, fixed, height, position, style: initStyle, ...props },
    forwardedRef,
  ): React.ReactElement<PermanentStackPanelProps, 'div'> => {
    const classes = cx(
      styles.sidePanel,
      fixed && styles['sidePanel--fixed'],
      styles[`sidePanel--${position}`],
      className,
    );

    const style = { ...initStyle };
    height && (style.height = `${height}px`);

    return (
      <div className={classes} ref={forwardedRef} style={style} {...props}>
        {children}
      </div>
    );
  },
);
