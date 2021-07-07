import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Flex.module.css';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start';
  alignContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch';
  alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch';
  /** The children are optional so that <Typography /> can be used as a wrapper */
  children?: React.ReactNode;
  className?: string;
  direction?: 'column' | 'row';
  flexible?: boolean;
  full?: boolean;
  inflexible?: boolean;
  inline?: boolean;
  justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly';
  max?: boolean;
  reverse?: boolean;
  wrap?: boolean;
}

export function Flex({
  alignContent,
  alignItems,
  alignSelf,
  children,
  className,
  direction,
  flexible = false,
  full = false,
  inflexible = false,
  inline = false,
  justifyContent,
  max = false,
  reverse = false,
  wrap = false,
  ...props
}: FlexProps): React.ReactElement<FlexProps, 'div'> {
  return (
    <div
      className={cx(
        inline ? styles['display-inline-flex'] : styles['display-flex'],
        alignContent && styles[`align-content-${alignContent}`],
        alignItems && styles[`align-items-${alignItems}`],
        alignSelf && styles[`align-self-${alignSelf}`],
        direction && styles[`flex-direction-${direction}`],
        flexible && styles.flexible,
        inflexible && styles.inflexible,
        justifyContent && styles[`justify-content-${justifyContent}`],
        reverse && styles['flex-direction-reverse'],
        wrap !== undefined && styles[`flex-${wrap ? 'wrap' : 'nowrap'}`],
        full && styles['flex-full'],
        max && styles['flex-max'],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Flex.displayName = 'Flex';
