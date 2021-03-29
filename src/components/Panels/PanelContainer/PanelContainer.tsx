import { cx } from '@emotion/css';
import React from 'react';
import { Orientation } from '../../../types';
import styles from './styles/PanelContainer.module.css';

export interface PanelContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  absolute?: boolean;
  children: React.ReactNode;
  className?: string;
  full?: boolean;
  orientation: Orientation;
  reverse?: boolean;
  viewport?: boolean;
}

export function PanelContainer({
  absolute,
  children,
  className,
  full,
  orientation,
  reverse,
  viewport,
  ...props
}: PanelContainerProps): React.ReactElement<PanelContainerProps, 'div'> {
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
