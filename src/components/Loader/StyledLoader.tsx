import styled from '@emotion/styled';
import { Loader, LoaderProps } from './Loader';

export type StyledLoaderProps = Omit<LoaderProps, 'contrast' | 'themeId'> & {
  color: string;
};

/**
 * A styled loader is an extension of the `Loader`
 * component that will have a custom color.
 */
export const StyledLoader = styled(Loader, {
  shouldForwardProp: (prop: string) => prop !== 'color',
})<StyledLoaderProps>`
  --loader-color: ${({ color }) => color};
`;

StyledLoader.displayName = 'StyledLoader';

StyledLoader.defaultProps = {
  unthemed: true,
};
