import styled from '@emotion/styled';
import { MergeProps } from '../../types';
import { Button, ButtonElementType, ButtonProps } from './Button';

export type StyledButtonProps<T extends ButtonElementType = 'button'> = MergeProps<
  Omit<ButtonProps<T>, 'width'>,
  {
    width: number | string;
  }
>;

// @ts-ignore [TODO:ts] WTF
export const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string) => prop !== 'width',
})<StyledButtonProps>`
  ${({ width }) => width !== undefined && `width: ${Number.isNaN(width) ? width : `${width}px`};`}
`;
