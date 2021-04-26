import styled from '@emotion/styled';
import { Loader, LoaderProps } from './Loader';

export interface StyledLoaderProps extends Omit<LoaderProps, 'color'> {
  color: string;
}

export const StyledLoader = styled(Loader, {
  shouldForwardProp: (prop: string) => prop !== 'color',
})<StyledLoaderProps>`
  --loader-color: ${({ color }) => color};
`;

StyledLoader.displayName = 'StyledLoader';
