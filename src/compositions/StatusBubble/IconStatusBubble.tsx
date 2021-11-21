import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/StatusBubble.module.css';
import { StatusBubble, StatusBubbleProps } from './StatusBubble';

export type StatusBubbleIconShape = 'circle' | 'square';

export type IconStatusBubbleProps = Omit<StatusBubbleProps, 'anchor' | 'offset'> & {
  icon: React.ReactElement;
  iconShape?: StatusBubbleIconShape;
};

/**
 * The icon status bubble is a status bubble that
 * uses an icon as its marker. The icon isn't limited
 * to just SVG components and can also be something
 * like an avatar.
 *
 * This uses the `Shade` and `TooltipContent`
 * components.
 */
export function IconStatusBubble({ icon, iconShape = 'square', ...props }: IconStatusBubbleProps): JSX.Element {
  return (
    <StatusBubble
      anchor={<div className={cx(styles.statusBubbleIcon, styles[`statusBubbleIcon--${iconShape}`])}>{icon}</div>}
      {...props}
    />
  );
}

IconStatusBubble.displayName = 'IconStatusBubble';
