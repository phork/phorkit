import styled from '@emotion/styled';
import { IconToast, IconToastProps } from './IconToast';

export interface StyledIconToastProps extends IconToastProps {
  levelColor?: string;
  levelInverseColor?: string;
}

export const StyledIconToast = styled(IconToast, {
  shouldForwardProp: (prop: string) => !['levelColor', 'levelInverseColor', 'themeId'].includes(prop),
})<StyledIconToastProps>`
  ${({ levelColor }) => levelColor && `--toast-level-color: ${levelColor};`}
  ${({ levelInverseColor }) => levelInverseColor && `--toast-level-inverse-color: ${levelInverseColor};`}
`;

StyledIconToast.defaultProps = {
  level: 'custom',
};
