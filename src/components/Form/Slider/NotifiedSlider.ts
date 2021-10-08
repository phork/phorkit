import { withNotification } from '../hoc/withNotification';
import { Slider, SliderProps } from './Slider';

/**
 * The notified slider is an extension of the `Slider`
 * component with a status notification message
 * underneath it.
 */
export const NotifiedSlider = withNotification<SliderProps, HTMLInputElement>(Slider);
