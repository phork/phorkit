import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/StatusBubble.module.css';
import { StatusBubble, StatusBubbleProps } from './StatusBubble';

export type StatusBubbleIconShape = 'circle' | 'square';

export type IconStatusBubbleProps = Omit<StatusBubbleProps, 'anchor'> & {
  icon: React.ReactElement;
  iconShape?: StatusBubbleIconShape;
};

/**
 * The icon status bubble extends the `StatusBubble`
 * component with an icon as its anchor. The icon
 * isn't limited to just SVG components and will
 * accept anything that fits in a 36x36 box.
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
