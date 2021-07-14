import React from 'react';
import { ScaleProvider, ScaleProviderProps } from '../../context/Scale/ScaleProvider';
import { Flex, FlexProps } from '../../components/Flex/Flex';

export interface IconGroupProps {
  children: React.ReactNode;
  className?: FlexProps['className'];
  scale?: ScaleProviderProps['scale'];
  size?: ScaleProviderProps['size'];
}

export function IconGroup({ children, className, scale, size }: IconGroupProps): React.ReactElement {
  return (
    <ScaleProvider scale={scale} size={size}>
      <Flex alignItems="center" className={className} direction="row" wrap={false}>
        {children}
      </Flex>
    </ScaleProvider>
  );
}

IconGroup.displayName = 'IconGroup';
