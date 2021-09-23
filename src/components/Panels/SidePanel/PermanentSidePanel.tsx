import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/SidePanel.module.css';

export interface PermanentSidePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fixed?: boolean;
  position: 'left' | 'right';
  /** Raise the panel above other elements by using a high z-index */
  raised?: boolean;
  style?: React.CSSProperties;
  width?: number;
  unit?: 'px' | 'percent';
}

export const PermanentSidePanel = React.forwardRef<HTMLDivElement, PermanentSidePanelProps>(
  (
    { children, className, fixed = false, position, raised, style: initStyle, unit: initUnit = 'px', width, ...props },
    forwardedRef,
  ): React.ReactElement<PermanentSidePanelProps> => {
    const classes = cx(
      styles.sidePanel,
      fixed && styles['sidePanel--fixed'],
      raised && styles['sidePanel--raised'],
      styles[`sidePanel--${position}`],
      className,
    );

    const style = { ...initStyle };

    const unit = initUnit === 'percent' ? '%' : initUnit;
    width && (style.width = `${width}${unit}`);

    return (
      <div className={classes} ref={forwardedRef} style={style} {...props}>
        {children}
      </div>
    );
  },
);

PermanentSidePanel.displayName = 'PermanentSidePanel';
