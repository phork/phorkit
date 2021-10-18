import styled from '@emotion/styled';
import { Slider, SliderProps } from './Slider';

export type StyledSliderProps = Omit<SliderProps, 'contrast' | 'themeId' | 'validity'> & {
  trackBackgroundColor: string;
  trackFillBackgroundColor: string;
  handleBackgroundColor: string;
  tickBackgroundColor: string;
};

/**
 * A styled slider is an extension of the `Slider`
 * component that will have a custom track, track
 * fill, tick and drag handle colors.
 */
export const StyledSlider = styled(Slider, {
  shouldForwardProp: (prop: string) =>
    !['trackBackgroundColor', 'trackFillBackgroundColor', 'handleBackgroundColor', 'tickBackgroundColor'].includes(
      prop,
    ),
})<StyledSliderProps>`
  --slider-track-background-color: ${props => props.trackBackgroundColor};
  --slider-track-fill-background-color: ${props => props.trackFillBackgroundColor};
  --slider-handle-background-color: ${props => props.handleBackgroundColor};
  --slider-tick-background-color: ${props => props.tickBackgroundColor};
`;

StyledSlider.displayName = 'StyledSlider';

StyledSlider.defaultProps = {
  unstyled: true,
};
