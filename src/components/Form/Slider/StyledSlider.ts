import styled from '@emotion/styled';
import { Slider, SliderProps } from './Slider';

export interface StyledSliderProps extends SliderProps {
  trackBackground: string;
  trackFillBackground: string;
  handleBackgroundColor: string;
  hoverHandleBoxShadow: string;
  hoverHandleBorderColor: string;
  tickBackgroundColor: string;
}

export const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop: string) =>
    ![
      'trackBackground',
      'trackFillBackground',
      'handleBackgroundColor',
      'hoverHandleBoxShadow',
      'hoverHandleBorderColor',
      'tickBackgroundColor',
    ].includes(prop),
})<StyledSliderProps>`
  --slider-track-background-color: ${props => props.trackBackground};
  --slider-track-fill-background-color: ${props => props.trackFillBackground};
  --slider-handle-background-color: ${props => props.handleBackgroundColor};
  --slider-hover-handle-box-shadow: 0 0 0 1px ${props => props.hoverHandleBoxShadow};
  --slider-hover-handle-border-color: ${props => props.hoverHandleBorderColor};
  --slider-tick-background-color: ${props => props.tickBackgroundColor};
`;

StyledSlider.defaultProps = {
  unstyled: true,
};