import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/StatusBubble.module.css';
import { StatusBubble, StatusBubbleProps } from './StatusBubble';

export type StatusBubbleIconShape = 'circle' | 'square';

export type IconStatusBubbleProps = Omit<StatusBubbleProps, 'anchor' | 'offset'> & {
  icon: React.ReactElement;
  iconShape?: StatusBubbleIconShape;
};

export function IconStatusBubble({ icon, iconShape = 'square', ...props }: IconStatusBubbleProps): JSX.Element {
  return (
    <StatusBubble
      anchor={<div className={cx(styles.statusBubbleIcon, styles[`statusBubbleIcon--${iconShape}`])}>{icon}</div>}
      {...props}
    />
  );
}

IconStatusBubble.displayName = 'IconStatusBubble';
