import styled from '@emotion/styled';
import { Divider, DividerProps } from './Divider';

export interface StyledDividerProps extends DividerProps {
  dividerColor?: string;
}

export const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop: string) => !['dividerColor', 'themeId'].includes(prop),
})<StyledDividerProps>`
  ${({ dividerColor }) => dividerColor && `--divider-color: ${dividerColor};`}
`;

StyledDivider.displayName = 'StyledDivider';

StyledDivider.defaultProps = {
  unthemed: true,
};
