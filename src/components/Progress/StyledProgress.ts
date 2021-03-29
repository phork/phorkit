import styled from '@emotion/styled';
import { Progress, ProgressProps } from './Progress';

export interface StyledProgressProps extends Omit<ProgressProps, 'color'> {
  backgroundColor?: string;
  segmentAnimationColor?: string;
  segmentColor?: string;
}

export const StyledProgress = styled(Progress, {
  shouldForwardProp: (prop: string) =>
    !['backgroundColor', 'segmentColor', 'segmentAnimationColor', 'themeId'].includes(prop),
})<StyledProgressProps>`
  --progress-background-color: ${props => props.backgroundColor};
  --progress-segment-color: ${props => props.segmentColor};
  --progress-segment-animation-color: ${props => props.segmentAnimationColor};
`;
