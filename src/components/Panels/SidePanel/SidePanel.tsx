import { cx } from '@emotion/css';
import React, { useRef } from 'react';
import { usePanelCollapser, UsePanelCollapserInterface } from '../../../hooks/usePanelCollapser';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { easeInOutCubic } from '../../../utils/easings';
import styles from './styles/SidePanel.module.css';

export interface SidePanelProps
  extends Pick<UsePanelCollapserInterface, 'onCloseFinish' | 'onCloseStart' | 'onOpenFinish' | 'onOpenStart' | 'open'>,
    Partial<Pick<UsePanelCollapserInterface, 'easing' | 'unit' | 'transition'>>,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** The open and close animation duration */
  duration?: number;
  fixed?: boolean;
  position: 'left' | 'right';
  /** Raise the panel above other elements by using a high z-index */
  raised?: boolean;
  width: number;
}

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
  ): React.ReactElement<SidePanelProps, 'div'> => {
    const ref = useRef<HTMLDivElement>(null!);

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
