import { cx } from '@emotion/css';
import React, { useRef } from 'react';
import { usePanelCollapser, UsePanelCollapserInterface } from '../../../hooks/usePanelCollapser';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { easeInOutCubic } from '../../../utils/easings';
import styles from './styles/StackPanel.module.css';

export interface StackPanelProps
  extends Pick<UsePanelCollapserInterface, 'onCloseFinish' | 'onCloseStart' | 'onOpenFinish' | 'onOpenStart' | 'open'>,
    Partial<Pick<UsePanelCollapserInterface, 'easing' | 'unit' | 'transition'>>,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** The open and close animation duration */
  duration?: number;
  fixed?: boolean;
  height: number;
  position: 'top' | 'bottom';
  /** Raise the panel above other elements by using a high z-index */
  raised?: boolean;
}

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
  ): React.ReactElement<StackPanelProps, 'div'> => {
    const ref = useRef<HTMLDivElement>(null!);

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
