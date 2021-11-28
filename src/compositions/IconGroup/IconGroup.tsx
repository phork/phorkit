import React from 'react';
import { MergeProps } from '../../types';
import { ScaleProvider, ScaleProviderProps } from '../../context/Scale/ScaleProvider';
import { Flex, FlexProps } from '../../components/Flex/Flex';

export type IconGroupProps = MergeProps<
  FlexProps,
  {
    className?: FlexProps['className'];
    scale?: ScaleProviderProps['scale'];
    size?: ScaleProviderProps['size'];
    style?: React.CSSProperties;
  }
>;

/**
 * An icon group renders a row of icons and wraps them
 * with a `ScaleProvider` which will be used to set every
 * child icon to the same size unless the individual
 * icons override it.
 *
 * This uses the `Flex` component and the `Scale` context.
 */
export function IconGroup({ children, className, scale, size, ...props }: IconGroupProps): JSX.Element {
  return (
    <ScaleProvider scale={scale} size={size}>
      <Flex alignItems="center" className={className} direction="row" wrap={false} {...props}>
        {children}
      </Flex>
    </ScaleProvider>
  );
}

IconGroup.displayName = 'IconGroup';
