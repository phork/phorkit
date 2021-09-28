import React from 'react';

type ForwardPropsReturnType = React.ReactElement | React.ReactPortal | null;

type ForwardPropsChildFunction<P extends Record<string, unknown>> = (
  props: Omit<ForwardPropsProps<P>, 'children'>,
) => ForwardPropsReturnType;

type ForwardPropsProps<P extends Record<string, unknown>> = {
  children: ForwardPropsChildFunction<P> | ForwardPropsChildFunction<P>[];
} & P;

/**
 * A simple wrapper to forward properties to a children
 * function or functions.
 */
export const ForwardProps = <P extends Record<string, unknown>>({
  children,
  ...props
}: ForwardPropsProps<P>): ForwardPropsReturnType => {
  const forward = (
    destination: ForwardPropsChildFunction<P> | ForwardPropsChildFunction<P>[],
  ): ForwardPropsReturnType =>
    Array.isArray(destination) ? (
      <React.Fragment>{destination.map(child => forward(child))}</React.Fragment>
    ) : (
      destination(props)
    );

  return forward(children);
};

ForwardProps.displayName = 'ForwardProps';
