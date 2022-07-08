import { cx } from '@emotion/css';
import React, { useRef } from 'react';
import { usePanelCollapser, UsePanelCollapserProps } from '../../../hooks/usePanelCollapser';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { easeInOutCubic } from '../../../utils/easings';
import styles from './styles/StackPanel.module.css';

export type StackPanelProps = Pick<
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
    height: number;
    position: 'top' | 'bottom';
    /** Raise the panel above other elements by using a high z-index */
    raised?: boolean;
    style?: React.CSSProperties;
  };

/**
 * A stack panel lives alongside a `MainPanel` (and optionally
 * other stack panels) in a `PanelContainer`. It can be opened
 * or closed immediately or with an animation.
 *
 * If a stack panel is fixed it sits on top of the main panel.
 * If it's not fixed it forces the main panel to shrink.
 *
 * The open state should be stored outside of this component
 * and is updated by the `onOpenStart`, `onOpenFinish`,
 * `onCloseStart` and `onCloseFinish` callbacks.
 */
export const StackPanel = React.forwardRef<HTMLDivElement, StackPanelProps>(
  (
    {
      children,
      className,
      duration = 300,
      easing,
      fixed = false,
      height,
      onCloseFinish,
      onCloseStart,
      onOpenFinish,
      onOpenStart,
      open = false,
      position,
      raised,
      transition = 'shiftable',
      unit = 'px',
      ...props
    },
    forwardedRef,
  ): React.ReactElement<StackPanelProps> => {
    const ref = useRef<HTMLDivElement>(null);

    usePanelCollapser({
      duration,
      easing: easing || easeInOutCubic,
      height,
      onCloseFinish,
      onCloseStart,
      onOpenFinish,
      onOpenStart,
      open,
      position,
      ref,
      transition,
      unit,
    });

    const classes = cx(
      styles.stackPanel,
      fixed && styles['stackPanel--fixed'],
      raised && styles['stackPanel--raised'],
      styles[`stackPanel--${position}`],
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

StackPanel.displayName = 'StackPanel';
