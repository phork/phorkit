import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/StackPanel.module.css';

export type PermanentStackPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  fixed?: boolean;
  flexible?: boolean;
  height?: number;
  position: 'top' | 'bottom';
  /** Raise the panel above other elements by using a high z-index */
  raised?: boolean;
  style?: React.CSSProperties;
  unit?: 'px' | 'percent';
};

/**
 * A permanent stack panel is similar to a StackPanel
 * but it can never be closed. It lives alongside a
 * MainPanel (and optionally other stack panels) in
 * a PanelContainer.
 *
 * If a stack panel is fixed it sits on top of the main
 * panel. If it's not fixed it forces the main panel
 * to shrink.
 */
export const PermanentStackPanel = React.forwardRef<HTMLDivElement, PermanentStackPanelProps>(
  (
    {
      children,
      className,
      fixed,
      flexible,
      height,
      position,
      raised,
      style: initStyle,
      unit: initUnit = 'px',
      ...props
    },
    forwardedRef,
  ): React.ReactElement<PermanentStackPanelProps> => {
    const classes = cx(
      styles.stackPanel,
      fixed && styles['stackPanel--fixed'],
      flexible && styles['stackPanel--flexible'],
      raised && styles['stackPanel--raised'],
      styles[`stackPanel--${position}`],
      className,
    );

    const style = { ...initStyle };

    const unit = initUnit === 'percent' ? '%' : initUnit;
    height && (style.height = `${height}${unit}`);

    return (
      <div className={classes} ref={forwardedRef} style={style} {...props}>
        {children}
      </div>
    );
  },
);

PermanentStackPanel.displayName = 'PermanentStackPanel';
