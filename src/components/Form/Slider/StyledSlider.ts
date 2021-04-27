import styled from '@emotion/styled';
import { Slider, SliderProps } from './Slider';

export interface StyledSliderProps extends SliderProps {
  trackBackground: string;
  trackFillBackground: string;
  handleBackgroundColor: string;
  tickBackgroundColor: string;
}

export const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop: string) =>
    !['trackBackground', 'trackFillBackground', 'handleBackgroundColor', 'tickBackgroundColor'].includes(prop),
})<StyledSliderProps>`
  --slider-track-background-color: ${props => props.trackBackground};
  --slider-track-fill-background-color: ${props => props.trackFillBackground};
  --slider-handle-background-color: ${props => props.handleBackgroundColor};
  --slider-tick-background-color: ${props => props.tickBackgroundColor};
`;

StyledSlider.displayName = 'StyledSlider';

StyledSlider.defaultProps = {
  unstyled: true,
};
