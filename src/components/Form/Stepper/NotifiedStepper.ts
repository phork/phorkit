import { withNotification } from '../hoc/withNotification';
import { Stepper, StepperProps } from './Stepper';

export const NotifiedStepper = withNotification<StepperProps, HTMLInputElement>(Stepper);
