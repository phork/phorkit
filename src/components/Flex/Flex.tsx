import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Flex.module.css';

export type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start';
  alignContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch';
  alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch';
  /** The children are optional so that this component can be passed as empty and then cloned */
  children?: React.ReactChild | React.ReactFragment | null;
  className?: string;
  direction?: 'column' | 'row';
  /** This sets the style to `flex: 1` */
  flexible?: boolean;
  full?: boolean;
  /** This sets the style to `flex: none` */
  inflexible?: boolean;
  /** This sets the style to `display: inline-flex` */
  inline?: boolean;
  justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly';
  /** If this is true the width and height will be set to 100% */
  max?: boolean;
  /** This reverses the flex direction */
  reverse?: boolean;
  style?: React.CSSProperties;
  wrap?: boolean;
};

/**
 * The flex component is a convenience wrapper to add
 * flex box properties to a div.
 */
export function Flex({
  alignContent,
  alignItems,
  alignSelf,
  children,
  className,
  direction = 'row',
  flexible = false,
  full = false,
  inflexible = false,
  inline = false,
  justifyContent,
  max = false,
  reverse = false,
  wrap = false,
  ...props
}: FlexProps): JSX.Element {
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
