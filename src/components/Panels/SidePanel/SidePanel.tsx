import { cx } from '@emotion/css';
import React, { useRef } from 'react';
import { usePanelCollapser, UsePanelCollapserProps } from '../../../hooks/usePanelCollapser';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { easeInOutCubic } from '../../../utils/easings';
import styles from './styles/SidePanel.module.css';

export type SidePanelProps = Pick<
  UsePanelCollapserProps,
  'onCloseFinish' | 'onCloseStart' | 'onOpenFinish' | 'onOpenStart' | 'open'
> &
  Partial<Pick<UsePanelCollapserProps, 'easing' | 'unit' | 'transition'>> &
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactChild | React.ReactFragment;
    className?: string;
    /** The open and close animation duration */
    duration?: number;
    fixed?: boolean;
    position: 'left' | 'right';
    /** Raise the panel above other elements by using a high z-index */
    raised?: boolean;
    style?: React.CSSProperties;
    width: number;
  };

/**
 * A side panel lives alongside a `MainPanel` (and optionally
 * other side panels) in a `PanelContainer`. It can be opened
 * or closed immediately or with an animation.
 *
 * If a side panel is fixed it sits on top of the main panel.
 * If it's not fixed it forces the main panel to shrink.
 *
 * The open state should be stored outside of this component
 * and is updated by the `onOpenStart`, `onOpenFinish`,
 * `onCloseStart` and `onCloseFinish` callbacks.
 */
export const SidePanel = React.forwardRef<HTMLDivElement, SidePanelProps>(
  (
    {
      children,
      className,
      duration = 300,
      easing,
      fixed = false,
      onCloseFinish,
      onCloseStart,
      onOpenFinish,
      onOpenStart,
      open = false,
      position,
      raised,
      transition = 'shiftable',
      unit = 'px',
      width,
      ...props
    },
    forwardedRef,
  ): React.ReactElement<SidePanelProps> => {
    const ref = useRef<HTMLDivElement>(null);

    usePanelCollapser({
      duration,
      easing: easing || easeInOutCubic,
      position,
      onCloseFinish,
      onCloseStart,
      onOpenFinish,
      onOpenStart,
      open,
      ref,
      transition,
      unit,
      width,
    });

    const classes = cx(
      styles.sidePanel,
      fixed && styles['sidePanel--fixed'],
      raised && styles['sidePanel--raised'],
      styles[`sidePanel--${position}`],
      className,
    );

    const combineRefs = makeCombineRefs<HTMLDivElement>(ref, forwardedRef);

    return (
      <div className={classes} ref={combineRefs} {...props}>
        {children}
      </div>
    );
  },
);

SidePanel.displayName = 'SidePanel';
