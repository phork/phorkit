import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/SidePanel.module.css';

export type PermanentSidePanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  fixed?: boolean;
  flexible?: boolean;
  position: 'left' | 'right';
  /** Raise the panel above other elements by using a high z-index */
  raised?: boolean;
  style?: React.CSSProperties;
  width?: number;
  unit?: 'px' | 'percent';
};

/**
 * A permanent side panel is similar to a `SidePanel`
 * but it can never be closed. It lives alongside a
 * `MainPanel` (and optionally other side panels) in
 * a `PanelContainer`.
 *
 * If a side panel is fixed it sits on top of the main
 * panel. If it's not fixed it forces the main panel
 * to shrink.
 */
export const PermanentSidePanel = React.forwardRef<HTMLDivElement, PermanentSidePanelProps>(
  (
    {
      children,
      className,
      fixed = false,
      flexible,
      position,
      raised,
      style: initStyle,
      unit: initUnit = 'px',
      width,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<PermanentSidePanelProps> => {
    const classes = cx(
      styles.sidePanel,
      fixed && styles['sidePanel--fixed'],
      flexible && styles['sidePanel--flexible'],
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
