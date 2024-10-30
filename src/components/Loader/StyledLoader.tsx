import styled from '@emotion/styled';
import React from 'react';
import { Loader, LoaderProps } from './Loader';

export type StyledLoaderProps = Omit<LoaderProps, 'contrast' | 'themeId'> & {
  color: string;
};

const BaseStyledLoader = styled(Loader, {
  shouldForwardProp: (prop: string) => prop !== 'color',
})<StyledLoaderProps>`
  --loader-color: ${({ color }) => color};
`;

/**
 * A styled loader is an extension of the `Loader`
 * component that will have a custom color.
 */
export const StyledLoader = (props: StyledLoaderProps) => <BaseStyledLoader {...props} unthemed />;

StyledLoader.displayName = 'StyledLoader';
