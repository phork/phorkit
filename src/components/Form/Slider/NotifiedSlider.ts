import { withNotification } from '../hoc/withNotification';
import { Slider, SliderProps } from './Slider';

export const NotifiedSlider = withNotification<SliderProps, HTMLInputElement>(Slider);
