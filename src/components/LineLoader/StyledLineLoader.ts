import styled from '@emotion/styled';
import { LineLoader, LineLoaderProps } from './LineLoader';

export interface StyledLineLoaderProps extends Omit<LineLoaderProps, 'color'> {
  color?: string;
}

export const StyledLineLoader = styled(LineLoader, {
  shouldForwardProp: (prop: string) => !['color', 'themeId'].includes(prop),
})<StyledLineLoaderProps>`
  ${({ color }) => color && `--line-loader-color: ${color};`}
`;

StyledLineLoader.defaultProps = {
  unthemed: true,
};
