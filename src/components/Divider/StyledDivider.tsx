import styled from '@emotion/styled';
import { Divider, DividerProps } from './Divider';

export type StyledDividerProps = DividerProps & {
  dividerColor: string;
};

/**
 * A styled divider is an extension of the Divider
 * component which will be a custom color.
 */
export const StyledDivider = styled(Divider, {
  shouldForwardProp: (prop: string) => !['dividerColor', 'themeId'].includes(prop),
})<StyledDividerProps>`
  ${({ dividerColor }) => dividerColor && `--divider-color: ${dividerColor};`}
`;

StyledDivider.displayName = 'StyledDivider';

StyledDivider.defaultProps = {
  unthemed: true,
};
