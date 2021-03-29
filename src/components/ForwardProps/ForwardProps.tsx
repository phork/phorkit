import React from 'react';

type ForwardPropsProps<P extends Record<string, unknown>> = {
  children: (props: Omit<ForwardPropsProps<P>, 'children'>) => React.ReactElement | React.ReactPortal | null;
} & P;

/**
 * A simple wrapper to forward properties to a children function.
 */
export const ForwardProps = <P extends Record<string, unknown>>({
  children,
  ...props
}: ForwardPropsProps<P>): React.ReactElement | React.ReactPortal | null => children(props);
