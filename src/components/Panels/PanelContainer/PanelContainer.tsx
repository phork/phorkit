import { cx } from '@emotion/css';
import React from 'react';
import { Orientation } from '../../../types';
import styles from './styles/PanelContainer.module.css';

export type PanelContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Use absolute positioning and top,right,bottom,left of 0 to fill the parent */
  absolute?: boolean;
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  /** Set the width and height to 100% */
  full?: boolean;
  /** The orientation of the panels (vertical for columns, horizontal for rows) */
  orientation: Orientation;
  /** Change the flex-direction to reverse the children */
  reverse?: boolean;
  style?: React.CSSProperties;
  /** Set the max size to 100% of the viewport width and height */
  viewport?: boolean;
};

/**
 * The panel container wraps a `MainPanel` component and
 * one or more `SidePanel` components when the orientation
 * is vertical, or one or more `StackPanel` components
 * when the orientation is horizontal. It can be positioned
 * relatively, or absolutely to fill its parent container,
 * or it can be set to the size of the viewport.
 */
export function PanelContainer({
  absolute = false,
  children,
  className,
  full = false,
  orientation,
  reverse = false,
  viewport = false,
  ...props
}: PanelContainerProps): JSX.Element {
  const classes = cx(
    styles.panelContainer,
    absolute && styles['panelContainer--absolute'],
    full && styles['panelContainer--full'],
    reverse && styles['panelContainer--reverse'],
    viewport && styles['panelContainer--viewport'],
    styles[`panelContainer--${orientation}`],
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

PanelContainer.displayName = 'PanelContainer';
