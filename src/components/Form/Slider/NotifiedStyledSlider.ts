import { withNotification } from '../hoc/withNotification';
import { StyledSlider, StyledSliderProps } from './StyledSlider';

/**
 * The notified styled slider is an extension of the
 * `StyledSlider` component with a status notification
 * message underneath it.
 */
export const NotifiedStyledSlider = withNotification<StyledSliderProps, HTMLInputElement>(StyledSlider);
