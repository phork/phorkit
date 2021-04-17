import styled from '@emotion/styled';
import { Toast, ToastProps } from './Toast';

export interface StyledToastProps extends Omit<ToastProps, 'level'> {
  levelColor?: string;
  levelInverseColor?: string;
}

export const StyledToast = styled(Toast, {
  shouldForwardProp: (prop: string) => !['levelColor', 'levelInverseColor', 'themeId'].includes(prop),
})<StyledToastProps>`
  ${({ levelColor }) => levelColor && `--toast-level-color: ${levelColor};`}
  ${({ levelInverseColor }) => levelInverseColor && `--toast-level-inverse-color: ${levelInverseColor};`}
`;

StyledToast.defaultProps = {
  level: 'custom',
};
