import styled from '@emotion/styled';
import { Progress, ProgressProps } from './Progress';

export type StyledProgressProps = Omit<ProgressProps, 'color'> & {
  backgroundColor?: string;
  segmentAnimationColor?: string;
  segmentColor: string;
};

/**
 * A styled progress bar is an extension of the
 * ProgressBar component and it will have a custom
 * background and segment color.
 */
export const StyledProgress = styled(Progress, {
  shouldForwardProp: (prop: string) =>
    !['backgroundColor', 'segmentColor', 'segmentAnimationColor', 'themeId'].includes(prop),
})<StyledProgressProps>`
  --progress-background-color: ${props => props.backgroundColor};
  --progress-segment-color: ${props => props.segmentColor};
  --progress-segment-animation-color: ${props => props.segmentAnimationColor};
`;

StyledProgress.displayName = 'StyledProgress';

StyledProgress.defaultProps = {
  unthemed: true,
};
