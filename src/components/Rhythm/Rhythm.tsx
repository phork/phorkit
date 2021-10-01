import { cx } from '@emotion/css';
import React from 'react';
import styles from './styles/Rhythm.module.css';

type RhythmChildren =
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal
  | null
  | undefined
  | Array<RhythmChildren>;

const createElementFromWrapper = (
  wrapper: RhythmProps['wrapper'],
  props: React.HTMLAttributes<unknown>,
  children: RhythmChildren,
): React.ReactElement => {
  if (typeof wrapper === 'object') {
    return React.cloneElement(wrapper, props, children);
  }
  return React.createElement(wrapper || 'div', props, children);
};

export type RhythmLocation = {
  m?: number;
  mx?: number | 'auto';
  my?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  p?: number;
  px?: number;
  py?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
};

export type RhythmProps = RhythmLocation &
  React.HTMLAttributes<unknown> & {
    children: RhythmChildren;
    className?: string;
    /** If the rhythm is grouped it's applied to a wrapper around the children; ungrouped is applied to each child */
    grouped?: boolean;
    style?: React.CSSProperties;
    /** If grouped wrap the children with this wrapper element, if ungrouped wrap each child */
    wrapper?: keyof JSX.IntrinsicElements | React.ReactElement;
  };

/**
 * Adds margin and/or padding to each child if
 * not grouped, or adds it to a container element
 * if grouped is true.
 *
 * It's also possible to set negative margins, or
 * use auto for the horizontal margins.
 *
 * The amount of space added is multiplied by the
 * layout-grid-base variable.
 */
export function Rhythm({
  children,
  className,
  grouped = false,
  wrapper,
  ...props
}: RhythmProps): React.ReactElement | null {
  const classes = cx(
    ...(
      ['m', 'mx', 'my', 'ml', 'mr', 'mt', 'mb', 'p', 'px', 'py', 'pl', 'pr', 'pt', 'pb'] as (keyof RhythmLocation)[]
    ).map(prefix => {
      if (props[prefix] !== undefined) {
        const suffix =
          typeof props[prefix] === 'number' && props[prefix]! < 0
            ? `neg-${Math.abs(props[prefix] as number)}`
            : props[prefix];
        return styles[`${prefix}-${suffix}`];
      }
      return undefined;
    }),
    className,
  );

  // if grouped, return the children wrapped with a rhythm wrapper
  if (grouped) {
    return createElementFromWrapper(
      wrapper || 'div',
      {
        ...props,
        className: classes,
      },
      children,
    );
  }

  // if ungrouped, wrap each child with the rhythm wrapper
  return children ? (
    <React.Fragment>
      {React.Children.toArray(children)
        .map((child, i) => {
          if (child) {
            if (wrapper || !React.isValidElement(child)) {
              const base = createElementFromWrapper(wrapper, {}, child);
              // [TODO:ts] revisit casting
              return React.isValidElement(base)
                ? React.cloneElement(base, {
                    ...props,
                    key: i,
                    className: classes,
                  } as React.HTMLAttributes<unknown>)
                : null;
            }
            return React.cloneElement(child, {
              ...props,
              className: classes,
            });
          }
          return null;
        })
        .filter(content => !!content)}
    </React.Fragment>
  ) : null;
}

Rhythm.displayName = 'Rhythm';
